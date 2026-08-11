import React from 'react';
import { WHATSAPP_LINK } from '../api';

export default function ParaFamiliares() {
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
      </div>
    </section>
  );
}
