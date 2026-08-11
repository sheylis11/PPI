import React from 'react';

export default function ProofCluster() {
  return (
    <section className="py-5 anm-proof-bg text-center text-white">
      <div className="container">
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="anm-proof-fig">24/7</div>
            <div className="anm-proof-lbl">Línea de apoyo disponible siempre</div>
          </div>
          <div className="col-md-4">
            <div className="anm-proof-fig">6</div>
            <div className="anm-proof-lbl">canales de acompañamiento</div>
          </div>
          <div className="col-md-4">
            <div className="anm-proof-fig">100%</div>
            <div className="anm-proof-lbl">confidencial y gratuito</div>
          </div>
        </div>
        <a href="tel:123" className="anm-emergency">
          <span><small>Emergencia</small>123</span>
        </a>
      </div>
    </section>
  );
}
