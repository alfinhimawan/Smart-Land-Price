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
    target_x: float, target_y: float, dataset: List[DataLahan], power: float = 2.0
) -> Dict[str, Any]:
    """
    Menghitung estimasi harga menggunakan Inverse Distance Weighting (IDW).
    """
    if not dataset:
        raise ValueError("Dataset tidak boleh kosong.")

    # 1. Bersihkan outlier menggunakan IQR
    cleaned_dataset = filter_outliers_iqr(dataset)
    if not cleaned_dataset:
        cleaned_dataset = (
            dataset  # Fallback jika semuanya dianggap outlier (jarang terjadi)
        )

    # 2. Validasi Geografis: Cek apakah koordinat terlalu jauh dari area sampel
    # Batas toleransi 50 kilometer menggunakan Haversine
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

    return {"predicted_price": round(predicted_price, 2), "logs": top_logs}
