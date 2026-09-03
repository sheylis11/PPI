const express = require('express');
const supabase = require('../supabase');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      name,
      relationship,
      reportDate,
      problemType,
      description,
      phone,
      email
    } = req.body;

    if (!name || !relationship || !reportDate || !problemType || !description) {
      return res.status(400).json({
        error: 'Completa todos los campos obligatorios.'
      });
    }

    const { data, error } = await supabase
      .from('someone_reports')
      .insert({
        name,
        relationship,
        report_date: `${reportDate}T00:00:00`,
        problem_type: problemType,
        description,
        phone: phone || null,
        email: email || null
      })
      .select()
      .single();

    if (error) {
      console.error('ERROR SUPABASE someone_reports:', error);

      return res.status(500).json({
        error: 'No se pudo registrar la situación en Supabase.',
        detail: error.message
      });
    }

    return res.status(201).json({
      message: 'La situación fue registrada correctamente.',
      report: data
    });
  } catch (error) {
    console.error('ERROR someone_reports:', error);

    return res.status(500).json({
      error: 'Error interno del servidor.'
    });
  }
});
router.get('/', requireAuth(['worker']), async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('someone_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('ERROR SUPABASE AL CONSULTAR someone_reports:', error);

      return res.status(500).json({
        error: 'No se pudieron cargar los reportes.',
        detail: error.message
      });
    }

    return res.json({
      reports: data
    });
  } catch (error) {
    console.error('ERROR AL CONSULTAR REPORTES:', error);

    return res.status(500).json({
      error: 'Error interno del servidor.'
    });
  }
});
module.exports = router;
