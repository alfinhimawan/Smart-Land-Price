import math
from typing import List, Dict, Any
from app.models.lahan import DataLahan


def calculate_idw(
    target_x: float, target_y: float, dataset: List[DataLahan], power: float = 2.0
) -> Dict[str, Any]:
    """
    Menghitung estimasi harga menggunakan Inverse Distance Weighting (IDW).
    """
    if not dataset:
        raise ValueError("Dataset tidak boleh kosong.")

    logs = []
    numerator = 0.0
    denominator = 0.0

    for data in dataset:
        # Jarak Euclidean
        distance = math.sqrt(
            (data.latitude - target_x) ** 2 + (data.longitude - target_y) ** 2
        )

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
                "distance": round(distance, 6),
                "weight": round(weight, 6),
            }
        )

    # Hitung nilai akhir Z
    predicted_price = numerator / denominator if denominator != 0 else 0.0

    return {"predicted_price": round(predicted_price, 2), "logs": logs}
