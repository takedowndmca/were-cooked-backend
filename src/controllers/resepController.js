const Resep = require('../models/resepModel');
const mongoose = require('mongoose');

const getAllResep = async () => {
  return await Resep.find({}, '-_id').limit(10);
};

const getResepById = async (id) => {
  return await Resep.findOne({ id }).select('-_id');
};

const searchBahan = async (query) => {
  const db = mongoose.connection;
  const data = await db.collection('resep')
    .find({ "Ingredients Cleaned": { $regex: query, $options: 'i' } })
    .project({ _id: 0, "Ingredients Cleaned": 1 })
    .toArray();

  const allIngredients = data
    .flatMap(doc => doc["Ingredients Cleaned"].split(','))
    .map(bahan => bahan.trim().toLowerCase())
    .filter(bahan => bahan.includes(query));

  return [...new Set(allIngredients)];
};

module.exports = {
  getAllResep,
  getResepById,
  searchBahan,
};
