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
    "soekarno-hatta km 8": (-1.2150, 116.8500), # Jl. Soekarno Hatta KM 8
    "rest area km 14": (-1.1750, 116.8600),     # Rest Area Tol Balsam
    "tempadung": (-1.1460, 116.8000),           # Interchange Tempadung
    "pulau balang": (-1.1120, 116.7320),        # Jembatan Pulau Balang
    "gersik": (-1.1330, 116.7530),              # Desa Gersik
    "km 38 samboja": (-1.0190, 116.9860),       # Exit Tol Samboja KM 38
    "bumi harapan": (-0.9450, 116.7060),        # KIPP IKN / Bumi Harapan
    "pemaluan": (-0.9800, 116.7100),            # Kelurahan Pemaluan
    "maridan": (-1.0600, 116.7300),             # Kelurahan Maridan
    "telemow": (-1.0700, 116.7500),             # Desa Telemow
    "mentawir": (-1.0200, 116.7500),            # Desa Mentawir
    "tengin baru": (-0.9500, 116.7500),         # Desa Tengin Baru
    "karang jinawi": (-1.0500, 116.7800),       # Desa Karang Jinawi
    "binuang": (-0.9900, 116.7700),             # Desa Binuang
    "semoi dua": (-0.9600, 116.8300),           # Desa Semoi Dua
    "argo mulyo": (-0.9500, 116.8500),          # Desa Argo Mulyo
    "wonosari": (-0.9400, 116.8800),            # Desa Wonosari
    "sukomulyo": (-0.9200, 116.8000),           # Desa Sukomulyo
    "suko mulyo": (-0.9200, 116.8000),
    "bukit raya": (-0.9100, 116.7500),          # Desa Bukit Raya
    "sepaku": (-0.9200, 116.7800),              # Kecamatan Sepaku
    "baru ilir": (-1.2300, 116.8200),           # Balikpapan Barat (Baru Ilir)
    "baru ulu": (-1.2350, 116.8100),            # Balikpapan Barat (Baru Ulu)
    "balikpapan barat": (-1.2200, 116.8100),
    "loa janan": (-0.5800, 117.0900),           # Loa Janan (Sangat Jauh)
    "penajam": (-1.2500, 116.7500),             # Penajam Paser Utara
    "kariangau": (-1.2134, 116.7821),           # Default Kariangau KIK
    "samboja": (-1.0180, 116.9880),             # Default Samboja
}


import re

def get_base_coord(nama_lokasi: str):
    # Bersihkan nama lokasi dari karakter aneh/tanda baca
    nama = re.sub(r'[^a-z0-9]', '', nama_lokasi.lower())
    
    # Kunci pencarian disederhanakan tanpa tanda baca (alfanumerik murni)
    ZONAS_CLEAN = {
        "soekarnohattakm8": (-1.2150, 116.8500),
        "restareakm14": (-1.1750, 116.8600),
        "tempadung": (-1.1460, 116.8000),
        "pulaubalang": (-1.1120, 116.7320),
        "gersik": (-1.1330, 116.7530),
        "km38samboja": (-1.0190, 116.9860),
        "bumiharapan": (-0.9450, 116.7060),
        "pemaluan": (-0.9800, 116.7100),
        "maridan": (-1.0600, 116.7300),
        "telemow": (-1.0700, 116.7500),
        "mentawir": (-1.0200, 116.7500),
        "tenginbaru": (-0.9500, 116.7500),
        "karangjinawi": (-1.0500, 116.7800),
        "binuang": (-0.9900, 116.7700),
        "semoidua": (-0.9600, 116.8300),
        "argomulyo": (-0.9500, 116.8500),
        "wonosari": (-0.9400, 116.8800),
        "sukomulyo": (-0.9200, 116.8000),
        "bukitraya": (-0.9100, 116.7500),
        "sepaku": (-0.9200, 116.7800),
        "baruilir": (-1.2300, 116.8200),
        "baruulu": (-1.2350, 116.8100),
        "balikpapanbarat": (-1.2200, 116.8100),
        "loajanan": (-0.5800, 117.0900),
        "penajam": (-1.2500, 116.7500),
        "kariangau": (-1.2134, 116.7821),
        "samboja": (-1.0180, 116.9880),
    }

    # Cocokkan substring
    for key, coord in ZONAS_CLEAN.items():
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
