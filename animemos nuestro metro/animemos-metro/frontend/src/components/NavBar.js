import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function NavBar({ onOpenAuth, onOpenWorkerAuth }) {
  const { session, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="anm-navbar">
      <div className="container d-flex align-items-center justify-content-between py-2">
        <a href="#hero" className="anm-wordmark" onClick={closeMenu}>
          Animemos Nuestro <span>Metro</span>
        </a>

        <button className="anm-burger d-lg-none" onClick={() => setMenuOpen((o) => !o)} aria-label="Abrir menú">
          {menuOpen ? '×' : '☰'}
        </button>

        <nav className="d-none d-lg-flex align-items-center gap-4">
          <a href="#para-usuarios">Vengo por mí</a>
          <a href="#para-familiares">Vengo por alguien</a>
          <a href="#comunidad">Comunidad</a>
          <a href="#trabajadores">Equipo Metro</a>

          {session ? (
            <span className="d-flex align-items-center gap-3">
              <span className="text-light small">
                {session.role === 'worker' ? 'Trabajador' : 'Hola'}, {session.name}
              </span>
              <button className="btn btn-sm btn-outline-light rounded-pill" onClick={logout}>
                Salir
              </button>
            </span>
          ) : (
            <span className="d-flex align-items-center gap-2">
              <button className="btn btn-sm btn-outline-light rounded-pill" onClick={onOpenAuth}>
                Registrarme
              </button>
              <button className="btn btn-sm anm-btn-cta rounded-pill" onClick={onOpenWorkerAuth}>
                Soy trabajador Metro
              </button>
            </span>
          )}
        </nav>
      </div>

      {menuOpen && (
        <div className="anm-mobile-menu d-lg-none">
          <a href="#para-usuarios" onClick={closeMenu}>Vengo por mí</a>
          <a href="#para-familiares" onClick={closeMenu}>Vengo por alguien</a>
          <a href="#comunidad" onClick={closeMenu}>Comunidad</a>
          <a href="#trabajadores" onClick={closeMenu}>Equipo Metro</a>

          {session ? (
            <button className="btn btn-outline-light rounded-pill mt-2" onClick={() => { logout(); closeMenu(); }}>
              Salir ({session.name})
            </button>
          ) : (
            <>
              <button className="btn btn-outline-light rounded-pill mt-2" onClick={() => { onOpenAuth(); closeMenu(); }}>
                Registrarme
              </button>
              <button className="btn anm-btn-cta rounded-pill mt-2" onClick={() => { onOpenWorkerAuth(); closeMenu(); }}>
                Soy trabajador Metro
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
