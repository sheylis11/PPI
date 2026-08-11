require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');

const authRoutes = require('./routes/auth');
const workerRoutes = require('./routes/workers');
const musicRoutes = require('./routes/music');
const commentRoutes = require('./routes/comments');
const assistantRoutes = require('./routes/assistant');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true, name: 'Animemos Nuestro Metro API' }));

app.use('/api/auth', authRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/assistant', assistantRoutes);

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor de Animemos Nuestro Metro corriendo en http://localhost:${PORT}`);
  });
});
