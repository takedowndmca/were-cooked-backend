const { getDb } = require('../services/db');

const getAllRecipes = async (request, h) => {
  const { search, page = 1, limit = 10 } = request.query;
  const db = getDb();

  const query = {};

  if (search) {
    const input = search.toLowerCase().split(',').map(i => i.trim());
    query.$and = input.map(bahan => ({
      $or: [
        { 'Ingredients Cleaned': { $regex: bahan, $options: 'i' } },
        { Title: { $regex: bahan, $options: 'i' } }
      ]
    }));
  }

  const pageInt = Math.max(parseInt(page), 1);
  let limitInt = Math.min(parseInt(limit), 10);
  if (limitInt <= 0 || isNaN(limitInt)) limitInt = 10;

  const skip = (pageInt - 1) * limitInt;

  const recipes = await db.collection('resep')
    .find(query)
    .skip(skip)
    .limit(limitInt)
    .project({ _id: 0 })
    .toArray();

  const total = await db.collection('resep').countDocuments(query);

  return h.response({
    error: false,
    data: recipes,
    pagination: {
      page: pageInt,
      limit: limitInt,
      total,
      totalPages: Math.ceil(total / limitInt)
    }
  }).code(200);
};


// const getAllRecipes = async (request, h) => {
//   const { search, page = 1, limit = 10 } = request.query;
//   const db = getDb();

//   const query = {};

//   if (search) {
//     const input = search.toLowerCase().split(',').map(i => i.trim());
//     query.$and = input.map(bahan => ({
//       $or: [
//         { 'Ingredients Cleaned': { $regex: bahan, $options: 'i' } },
//         { Title: { $regex: bahan, $options: 'i' } }
//       ]
//     }));
//   }

//   const pageInt = parseInt(page);
//   const limitInt = parseInt(limit);
//   const skip = (pageInt - 1) * limitInt;

//   const recipes = await db.collection('resep')
//     .find(query)
//     .skip(skip)
//     .limit(limitInt)
//     .project({ _id: 0 })
//     .toArray();

//   const total = await db.collection('resep').countDocuments(query);

//   return h.response({
//     error: false,
//     data: recipes,
//     pagination: {
//       page: pageInt,
//       limit: limitInt,
//       total,
//       totalPages: Math.ceil(total / limitInt)
//     }
//   }).code(200);
// };



const getRecipeById = async (request, h) => {
  const { id } = request.params;
  const db = getDb();

  const recipe = await db.collection('resep').findOne({ id },{ projection: { _id: 0 } } );
  console.log(recipe)
  if (!recipe) {
    return h.response({ error: true, message: 'Resep tidak ditemukan' }).code(404);
  }

  return h.response({ error: false, data: recipe }).code(200);
};

module.exports = { getAllRecipes, getRecipeById };
