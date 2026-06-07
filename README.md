# SISTEM INFORMASI GEOGRAFIS PREDIKSI HARGA LAHAN KORIDOR TOL IKN BERBASIS METODE INVERSE DISTANCE WEIGHTING (IDW) 🌍

**[🚀 LIHAT LIVE DEMO](https://smart-land-price.vercel.app)** | **[📚 BUKA API DOCS](https://smart-land-price-api.vercel.app/docs)**

Aplikasi WebGIS interaktif _full-stack_ yang dirancang sebagai sistem pengambilan keputusan berbasis spasial untuk memprediksi harga lahan di koridor tol Balikpapan-IKN. Proyek ini mengimplementasikan metode numerik interpolasi **Inverse Distance Weighting (IDW)**.

---

## 🏛️ Arsitektur Proyek (Full-Stack)

Proyek ini dibangun menggunakan arsitektur pemisahan sistem (_decoupled_) antara Frontend dan Backend agar lebih terukur dan performan:

### 1. [Frontend (React + Vite)](./Frontend/README.md)
Bertindak sebagai panel antarmuka pengguna interaktif (UI/UX) dan visualisasi peta geografis (GIS).
- **Framework:** React 18, TypeScript, Vite
- **Styling & Animasi:** TailwindCSS, Framer Motion
- **Map Engine:** React Leaflet
- **Fitur Utama:** Peta prediksi dinamis interaktif, panel validasi akurasi LOOCV (Leave-One-Out Cross-Validation), dan simulasi perhitungan matematis IDW.

### 2. [Backend (FastAPI)](./Backend/README.md)
Bertindak sebagai otak pemroses komputasi numerik spasial dan penyedia API pusat.
- **Framework:** FastAPI (Python)
- **Database:** PostgreSQL (Via SQLAlchemy ORM)
- **Logika Numerik:** Mengeksekusi rumus IDW secara _real-time_ untuk merespons titik koordinat yang dipilih pengguna.
- **Fitur Utama:** API prediksi IDW, penyedia dataset koordinat aktual lahan IKN, filter radius pencarian.

---

## 📊 Metodologi Numerik: Inverse Distance Weighting (IDW)

Interpolasi spasial IDW adalah algoritma numerik deterministik dengan prinsip: **"Titik sampel yang lebih dekat memberikan pengaruh/bobot yang lebih besar terhadap estimasi nilai di suatu lokasi target, dibandingkan titik sampel yang jauh."**

Rumus utama yang dijalankan di backend:
**Z(x₀) = Σ(Zᵢ / dᵢᵖ) / Σ(1 / dᵢᵖ)**

* `Z(x₀)`: Prediksi harga lahan di titik target.
* `Zᵢ`: Harga lahan di titik sampel ke-`i` (Berdasarkan data aktual IKN).
* `dᵢ`: Jarak geometrik (*Haversine/Euclidean*) antara titik target dan titik sampel ke-`i`.
* `p`: Nilai *power* eksponensial (Semakin tinggi `p`, semakin ekstrem jatuhnya bobot pada titik yang jauh).

---

## 🚀 Instalasi & Menjalankan Aplikasi Lokal

Karena proyek terbagi dua, silakan ikuti panduan di masing-masing folder:

1. **Jalankan Backend:** Masuk ke folder `/Backend`, atur database PostgreSQL Anda, dan jalankan server FastAPI menggunakan uvicorn. (Baca [Panduan Setup Backend](./Backend/README.md)).
2. **Jalankan Frontend:** Masuk ke folder `/Frontend`, setel URL API backend di `.env`, lalu jalankan menggunakan Vite `npm run dev`. (Baca [Panduan Setup Frontend](./Frontend/README.md)).

---

## 🔐 Status Deployment & Live Demo
Proyek ini telah dikonfigurasi untuk berjalan mulus di lingkungan _cloud_ (Vercel):
* **Frontend:** Di-deploy via **Vercel** (`smart-land-price.vercel.app`)
* **Backend:** Di-deploy via **Vercel Serverless Functions** Python (`smart-land-price-api.vercel.app`)
* **Database:** Di-hosting terpisah menggunakan PostgreSQL Cloud (misalnya Supabase/Neon).

---

## 👥 Tim Pengembang & Pembagian Tugas

Proyek ini dikembangkan oleh kelompok kami dengan pembagian peran sebagai berikut:

**1. Alfin Himawan Santosa (24051130081) — _Backend Developer & Data Engineer_**
* **Pembuatan Data:** Mencari titik koordinat di sekitar Tol Balikpapan-IKN via Google Maps dan menetapkan klasifikasi/harga logis lahan (berdasarkan realita dan interpolasi matematis).
* **Database:** Mengelola data spasial tersebut dan menyimpannya ke dalam sistem database (_PostgreSQL_).
* **API & Logika IDW:** Membangun API (_FastAPI/Python_) yang menarik data dari database dan mengeksekusi algoritma perhitungan rumus IDW secara presisi saat menerima _request_ dari frontend.

**2. Pramudya Tien Meylandri (24051130088) — _Quality Assurance (QA) & System Analyst_**
* **Test Case:** Menerima data populasi dari backend dan merancang skenario pengujian dengan teknik _Leave-One-Out Cross-Validation_ (LOOCV).
* **Hitung Manual:** Melakukan perhitungan manual menggunakan rumus IDW (di atas kertas/kalkulator) untuk menentukan _Expected Output_ (Nilai Harapan).
* **Validasi:** Memasukkan titik uji koordinat ke dalam API buatan backend. Jika hasil program sejalan/sama persis dengan hasil hitungan manual, maka rumus sistem dinyatakan valid.
* **Dokumentasi:** Menyiapkan metrik akurasi (MAE, RMSE) dan bukti hitungan manual untuk dipresentasikan di halaman Validasi UI serta diserahkan ke dosen.

**3. Mitchel Artica (24051130090) — _Frontend Developer (Pemetaan & UI)_**
* **Inisialisasi Web:** Membangun kerangka website modern interaktif menggunakan _React/Vite_ dan _Tailwind CSS_.
* **Integrasi Peta:** Mengkonfigurasi dan memasang pustaka peta spasial dinamis (_React-Leaflet_) ke dalam halaman *Dashboard*.
* **Interaksi Pengguna:** Memastikan sistem frontend mampu secara interaktif menangkap titik koordinat (X, Y) secara akurat seketika saat pengguna mengeklik area target manapun di atas kanvas peta.

**4. Muhammad Ghafur Amanu Putra Wardana (24051130103) — _Frontend Developer (Integrasi API & Log)_**
* **Panel Kalkulasi:** Merancang dan membangun antarmuka "Panel Informasi / Prediksi" interaktif (berkonsep _bento-box/glassmorphism_) di sisi/bawah layar peta.
* **Konsumsi API:** Melakukan komunikasi (_fetch_) yang asinkron dan mulus antara frontend React dengan API FastAPI di backend.
* **Render Hasil:** Mengekstraksi respons JSON dari backend (yang mencakup detail titik terdekat, jarak, bobot/W, nilai Z, dan radius) lalu menampilkannya secara rapi di dalam Panel Informasi agar proses kalkulasi matematika terlihat sangat transparan (*White-Box System*).

---
*Dibuat untuk keperluan Tugas Proyek Universitas (Metode Numerik)*
