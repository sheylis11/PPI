import React from 'react';
import { WHATSAPP_LINK } from '../api';

export default function Cierre() {
  return (
    <section id="cierre" className="py-5 anm-cierre-bg text-center text-white">
      <div className="container position-relative">
        <p className="anm-lede">Tu vida tiene mucho que contar. Sigamos escribiendo esta historia juntos.</p>
        <p className="anm-solo">NO ESTÁS SOLO/A.</p>
        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn anm-btn-primary-alt mt-3">
          Pide ayuda ahora
        </a>
        <p className="anm-valiente mt-3">Pedir ayuda es valiente.</p>
      </div>
    </section>
  );
}
