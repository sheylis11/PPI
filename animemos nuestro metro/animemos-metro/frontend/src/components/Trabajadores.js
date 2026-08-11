import React, { useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const PROBLEM_TYPES = [
  'Persona en crisis emocional',
  'Acoso o comportamiento inapropiado',
  'Accidente o emergencia médica',
  'Seguridad de la estación',
  'Mantenimiento / infraestructura',
  'Otro'
];

export default function Trabajadores({ onOpenWorkerAuth }) {
  const { session } = useAuth();
  const isWorker = session?.role === 'worker';

  const [form, setForm] = useState({
    workerName: session?.name || '',
    station: '',
    problemType: PROBLEM_TYPES[0],
    urgency: 'media',
    description: '',
    contact: ''
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await api.post('/workers/report', form);
      setStatus({ ok: true, msg: res.data.message });
      setForm((f) => ({ ...f, station: '', description: '', contact: '' }));
    } catch (err) {
      setStatus({ ok: false, msg: err.response?.data?.error || 'No se pudo enviar el reporte.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="trabajadores" className="py-5 anm-trabajadores-bg">
      <div className="container">
        {!isWorker ? (
          <div className="anm-worker-card">
            <div>
              <span className="anm-worker-tag">Sección independiente</span>
              <h2>Espacio para el equipo del Metro</h2>
              <p>Regístrate o inicia sesión como trabajador para reportar una situación directamente al equipo de bienestar. El reporte llega por correo de verdad.</p>
            </div>
            <button className="btn anm-btn-ghost" onClick={onOpenWorkerAuth}>Ingresar / Registrarme</button>
          </div>
        ) : (
          <div className="anm-worker-card flex-column align-items-stretch">
            <span className="anm-worker-tag mb-3">Sección independiente</span>
            <h2 className="mb-2">Formulario de reporte</h2>
            <p className="mb-4">Cuéntanos qué está pasando. Este reporte se enviará directamente al correo del equipo de bienestar del Metro.</p>

            {status && (
              <div className={`alert ${status.ok ? 'alert-success' : 'alert-danger'}`}>{status.msg}</div>
            )}

            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Tu nombre</label>
                <input className="form-control" required value={form.workerName} onChange={(e) => update('workerName', e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Estación / cargo</label>
                <input className="form-control" required placeholder="Ej: Estación San Antonio, operador de andén" value={form.station} onChange={(e) => update('station', e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Tipo de problema</label>
                <select className="form-select" value={form.problemType} onChange={(e) => update('problemType', e.target.value)}>
                  {PROBLEM_TYPES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Urgencia</label>
                <select className="form-select" value={form.urgency} onChange={(e) => update('urgency', e.target.value)}>
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta — requiere atención inmediata</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Descripción del problema</label>
                <textarea className="form-control" rows={4} required value={form.description} onChange={(e) => update('description', e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Un contacto tuyo para dar seguimiento (opcional)</label>
                <input className="form-control" value={form.contact} onChange={(e) => update('contact', e.target.value)} />
              </div>
              <div className="col-12">
                <button className="btn anm-btn-primary" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar reporte'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
