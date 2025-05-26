const handlers = require('../handlers/resepHandlers');

module.exports = [
  { method: 'GET', path: '/', handler: handlers.home },
  { method: 'GET', path: '/resep', handler: handlers.getAllResep },
  { method: 'GET', path: '/resep/{id}', handler: handlers.getResepById },
  { method: 'GET', path: '/bahan', handler: handlers.searchBahan }
];
