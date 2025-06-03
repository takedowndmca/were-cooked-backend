## 🍽️🔥 WereCooked API

REST API sederhana untuk mencari dan melihat resep makanan berdasarkan bahan, dibangun menggunakan [Hapi.js](https://hapi.dev/) dan [MongoDB](https://www.mongodb.com/).

---

## 🚀 Fitur

* Registrasi dan login pengguna (autentikasi JWT)
* Manajemen bookmark resep oleh pengguna
* Pencarian dan detail resep masakan
* Pengelolaan profil pengguna (update profil dan password)

- Ambil daftar resep
- Lihat detail resep berdasarkan ID
- Autocomplete bahan
- Struktur modular dengan controller, handler, dan model
- Menggunakan `.env` untuk konfigurasi lingkungan

---

## 📁 Struktur Proyek

```
project-root/
├── server.js                  # Entry point aplikasi
├── src/
│   ├── handlers/             # Controller untuk request handling
│   │   ├── authHandler.js    # Logika register & login
│   │   ├── bookmarkHandler.js# Logika CRUD bookmark
│   │   ├── recipeHandler.js  # Logika resep masakan
│   │   └── userHandler.js    # Logika profil user
│   ├── middlewares/          # Middleware, misal autentikasi
│   │   └── authMiddleware.js
│   ├── routes/               # Route definitions
│   │   ├── authRoutes.js     # Route register & login
│   │   ├── bookmarkRoutes.js # Route bookmark (dengan auth)
│   │   ├── recipeRoutes.js   # Route resep masakan
│   │   └── userRoutes.js     # Route profil user (dengan auth)
│   ├── services/             # Business logic dan akses DB
│   │   ├── db.js             # Koneksi database
│   │   └── userService.js    # Service user
│   ├── utils/                # Utility helper functions
│   │   ├── hash.js           # Hash password
│   │   └── token.js          # Generate JWT token
│   └── validations/          # Validasi input request
│       └── authValidation.js # Joi schema untuk register
├── .env                      # Konfigurasi environment variables
├── package.json              # Dependencies dan scripts
└── readme.md                 # Dokumentasi proyek
```


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

## Autentikasi

### POST /register

Registrasi user baru.

**Request Body:**

```json
{
  "name": "string, minimal 3 karakter",
  "email": "string, email valid",
  "password": "string, minimal 8 karakter"
}
```

**Response (201 Created):**

```json
{
  "error": false,
  "message": "User Created",
  "userId": "id user"
}
```

**Error:**

* 400 Bad Request (validasi gagal)
* 409 Conflict (email sudah terdaftar)

---

### POST /login

Login user.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200 OK):**

```json
{
  "error": false,
  "message": "Login berhasil",
  "loginResult": {
    "userId": "id user",
    "name": "nama user",
    "token": "JWT token"
  }
}
```

**Error:**

* 404 Not Found (email tidak ditemukan)
* 401 Unauthorized (password salah)

---

## User Profile

*Semua endpoint di bawah menggunakan autentikasi JWT melalui middleware `authMiddleware`.*

### GET /profile

Ambil data profil user.

**Response (200 OK):**

```json
{
  "error": false,
  "message": "Berhasil mendapatkan profil",
  "user": {
    "id": "user id",
    "name": "nama user",
    "email": "email user",
    "photo": "url photo atau string kosong",
    // field lain kecuali password dan _id
  }
}
```

**Error:**

* 404 Not Found (user tidak ditemukan)

---

### PUT /profile

Update profil user (nama dan foto).

**Request Body:**

```json
{
  "name": "string, minimal 3 karakter",
  "photo": "string (opsional)"
}
```

**Response (200 OK):**

```json
{
  "error": false,
  "message": "Profil berhasil diperbarui",
  "user": {
    "id": "user id",
    "name": "nama user baru",
    "email": "email user",
    "photo": "photo terbaru"
  }
}
```

**Error:**

* 400 Bad Request (nama kurang dari 3 karakter)
* 404 Not Found (user tidak ditemukan)

---

### PUT /profile/password

Update password user.

**Request Body:**

```json
{
  "currentPassword": "string",
  "newPassword": "string, minimal 8 karakter"
}
```

**Response (200 OK):**

```json
{
  "error": false,
  "message": "Password berhasil diperbarui"
}
```

**Error:**

* 404 Not Found (user tidak ditemukan)
* 401 Unauthorized (password lama salah)
* 400 Bad Request (password baru kurang dari 8 karakter)

---

## Resep

### GET /resep

Ambil daftar resep, mendukung pencarian dan paginasi.

**Query Parameters (opsional):**

* `search` = string, bahan atau kata kunci, bisa lebih dari satu dipisah koma, contoh: `search=ayam,bawang`
* `page` = integer, default 1
* `limit` = integer, default 50, max 50

**Response (200 OK):**

```json
{
  "error": false,
  "data": [
    {
      "id": "uuid",
      "Title": "Judul Resep",
      "Ingredients": "Daftar bahan lengkap",
      "Steps": "Langkah-langkah memasak",
      "Loves": "jumlah suka",
      "URL": "link resep asli",
      "Category": "kategori",
      "Title Cleaned": "judul bersih",
      "Total Ingredients": "jumlah bahan",
      "Ingredients Cleaned": "bahan bersih",
      "Total Steps": "jumlah langkah",
      "Image": "url gambar"
    },
    ...
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 100,
    "totalPages": 10
  }
}
```

---

### GET /resep/{id}

Ambil detail resep berdasarkan ID.

**Response (200 OK):**

```json
{
  "error": false,
  "data": {
    "id": "uuid",
    "Title": "Judul Resep",
    "Ingredients": "Daftar bahan lengkap",
    "Steps": "Langkah-langkah memasak",
    "Loves": "jumlah suka",
    "URL": "link resep asli",
    "Category": "kategori",
    "Title Cleaned": "judul bersih",
    "Total Ingredients": "jumlah bahan",
    "Ingredients Cleaned": "bahan bersih",
    "Total Steps": "jumlah langkah",
    "Image": "url gambar"
  }
}
```

**Error (404 Not Found):**

```json
{
  "error": true,
  "message": "Resep tidak ditemukan"
}
```

---

## Bookmark

*Semua endpoint di bawah harus autentikasi JWT*

### GET /bookmark

Ambil daftar bookmark milik user.

**Response (200 OK):**

```json
{
  "error": false,
  "data": [
    {
      "userId": "id user",
      "recipeId": "id resep",
      "title": "judul resep",
      "image": "url gambar",
      "createdAt": "tanggal"
    },
    ...
  ]
}
```

---

### POST /bookmark

Tambah bookmark baru.

**Request Body:**

```json
{
  "recipeId": "string",
  "title": "string",
  "image": "string (url gambar)"
}
```

**Response (201 Created):**

```json
{
  "error": false,
  "message": "Bookmark berhasil ditambahkan"
}
```

**Error:**

* 409 Conflict (bookmark sudah ada)

---

### DELETE /bookmark/{id}

Hapus bookmark berdasarkan ID.

**Response (200 OK):**

```json
{
  "error": false,
  "message": "Bookmark dihapus"
}
```

**Error:**

* 404 Not Found (bookmark tidak ditemukan)


## Teknologi yang Digunakan

* [@hapi/hapi](https://hapi.dev/) — Framework server Node.js
* [mongoose](https://mongoosejs.com/) — ODM MongoDB (kalau dipakai)
* [dotenv](https://github.com/motdotla/dotenv) — Manajemen konfigurasi environment variables
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js/) — Hash password
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) — Generate dan verifikasi JWT token
* [joi](https://joi.dev/) — Validasi schema input
* [mongodb](https://mongodb.github.io/node-mongodb-native/) — Driver MongoDB native
* [uuid](https://github.com/uuidjs/uuid) — Generate UUID unik

---

## Instalasi

1. Clone repository
2. Install dependencies

   ```bash
   npm install
   ```
3. Buat file `.env` dan konfigurasi database serta JWT secret
4. Jalankan server

   ```bash
   node server.js
   ```

---

## Lisensi

CC25-CF275 © 2025 – Made with ❤️ for learning and real-world projects.