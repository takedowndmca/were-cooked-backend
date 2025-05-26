const resepController = require('../controllers/resepController');

module.exports = {
  home: (request, h) => {
    return 'API Resep is running!';
  },

  getAllResep: async (request, h) => {
    try {
      const data = await resepController.getAllResep();
      return h.response(data);
    } catch (err) {
      return h.response({ error: err.message }).code(500);
    }
  },

  getResepById: async (request, h) => {
    try {
      const data = await resepController.getResepById(request.params.id);
      if (!data) {
        return h.response({ message: "Resep tidak ditemukan" }).code(404);
      }
      return h.response(data);
    } catch (err) {
      return h.response({ error: err.message }).code(500);
    }
  },

  searchBahan: async (request, h) => {
    const query = request.query.query?.toLowerCase() || '';
    if (!query) return h.response({ error: 'Query kosong' }).code(400);

    try {
      const data = await resepController.searchBahan(query);
      return h.response(data);
    } catch (err) {
      return h.response({ error: 'Gagal mengambil data bahan' }).code(500);
    }
  }
};
