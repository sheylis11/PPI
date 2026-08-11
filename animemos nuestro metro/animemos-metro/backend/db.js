const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Falta MONGODB_URI en el archivo .env. No se puede conectar a la base de datos.');
    process.exit(1);
  }
  try {
    await mongoose.connect(uri);
    console.log('Conectado a MongoDB correctamente.');
  } catch (err) {
    console.error('No se pudo conectar a MongoDB:', err.message);
    process.exit(1);
  }
}

module.exports = { connectDB };
