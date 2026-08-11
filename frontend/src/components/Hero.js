import React from 'react';
import { WHATSAPP_LINK } from '../api';

export default function Hero() {
  return (
    <section id="hero" className="anm-hero">
      <div className="anm-hero-scrim" />
      <div className="container anm-hero-content">
        <p className="anm-eyebrow">No estás solo/a</p>
        <h1>
          ANIMEMOS
          <br />
          NUESTRO <em>METRO</em>
        </h1>
        <p className="anm-hero-sub">
          Un espacio para cuidarnos entre todos. Aquí puedes respirar, pedir una canción y contar cómo te sientes — a tu ritmo.
        </p>
        <div className="d-flex flex-wrap gap-3 mt-4">
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn anm-btn-primary">
            Pide ayuda ahora
          </a>
          <a href="#para-familiares" className="btn anm-btn-outline">
            Soy familiar de un afectado
          </a>
        </div>
      </div>
    </section>
  );
}
