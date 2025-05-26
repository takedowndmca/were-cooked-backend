const mongoose = require('mongoose');

const resepSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model('Resep', resepSchema, 'resep');
