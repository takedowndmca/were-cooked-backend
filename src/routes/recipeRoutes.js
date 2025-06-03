const { getAllRecipes, getRecipeById } = require('../handlers/recipeHandler');

const routes = [
  {
    method: 'GET',
    path: '/resep',
    handler: getAllRecipes,
  },
  {
    method: 'GET',
    path: '/resep/{id}',
    handler: getRecipeById,
  },
];

module.exports = routes;
