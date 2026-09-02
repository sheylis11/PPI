const nodemailer = require('nodemailer');

function buildTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

async function sendReportEmail(report) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('[mailer] EMAIL_USER/EMAIL_PASS no configurados. No se envió el correo real, solo se guardó el reporte.');
    return { sent: false, reason: 'missing_credentials' };
  }

  const transporter = buildTransport();
  const to = process.env.EMAIL_TO || 'AyudaMetroMedellin@gmail.com';

  const html = `
    <h2>Nuevo reporte de un trabajador del Metro</h2>
    <p><strong>Nombre:</strong> ${report.workerName}</p>
    <p><strong>Cargo / Estación:</strong> ${report.station}</p>
    <p><strong>Fecha del reporte:</strong> ${report.reportDate}</p>
    <p><strong>Tipo de problema:</strong> ${report.problemType}</p>
    <p><strong>Urgencia:</strong> ${report.urgency}</p>
    <p><strong>Descripción:</strong></p>
    <p>${report.description.replace(/\n/g, '<br>')}</p>
    <p><strong>Contacto de vuelta (opcional):</strong> ${report.contact || 'No proporcionado'}</p>
    <hr>
    <p style="color:#888;font-size:12px">Enviado automáticamente desde Animemos Nuestro Metro el ${new Date(report.createdAt).toLocaleString('es-CO')}</p>
  `;

  await transporter.sendMail({
    from: `"Animemos Nuestro Metro" <${process.env.EMAIL_USER}>`,
    to,
    subject: `[Reporte Metro] ${report.problemType} - ${report.station}`,
    html
  });

  return { sent: true };
}

module.exports = { sendReportEmail };
