import React from 'react';

export default function PathSelector() {
  return (
    <section id="path-selector" className="py-5">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 gap-3">
          <h2 className="fw-black anm-title">¿Cómo llegas hoy?</h2>
          <p className="anm-primary fw-semibold" style={{ maxWidth: 280 }}>
            Elige el camino que te acompaña mejor. Cualquiera está bien.
          </p>
        </div>
        <div className="row g-4">
          <div className="col-lg-7">
            <a href="#para-usuarios" className="anm-path-card d-block h-100 text-decoration-none">
              <span className="anm-path-tag">Vengo por mí</span>
              <h3>Escúchate</h3>
              <p>Pide una canción, cuéntanos cómo te sientes y encuentra técnicas simples para respirar cuando todo pesa. Este espacio es tuyo.</p>
              <span className="anm-path-link">Entrar a mi espacio →</span>
            </a>
          </div>
          <div className="col-lg-5">
            <a href="#para-familiares" className="anm-path-card d-block h-100 text-decoration-none">
              <span className="anm-path-tag alt">Vengo por alguien más</span>
              <h3>Acompaña</h3>
              <p>¿Cómo ayudo a mi persona? Te acompañamos a acompañar, sin agotarte en el camino.</p>
              <span className="anm-path-link">Ver la guía →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
