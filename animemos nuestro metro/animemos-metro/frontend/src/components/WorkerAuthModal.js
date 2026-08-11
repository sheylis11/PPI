import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function WorkerAuthModal({ show, onClose }) {
  const { registerWorker, loginWorker } = useAuth();
  const [mode, setMode] = useState('register'); // 'register' | 'login'
  const [form, setForm] = useState({ name: '', email: '', employeeId: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'register') {
        await registerWorker(form);
      } else {
        await loginWorker({ email: form.email, password: form.password });
      }
      onClose();
      setForm({ name: '', email: '', employeeId: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Algo salió mal, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="anm-modal-backdrop" onClick={onClose}>
      <div className="anm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="anm-modal-close" onClick={onClose}>×</button>
        <span className="anm-worker-badge">Equipo Metro</span>
        <h3 className="fw-bold mb-1 mt-2">{mode === 'register' ? 'Regístrate como trabajador' : 'Inicia sesión como trabajador'}</h3>
        <p className="text-muted mb-4">
          Acceso para el personal del Metro, con tu propia cuenta y contraseña. Aquí podrás enviar reportes que llegan por correo al equipo de bienestar.
        </p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              <div className="mb-3">
                <label className="form-label">Nombre completo</label>
                <input className="form-control" required value={form.name} onChange={(e) => update('name', e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Código de empleado / cédula</label>
                <input className="form-control" required value={form.employeeId} onChange={(e) => update('employeeId', e.target.value)} />
              </div>
            </>
          )}
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input type="email" className="form-control" required value={form.email} onChange={(e) => update('email', e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" required minLength={6} value={form.password} onChange={(e) => update('password', e.target.value)} />
          </div>
          <button className="btn anm-btn-primary w-100" disabled={loading}>
            {loading ? 'Un momento...' : mode === 'register' ? 'Registrarme' : 'Entrar'}
          </button>
        </form>

        <p className="text-center mt-3 mb-0 small">
          {mode === 'register' ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <button type="button" className="btn btn-link p-0" onClick={() => setMode(mode === 'register' ? 'login' : 'register')}>
            {mode === 'register' ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  );
}
