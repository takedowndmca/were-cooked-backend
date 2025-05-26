const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/dapur", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("✅ MongoDB connected");
});

// Schema & Model (tidak perlu semua field, fleksibel)
const resepSchema = new mongoose.Schema({}, { strict: false });
const Resep = mongoose.model("resep", resepSchema, "resep");

// Routes
app.get("/", (req, res) => {
  res.send("API Resep is running!");
});

// Ambil semua resep (limit 10)
app.get("/resep", async (req, res) => {
  try {
    const data = await Resep.find({}, '-_id').limit(10)
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ambil satu resep by ID MongoDB
app.get("/resep/:id", async (req, res) => {
  try {
    const resep = await Resep.findById(req.params.id);
    if (!resep) return res.status(404).json({ message: "Resep tidak ditemukan" });
    res.json(resep);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dapatkan saran bahan (autocomplete)
app.get('/bahan', async (req, res) => {
  const query = req.query.query?.toLowerCase() || '';
  if (!query) return res.status(400).json({ error: 'Query kosong' });

  try {
    const data = await db.collection('resep')
      .find({ "Ingredients Cleaned": { $regex: query, $options: 'i' } })
      .project({ _id: 0, "Ingredients Cleaned": 1 })
      .toArray();

    // Gabungkan semua Ingredients jadi 1 array
    const allIngredients = data
      .flatMap(doc => doc["Ingredients Cleaned"].split(','))
      .map(bahan => bahan.trim().toLowerCase())
      .filter(bahan => bahan.includes(query));

    // Hapus duplikat
    const unique = [...new Set(allIngredients)];

    res.json(unique);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengambil data bahan' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
