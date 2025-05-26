## 🍽️ Resep API - Hapi.js + MongoDB

REST API sederhana untuk mencari dan melihat resep makanan berdasarkan bahan, dibangun menggunakan [Hapi.js](https://hapi.dev/) dan [MongoDB](https://www.mongodb.com/).

---

## 🚀 Fitur

- Ambil daftar resep
- Lihat detail resep berdasarkan ID
- Autocomplete bahan
- Struktur modular dengan controller, handler, dan model
- Menggunakan `.env` untuk konfigurasi lingkungan

---

## 📁 Struktur Proyek

```

project-root/
├── .env
├── controllers/
│   └── resepController.js
├── handlers/
│   └── resepHandlers.js
├── models/
│   └── resepModel.js
├── routes/
│   └── resepRoutes.js
├── server.js
└── README.md

````

---

## ⚙️ Instalasi & Setup

### 1. Clone & Install Dependency

```bash
git clone https://github.com/takedowndmca/were-cooked-backend.git
cd were-cooked-backend
npm install
````

### 2. Buat File `.env`

Isi dengan konfigurasi MongoDB lokal:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/dapur
```

### 3. Jalankan Server

```bash
npm start
```

Atau dengan nodemon (hot reload):

```bash
npm run dev
```

Server akan berjalan di:

```
http://localhost:3000
```

---

## 📚 Dokumentasi API

### 🔹 GET `/`

Cek status server.

**Respons:**

```text
API Resep is running!
```

---

### 🔹 GET `/resep`

Ambil 10 resep pertama.

**Contoh Respons:**

```json
[
  {
    "id": "0ca626cf-dabd-4b7d-b0ae-e0594371db3a",
    "Title": "Ayam Woku Manado",
    "Ingredients": "1 Ekor Ayam Kampung (potong 12)--2 Buah Jeruk Nipis--2 Sdm Garam--3 Ruas Kunyit--7 Bawang Merah--7 Bawang Putih--10 Cabe Merah--10 Cabe Rawit Merah (sesuai selera)--3 Butir Kemiri--2 Batang Sereh--2 Lembar Daun Salam--2 Ikat Daun Kemangi--Penyedap Rasa--1 1/2 Gelas Air--",
    "Steps": "1) Cuci bersih ayam dan tiriskan. Lalu peras jeruk nipis (kalo gak ada jeruk nipis bisa pake cuka) dan beri garam. Aduk hingga merata dan diamkan selama 5 menit, biar ayam gak bau amis.\n2) Goreng ayam tersebut setengah matang, lalu tiriskan\n3) Haluskan bumbu menggunakan blender. Bawang merah, bawang putih, cabe merah, cabe rawit, kemiri dan kunyit. Oh iya kasih minyak sedikit yaa biar bisa di blender. Untuk sereh nya di geprek aja terus di buat simpul.\n4) Setelah bumbu di haluskan barulah di tumis. Jangan lupa sereh dan daun salamnya juga ikut di tumis. Di tumis sampai berubah warna ya\n5) Masukan ayam yang sudah di goreng setengah matang ke dalam bumbu yang sudah di tumis, dan diamkan 5 menit dulu. Biar bumbu meresap. Lalu tuangkan 1 1/2 Gelas air. Lalu tambahkan penyedap rasa (saya 3 Sdt, tapi sesuai selera ya) koreksi rasa dan Biar kan sampai mendidih\n6) Setelah masakan mendidih, lalu masukan daun kemangi yang sudah di potong potong. Masak lagi sekitar 10 menit. And taraaaaaaaaaaaaaa..... jadi deh Ayam Woku Manadonya.\n7) Oh iyaa kalo mau di tambahkan potongan tomat merah juga bisa ko. Sesuai selera aja yaa buibuuuu",
    "Loves": "1",
    "URL": "https://cookpad.com/id/resep/4473027-ayam-woku-manado",
    "Category": "ayam",
    "Title Cleaned": "ayam woku manado",
    "Total Ingredients": "14",
    "Ingredients Cleaned": "ayam kampung potong , jeruk nipis , garam , kunyit , bawang merah , bawang putih , cabe merah , cabe rawit merah , kemiri , serai , daun salam , daun kemangi , penyedap , air",
    "Total Steps": "7",
    "Image": "https://img-global.cpcdn.com/recipes/4a0bb9e71ee86944/1200x630cq70/photo.jpg"
  },
.....
]
```

---

### 🔹 GET `/resep/{id}`

Ambil detail resep berdasarkan ID.

**Contoh:**
`GET /resep/0ca626cf-dabd-4b7d-b0ae-e0594371db3a`

**Respons:**

```json
{
  "id": "0ca626cf-dabd-4b7d-b0ae-e0594371db3a",
  "Title": "Ayam Woku Manado",
  "Ingredients": "1 Ekor Ayam Kampung (potong 12)--2 Buah Jeruk Nipis--2 Sdm Garam--3 Ruas Kunyit--7 Bawang Merah--7 Bawang Putih--10 Cabe Merah--10 Cabe Rawit Merah (sesuai selera)--3 Butir Kemiri--2 Batang Sereh--2 Lembar Daun Salam--2 Ikat Daun Kemangi--Penyedap Rasa--1 1/2 Gelas Air--",
  "Steps": "1) Cuci bersih ayam dan tiriskan. Lalu peras jeruk nipis (kalo gak ada jeruk nipis bisa pake cuka) dan beri garam. Aduk hingga merata dan diamkan selama 5 menit, biar ayam gak bau amis.\n2) Goreng ayam tersebut setengah matang, lalu tiriskan\n3) Haluskan bumbu menggunakan blender. Bawang merah, bawang putih, cabe merah, cabe rawit, kemiri dan kunyit. Oh iya kasih minyak sedikit yaa biar bisa di blender. Untuk sereh nya di geprek aja terus di buat simpul.\n4) Setelah bumbu di haluskan barulah di tumis. Jangan lupa sereh dan daun salamnya juga ikut di tumis. Di tumis sampai berubah warna ya\n5) Masukan ayam yang sudah di goreng setengah matang ke dalam bumbu yang sudah di tumis, dan diamkan 5 menit dulu. Biar bumbu meresap. Lalu tuangkan 1 1/2 Gelas air. Lalu tambahkan penyedap rasa (saya 3 Sdt, tapi sesuai selera ya) koreksi rasa dan Biar kan sampai mendidih\n6) Setelah masakan mendidih, lalu masukan daun kemangi yang sudah di potong potong. Masak lagi sekitar 10 menit. And taraaaaaaaaaaaaaa..... jadi deh Ayam Woku Manadonya.\n7) Oh iyaa kalo mau di tambahkan potongan tomat merah juga bisa ko. Sesuai selera aja yaa buibuuuu",
  "Loves": "1",
  "URL": "https://cookpad.com/id/resep/4473027-ayam-woku-manado",
  "Category": "ayam",
  "Title Cleaned": "ayam woku manado",
  "Total Ingredients": "14",
  "Ingredients Cleaned": "ayam kampung potong , jeruk nipis , garam , kunyit , bawang merah , bawang putih , cabe merah , cabe rawit merah , kemiri , serai , daun salam , daun kemangi , penyedap , air",
  "Total Steps": "7",
  "Image": "https://img-global.cpcdn.com/recipes/4a0bb9e71ee86944/1200x630cq70/photo.jpg"
}
```

**Jika tidak ditemukan:**

```json
{
  "message": "Resep tidak ditemukan"
}
```

---

### 🔹 GET `/bahan?query=gula`

Autocomplete bahan berdasarkan kata kunci.

**Contoh Respons:**

```json
["gula & garam","gula merah","gula","gula pasir","penyedap gula"]
```

---

## 🧪 Contoh Penggunaan `curl`

```bash
curl http://localhost:3000/resep
curl http://localhost:3000/resep/0ca626cf-dabd-4b7d-b0ae-e0594371db3a
curl "http://localhost:3000/bahan?query=garam"
```

---

## 🛠️ Teknologi yang Digunakan

* [@hapi/hapi](https://www.npmjs.com/package/@hapi/hapi)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [dotenv](https://www.npmjs.com/package/dotenv)

---

## 🧾 License

CC25-CF275 © 2025 – Made with ❤️ for learning and real-world projects.
