import math
from typing import List, Dict, Any
from app.models.lahan import DataLahan


def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Menghitung jarak dalam kilometer antara dua titik di permukaan bumi
    menggunakan formula Haversine.
    """
    R = 6371.0  # Radius bumi dalam km

    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = (
        math.sin(delta_phi / 2.0) ** 2
        + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0) ** 2
    )

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c


def filter_outliers_iqr(dataset: List[DataLahan]) -> List[DataLahan]:
    """
    Memfilter nilai harga tanah menggunakan metode Interquartile Range (IQR).
    """
    if len(dataset) < 4:
        return dataset

    # Urutkan berdasarkan harga
    sorted_data = sorted(dataset, key=lambda x: x.harga_per_meter)
    prices = [x.harga_per_meter for x in sorted_data]

    n = len(prices)
    q1 = prices[n // 4]
    q3 = prices[(n * 3) // 4]
    iqr = q3 - q1

    lower_bound = q1 - 1.5 * iqr
    upper_bound = q3 + 1.5 * iqr

    # Filter dataset
    filtered_dataset = [
        x for x in dataset if lower_bound <= x.harga_per_meter <= upper_bound
    ]
    return filtered_dataset


def calculate_idw(
    target_x: float,
    target_y: float,
    dataset: List[DataLahan],
    power: float = 2.0,
    radius_km: float = 50.0,
) -> Dict[str, Any]:
    """
    Menghitung estimasi harga menggunakan Inverse Distance Weighting (IDW).
    """
    if not dataset:
        raise ValueError("Dataset tidak boleh kosong.")

    # 1. Filter Geografis (Radius)
    # Hanya sertakan titik yang berada dalam radius_km dari target
    points_in_radius = []
    for data in dataset:
        dist = haversine_distance(target_x, target_y, data.latitude, data.longitude)
        if dist <= radius_km:
            points_in_radius.append(data)

    if not points_in_radius:
        raise ValueError(f"Tidak ada titik sampel dalam radius {radius_km} km.")

    # 2. Bersihkan outlier menggunakan IQR (Hanya pada titik yang masuk radius)
    cleaned_dataset = filter_outliers_iqr(points_in_radius)
    if not cleaned_dataset:
        cleaned_dataset = points_in_radius
    # Batas toleransi 50 kilometer secara absolut ke titik terdekat sudah teratasi oleh radius_km
    # Tapi kita pertahankan pengecekan jarak minimum untuk kasus radius yang di-set sangat besar
    min_distance = min(
        haversine_distance(target_x, target_y, data.latitude, data.longitude)
        for data in cleaned_dataset
    )

    if min_distance > 50.0:
        raise ValueError(
            f"Koordinat terlalu jauh ({round(min_distance, 1)} km) "
            "dari area sampel IKN/Balikpapan. "
            "Mohon pilih lokasi di dalam atau sekitar koridor tol."
        )

    logs = []
    numerator = 0.0
    denominator = 0.0

    for data in cleaned_dataset:
        distance = haversine_distance(target_x, target_y, data.latitude, data.longitude)

        # Kondisi khusus jika target di atas titik referensi
        if distance == 0:
            return {
                "predicted_price": float(data.harga_per_meter),
                "logs": [
                    {
                        "id_lahan": data.id_lahan,
                        "nama_lokasi": data.nama_lokasi,
                        "latitude": data.latitude,
                        "longitude": data.longitude,
                        "harga_per_meter": data.harga_per_meter,
                        "distance": 0.0,
                        "weight": "Infinity",
                    }
                ],
            }

        # Hitung bobot
        weight = 1 / (distance**power)

        # Numerator dan Denominator
        numerator += weight * data.harga_per_meter
        denominator += weight

        # Simpan log
        logs.append(
            {
                "id_lahan": data.id_lahan,
                "nama_lokasi": data.nama_lokasi,
                "latitude": data.latitude,
                "longitude": data.longitude,
                "harga_per_meter": data.harga_per_meter,
                "distance": round(distance, 4),  # Satuan KM
                "weight": round(weight, 6),
            }
        )

    # Hitung nilai akhir Z
    predicted_price = numerator / denominator if denominator != 0 else 0.0

    # 3. Optimasi Bandwidth: Urutkan log berdasarkan bobot tertinggi, dan ambil Top 5
    logs.sort(key=lambda x: x["weight"], reverse=True)
    top_logs = logs[:5]

    return {
        "predicted_price": round(predicted_price, 2),
        "total_samples_used": len(cleaned_dataset),
        "logs": top_logs,
    }
