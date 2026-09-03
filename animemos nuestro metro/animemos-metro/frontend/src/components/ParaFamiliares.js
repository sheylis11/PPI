import React, { useState } from 'react';
import api, { WHATSAPP_LINK } from '../api';

export default function ParaFamiliares() {
  const PROBLEM_TYPES = [
    'Bienestar emocional',
    'Situación de riesgo',
    'Ansiedad, tristeza o angustia',
    'Problema personal o familiar',
    'Acoso o comportamiento inapropiado',
    'Otra situación'
  ];

  const [form, setForm] = useState({
    name: '',
    relationship: '',
    reportDate: '',
    problemType: PROBLEM_TYPES[0],
    description: '',
    phone: '',
    email: ''
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await api.post('/someone-reports', form);

      setStatus({
        ok: true,
        msg: res.data.message
      });

      setForm({
        name: '',
        relationship: '',
        reportDate: '',
        problemType: PROBLEM_TYPES[0],
        description: '',
        phone: '',
        email: ''
      });
    } catch (err) {
      setStatus({
        ok: false,
        msg: err.response?.data?.error || 'No se pudo registrar la situación.'
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <section id="para-familiares" className="py-5 anm-familiares-bg">
      <div className="container">
        <p className="anm-eyebrow-accent">Para quien cuida</p>
        <h2 className="anm-title text-white mb-2">Estás aquí porque te importa alguien.</h2>
        <p className="anm-fam-intro">Acompañar a una persona que está pasando por un momento difícil también requiere de guía y de calma. Empecemos por ti.</p>

        <div className="row g-4 mt-3">
          {[
            { n: 1, t: 'Escuchar sin juzgar', d: 'Deja que hable a su ritmo. No hace falta resolverlo todo — a veces basta con estar presente y sostener el silencio.' },
            { n: 2, t: 'Acompañar', d: 'Ofrécele compañía concreta: un viaje juntos, una llamada, estar cerca sin presionar. Que sepa que no está solo/a.' },
            { n: 3, t: 'Buscar ayuda profesional', d: 'Anímale con cariño a hablar con un profesional. Puedes derivarle a nuestras líneas de acompañamiento cuando esté listo/a.' }
          ].map((s) => (
            <div className="col-md-4" key={s.n}>
              <div className="anm-step">
                <div className="anm-step-num">{s.n}</div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 mt-2">
          <div className="col-md-6">
            <div className="anm-fam-panel">
              <h4>Cuidar sin agotarte</h4>
              <ul>
                <li>Reconoce tus propios límites: cuidarte no es egoísmo.</li>
                <li>Comparte la responsabilidad con otras personas de confianza.</li>
                <li>Date pausas y espacios para respirar.</li>
                <li>Pide apoyo cuando lo necesites — también para ti.</li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="anm-fam-panel">
              <h4>Recursos y líneas para derivar</h4>
              <ul>
                <li>Línea de apoyo emocional 24/7.</li>
                <li>Acompañamiento profesional confidencial.</li>
                <li>Talleres para familias que acompañan.</li>
                <li>Emergencia inmediata: <strong className="text-white">123</strong>.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="anm-fam-close mt-5 d-flex flex-wrap align-items-center justify-content-between gap-4">
          <p className="mb-0 fw-bold text-white fs-4">Cuidar a alguien también pide cuidarte a ti.</p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn anm-btn-primary-alt">
            Habla con un profesional
          </a>
        </div>
        <div className="mt-5">
          <div className="anm-fam-panel">
            <h4>¿Vienes por alguien?</h4>
            <p>
              Si estás aquí para acompañar a otra persona, puedes registrar
              una situación para que podamos conocer lo que está pasando.
            </p>

            {status && (
              <div className={`alert ${status.ok ? 'alert-success' : 'alert-danger'}`}>
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Tu nombre</label>
                <input
                  className="form-control"
                  required
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">¿Por quién vienes?</label>
                <input
                  className="form-control"
                  required
                  placeholder="Ej: amigo, familiar, compañero"
                  value={form.relationship}
                  onChange={(e) => update('relationship', e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Fecha del reporte</label>
                <input
                  className="form-control"
                  type="date"
                  required
                  value={form.reportDate}
                  onChange={(e) => update('reportDate', e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">¿Cuál es el asunto o problema?</label>
                <select
                  className="form-select"
                  value={form.problemType}
                  onChange={(e) => update('problemType', e.target.value)}
                >
                  {PROBLEM_TYPES.map((problem) => (
                    <option key={problem}>{problem}</option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Cuéntanos qué está pasando</label>
                <textarea
                  className="form-control"
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Celular (opcional)</label>
                <input
                  className="form-control"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Correo electrónico (opcional)</label>
                <input
                  className="form-control"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                />
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="btn anm-btn-primary-alt"
                  disabled={loading}
                >
                  {loading ? 'Registrando...' : 'Registrar situación'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
