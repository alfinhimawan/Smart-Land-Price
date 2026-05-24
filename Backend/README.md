# Smart Land Price API (Backend) 🌍

Backend API berkinerja tinggi yang dibangun dengan **FastAPI (Python)** untuk proyek WebGIS Prediksi Harga Lahan di koridor Balikpapan-IKN. Core dari backend ini adalah algoritma kalkulasi spasial **Inverse Distance Weighting (IDW)**.

## 🚀 Fitur Utama
- **Sistem Endpoint Lahan**: Mengambil data titik sampel referensi, dilengkapi dengan filter parameter radius jalan tol.
- **Kalkulator Spasial IDW**: Endpoint prediksi spasial (`POST /api/v1/lahan/predict`) yang menangani parameter _Latitude_ dan _Longitude_ secara dinamis.
- **Transparansi Matematis (White-Box)**: Tidak seperti _Black-box AI_, backend ini mengembalikan _logs_ metrik perhitungan yang mendetail (titik referensi, metrik jarak Euclidean, hingga bobot per hitungan) agar bisa divalidasi dan di-_render_ ke Panel Transparansi Frontend.

## 🛠️ Stack Teknologi
- **Framework**: FastAPI
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Data Validation & Settings**: Pydantic v2

## 📦 Cara Setup & Menjalankan Server (Local Development)

1. **Buat & Aktifkan Virtual Environment**
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```

2. **Install Dependensi**
   ```bash
   pip install -r requirements.txt
   ```

3. **Konfigurasi Database**
   - Pastikan PostgreSQL sudah terinstall dan berjalan di komputer Anda.
   - Buat database baru bernama `webgis_ikn` (atau nama lain).
   - _Copy_ file `.env.example` dan ubah namanya menjadi `.env`.
   - Isi kredensial database Anda (password, user, dll) di file `.env` tersebut.

4. **Jalankan Aplikasi Uvicorn**
   ```bash
   uvicorn app.main:app --reload
   ```

5. **Uji Coba API (Swagger UI)**
   Buka _browser_ kesayangan Anda dan akses dokumentasi API interaktif di:
   👉 **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**

## 👨‍💻 Peran & Tanggung Jawab
**Alfin Himawan Santosa** (Backend Developer & Data Engineer)

**Rincian Tugas Utama:**
1. **Pembuatan Data**: Mencari titik koordinat di sekitar Tol Balikpapan-IKN via Google Maps dan menetapkan harga logis (_dummy data_).
2. **Database**: Mengelola data spasial tersebut ke dalam sistem database (PostgreSQL).
3. **API & Logika IDW**: Membangun API (FastAPI/Python) yang akan menarik data dari database dan mengeksekusi perhitungan rumus IDW secara *real-time* saat menerima _request_ prediksi dari _frontend_.
