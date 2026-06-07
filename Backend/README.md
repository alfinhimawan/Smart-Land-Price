# Backend - SISTEM INFORMASI GEOGRAFIS PREDIKSI HARGA LAHAN KORIDOR TOL IKN BERBASIS METODE INVERSE DISTANCE WEIGHTING (IDW) 🌍

**[📚 LIHAT DOKUMENTASI API (SWAGGER UI)](https://smart-land-price-api.vercel.app/docs)**

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

1. **Masuk ke Direktori Backend**
   ```bash
   cd Backend
   ```

2. **Buat & Aktifkan Virtual Environment**
   ```bash
   python -m venv venv
   # Di Windows:
   .\venv\Scripts\activate
   # Di Mac/Linux:
   source venv/bin/activate
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

## 👨‍💻 Tim Pengembang (Backend & QA)

Bagian *core logic* numerik dan pengujian sistem ini dikembangkan oleh:

**1. Alfin Himawan Santosa (24051130081) — _Backend Developer & Data Engineer_**
- Bertanggung jawab penuh atas arsitektur database, desain API FastAPI, pencarian sampel *real-world* via Google Maps, dan implementasi algoritma spasial Inverse Distance Weighting (IDW).

**2. Pramudya Tien Meylandri (24051130088) — _Quality Assurance (QA) & System Analyst_**
- Bertanggung jawab menyusun skenario pengujian (Test Case), melakukan hitung matematis manual sebagai referensi _Expected Output_, dan memvalidasi keakuratan _endpoint_ API backend secara saintifik.

_(Untuk daftar tim lengkap dan pembagian tugas *full-stack*, silakan lihat `README.md` di root utama proyek)._
