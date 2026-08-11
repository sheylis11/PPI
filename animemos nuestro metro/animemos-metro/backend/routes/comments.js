const express = require('express');
const Comment = require('../models/Comment');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const list = await Comment.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al cargar los comentarios.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { text, authorName, anonymous } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'El comentario no puede estar vacío.' });
    }
    const comment = await Comment.create({
      text: text.trim(),
      authorName: anonymous ? 'Anónimo' : (authorName || 'Anónimo')
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al publicar el comentario.' });
  }
});

module.exports = router;
