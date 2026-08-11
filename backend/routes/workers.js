const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Worker = require('../models/Worker');
const Report = require('../models/Report');
const { requireAuth } = require('../middleware/auth');
const { sendReportEmail } = require('../utils/mailer');
const allowedEmployees = require('../allowedEmployees');

const router = express.Router();

// Registro de un trabajador del Metro (contraseña propia, no compartida).
// Solo se permite si el número de documento está en la lista de autorizados.
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, employeeId } = req.body;
    if (!name || !email || !password || !employeeId) {
      return res.status(400).json({ error: 'Nombre, correo, código de empleado y contraseña son obligatorios.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    const normalizedId = employeeId.replace(/\s|\.|-/g, '');
    const authorized = allowedEmployees.find((w) => w.idNumber.replace(/\s|\.|-/g, '') === normalizedId);
    if (!authorized) {
      return res.status(403).json({ error: 'Tu número de documento no está en la lista de personal autorizado. Contacta al equipo de bienestar del Metro.' });
    }

    const exists = await Worker.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({ error: 'Ya existe una cuenta de trabajador con ese correo.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const worker = await Worker.create({ name, email, employeeId, passwordHash });

    const token = jwt.sign({ id: worker._id, name: worker.name, role: 'worker' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, worker: { id: worker._id, name: worker.name, email: worker.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor al registrar el trabajador.' });
  }
});

// Login de trabajador con su propia contraseña
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const worker = await Worker.findOne({ email: (email || '').toLowerCase() });
    if (!worker) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
    }
    const ok = await bcrypt.compare(password, worker.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
    }
    const token = jwt.sign({ id: worker._id, name: worker.name, role: 'worker' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, worker: { id: worker._id, name: worker.name, email: worker.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor al iniciar sesión.' });
  }
});

// Formulario de reporte: solo trabajadores autenticados. Se guarda en Mongo
// y se envía un correo real a AyudaMetroMedellin@gmail.com.
router.post('/report', requireAuth(['worker']), async (req, res) => {
  try {
    const { workerName, station, problemType, description, urgency, contact } = req.body;
    if (!workerName || !station || !problemType || !description) {
      return res.status(400).json({ error: 'Nombre, estación, tipo de problema y descripción son obligatorios.' });
    }

    const report = await Report.create({
      workerId: req.user.id,
      workerName,
      station,
      problemType,
      description,
      urgency: urgency || 'media',
      contact: contact || ''
    });

    const mailResult = await sendReportEmail(report);
    report.mailSent = mailResult.sent;
    await report.save();

    res.status(201).json({
      message: mailResult.sent
        ? 'Reporte enviado y correo entregado correctamente.'
        : 'Reporte guardado. El correo no se envió porque el servidor no tiene configuradas las credenciales de EMAIL_USER/EMAIL_PASS.',
      mailSent: mailResult.sent,
      report
    });
  } catch (err) {
  console.error('ERROR COMPLETO AL ENVIAR REPORTE:', err);
  console.error('MENSAJE:', err.message);
  console.error('STACK:', err.stack);

  res.status(500).json({
    error: 'Error del servidor al enviar el reporte.',
    detail: err.message
  });
}
});

module.exports = router;
