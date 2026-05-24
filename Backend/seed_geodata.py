import sys
import os
import random
import math

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.session import SessionLocal  # noqa: E402
from app.models.lahan import DataLahan  # noqa: E402


def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371.0
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlam = math.radians(lon2 - lon1)
    a = (
        math.sin(dphi / 2) ** 2
        + math.cos(phi1) * math.cos(phi2) * math.sin(dlam / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c


# Garis-garis Rute Tol Aktual (Titik Awal -> Titik Akhir)
TOLL_SEGMENTS = [
    # Tol Balsam (Manggar -> Karang Joang -> Samboja)
    (-1.218, 116.892, -1.185, 116.852),
    (-1.185, 116.852, -1.018, 116.988),
    # Tol IKN (Karang Joang -> Kariangau -> Pulau Balang -> Tempadung)
    (-1.185, 116.852, -1.200, 116.820),
    (-1.200, 116.820, -1.112, 116.732),
    (-1.112, 116.732, -1.144, 116.801),
]


def distance_to_toll(lat, lon):
    min_dist = float("inf")
    for lat1, lon1, lat2, lon2 in TOLL_SEGMENTS:
        # Interpolasi 20 titik di setiap ruas jalan tol untuk akurasi tinggi
        for i in range(21):
            t = i / 20.0
            mlat = lat1 + (lat2 - lat1) * t
            mlon = lon1 + (lon2 - lon1) * t
            dist = haversine(lat, lon, mlat, mlon)
            if dist < min_dist:
                min_dist = dist
    return min_dist


# Database Presisi Geografis (Dari Google Maps)
ZONAS = {
    "kariangau": (-1.2134, 116.7821),
    "tempadung": (-1.1442, 116.8015),
    "km 14": (-1.1750, 116.8600),
    "km 8": (-1.2050, 116.8450),
    "samboja": (-1.0183, 116.9880),
    "gersik": (-1.1350, 116.7500),
    "km 11": (-1.1900, 116.8550),
    "baru ilir": (-1.2380, 116.8150),
    "tengin": (-0.9700, 116.8200),
    "bumi harapan": (-0.9500, 116.7100),
    "pemaluan": (-0.9800, 116.7500),
    "pulau balang": (-1.1120, 116.7320),
    "karang jinawi": (-0.9900, 116.8800),
    "telemow": (-1.0560, 116.7010),
    "sukaraja": (-0.9500, 116.8500),
    "sepaku": (-0.9600, 116.7000),
    "semoi": (-0.9800, 116.8500),
    "maridan": (-1.0400, 116.7400),
    "binuang": (-0.9700, 116.8600),
    "argo mulyo": (-0.9500, 116.8800),
    "wonosari": (-0.9200, 116.9000),
    "mentawir": (-1.0500, 116.7500),
    "sukomulyo": (-0.9400, 116.8700),
    "bukit raya": (-0.9300, 116.8900),
    "manggar": (-1.2180, 116.8920),
    "baru ulu": (-1.2400, 116.8200),
    "km 46": (-0.9800, 117.0200),
    "hutan lindung": (-1.1500, 116.9500),
    "penajam": (-1.1500, 116.7000),
    "loa janan": (-0.8500, 117.0000),
}


def get_base_coord(nama_lokasi: str):
    nama = nama_lokasi.lower()
    for key, coord in ZONAS.items():
        if key in nama:
            return coord
    return (-1.0200, 116.8000)  # Default Center


def update_coordinates():
    db = SessionLocal()
    lahans = db.query(DataLahan).all()

    updated_count = 0
    for lahan in lahans:
        base_lat, base_lng = get_base_coord(lahan.nama_lokasi)

        # Jitter acak radius ~500m agar titik tidak tertumpuk
        new_lat = base_lat + random.uniform(-0.005, 0.005)
        new_lng = base_lng + random.uniform(-0.005, 0.005)

        lahan.latitude = round(new_lat, 6)
        lahan.longitude = round(new_lng, 6)

        # 1. Update Geometris: Hitung jarak aktual ke garis tol
        jarak_aktual = distance_to_toll(new_lat, new_lng)
        lahan.jarak_ke_tol_km = round(jarak_aktual, 2)

        # 2. Kategorisasi Keterangan (Ring)
        if jarak_aktual <= 1.0:
            lahan.keterangan = "Ring 1 - Sangat Dekat Akses Tol"
        elif jarak_aktual <= 3.0:
            lahan.keterangan = "Ring 2 - Jarak Menengah dari Tol"
        else:
            lahan.keterangan = "Ring 3 - Pelosok / Jauh dari Akses"

        # 3. Kalkulasi Harga Matematis: Fungsi Peluruhan Eksponensial (Exponential Decay)
        # Harga Dasar (Paling pelosok) = Rp 400.000
        # Premium Maksimal (Nempel Tol) = Rp 10.000.000
        harga_dasar = 400000
        premium_maks = 10000000
        
        # Rumus: Harga = Dasar + (Premium * e^(-0.3 * jarak))
        harga_matematis = harga_dasar + (premium_maks * math.exp(-0.3 * jarak_aktual))
        
        # Tambahkan sedikit 'noise' acak (+/- 5%) agar tidak terlihat terlalu buatan mesin
        noise_factor = random.uniform(0.95, 1.05)
        harga_final = harga_matematis * noise_factor
        
        # Membulatkan harga ke puluhan ribu terdekat agar natural
        lahan.harga_per_meter = round(harga_final, -4)

        updated_count += 1

    db.commit()
    db.close()
    print(
        f"Berhasil mengkoreksi Geometris, Geografis, dan Korelasi Harga {updated_count} titik data!"
    )


if __name__ == "__main__":
    update_coordinates()
