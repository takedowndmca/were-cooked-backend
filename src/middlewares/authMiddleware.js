const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');

const authMiddleware = (request, h) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw Boom.unauthorized('Token tidak ditemukan');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.auth = {
      isAuthenticated: true,
      credentials: decoded, // bisa request.auth.credentials.id
    };
    return h.continue;
  } catch (err) {
    throw Boom.unauthorized('Token tidak valid');
  }
};

module.exports = { authMiddleware };
