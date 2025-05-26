require('dotenv').config()
const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const resepRoutes = require('./routes/resepRoutes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
      cors: true,
    },
  });

  // Connect ke MongoDB
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('✅ MongoDB connected');

  // Daftarkan routes
  server.route(resepRoutes);

  await server.start();
  console.log(`🚀 Server running at: ${server.info.uri}`);
};

init();
