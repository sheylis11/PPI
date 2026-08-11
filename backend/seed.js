// Ejecuta esto UNA VEZ después de conectar tu base de datos para que la página
// no se vea vacía apenas la publiques: node seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const MusicRequest = require('./models/MusicRequest');
const Comment = require('./models/Comment');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  const songCount = await MusicRequest.countDocuments();
  if (songCount === 0) {
    await MusicRequest.insertMany([
      { title: 'Bailes', artist: 'Lode I Onegui', userName: 'Comunidad', hearts: 123 },
      { title: 'Agradecida', artist: 'Samy García', userName: 'Comunidad', hearts: 98 },
      { title: 'Todo cambia', artist: 'Corina', userName: 'Comunidad', hearts: 70 }
    ]);
    console.log('Canciones iniciales creadas.');
  }

  const commentCount = await Comment.countDocuments();
  if (commentCount === 0) {
    await Comment.insertMany([
      { text: 'Hubo un tiempo en que no quería subir al metro. Hoy le sonrío a un desconocido.', authorName: 'Laura M.' },
      { text: 'Esta comunidad me enseñó a hablar sin miedo.', authorName: 'Andrés R.' },
      { text: 'Pedí una canción una mañana gris. Alguien la escuchó y me escribió que también la necesitaba.', authorName: 'Anónimo' }
    ]);
    console.log('Comentarios iniciales creados.');
  }

  console.log('Listo.');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
