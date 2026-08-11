const express = require('express');
const MusicRequest = require('../models/MusicRequest');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const list = await MusicRequest.find().sort({ hearts: -1, createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al cargar las canciones.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, artist, message, userName } = req.body;
    if (!title || !artist) {
      return res.status(400).json({ error: 'El título y el artista son obligatorios.' });
    }
    const entry = await MusicRequest.create({ title, artist, message: message || '', userName: userName || 'Anónimo' });
    res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar la canción.' });
  }
});

router.post('/:id/like', async (req, res) => {
  try {
    const song = await MusicRequest.findByIdAndUpdate(req.params.id, { $inc: { hearts: 1 } }, { new: true });
    if (!song) return res.status(404).json({ error: 'Canción no encontrada.' });
    res.json(song);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al dar corazón a la canción.' });
  }
});

module.exports = router;
