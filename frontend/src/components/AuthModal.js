import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ show, onClose }) {
  const { registerUser, loginUser } = useAuth();
  const [mode, setMode] = useState('register'); // 'register' | 'login'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
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
        await registerUser(form);
      } else {
        await loginUser({ email: form.email, password: form.password });
      }
      onClose();
      setForm({ name: '', email: '', password: '' });
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
        <h3 className="fw-bold mb-1">{mode === 'register' ? 'Crea tu cuenta' : 'Inicia sesión'}</h3>
        <p className="text-muted mb-4">Este espacio es tuyo. Regístrate para pedir canciones, comentar y hablar con el asistente.</p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input className="form-control" required value={form.name} onChange={(e) => update('name', e.target.value)} />
            </div>
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
          <button className="btn btn-link p-0" onClick={() => setMode(mode === 'register' ? 'login' : 'register')}>
            {mode === 'register' ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  );
}
