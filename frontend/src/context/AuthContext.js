import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // session = { role: 'user' | 'worker', name, token } o null si nadie ha entrado
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function restoreSession() {
      const token = localStorage.getItem('anm_token');
      const role = localStorage.getItem('anm_role');
      const name = localStorage.getItem('anm_name');

      if (!token) {
        setSession(null);
        return;
      }

      try {
        const res = await api.get('/auth/me');
        if (res.data?.user) {
          const nextSession = { token, role: role || 'user', name: res.data.user.name };
          localStorage.setItem('anm_role', nextSession.role);
          localStorage.setItem('anm_name', nextSession.name);
          setSession(nextSession);
        } else {
          clearSession();
        }
      } catch (err) {
        clearSession();
      }
    }

    restoreSession();

    const handleExpired = () => clearSession();
    window.addEventListener('auth:expired', handleExpired);
    return () => window.removeEventListener('auth:expired', handleExpired);
  }, []);

  function persist(token, role, name) {
    localStorage.setItem('anm_token', token);
    localStorage.setItem('anm_role', role);
    localStorage.setItem('anm_name', name);
    setSession({ token, role, name });
  }

  function clearSession() {
    localStorage.removeItem('anm_token');
    localStorage.removeItem('anm_role');
    localStorage.removeItem('anm_name');
    setSession(null);
  }

  // --- Usuarios normales ---
  async function registerUser(data) {
    const res = await api.post('/auth/register', data);
    persist(res.data.token, 'user', res.data.user.name);
    return res.data;
  }

  async function loginUser(data) {
    const res = await api.post('/auth/login', data);
    persist(res.data.token, 'user', res.data.user.name);
    return res.data;
  }

  // --- Trabajadores del Metro (contraseña propia) ---
  async function registerWorker(data) {
    const res = await api.post('/workers/register', data);
    persist(res.data.token, 'worker', res.data.worker.name);
    return res.data;
  }

  async function loginWorker(data) {
    const res = await api.post('/workers/login', data);
    persist(res.data.token, 'worker', res.data.worker.name);
    return res.data;
  }

  function logout() {
    clearSession();
  }

  return (
    <AuthContext.Provider
      value={{ session, registerUser, loginUser, registerWorker, loginWorker, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
