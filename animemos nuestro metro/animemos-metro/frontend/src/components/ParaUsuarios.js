import React, { useEffect, useState } from 'react';
import AhorcadoEmociones from './AhorcadoEmociones';
import api, { WHATSAPP_LINK } from '../api';
import { useAuth } from '../context/AuthContext';

function MusicTab() {
  const { session } = useAuth();
  const [songs, setSongs] = useState([]);
  const [form, setForm] = useState({ title: '', artist: '', message: '' });
  const [status, setStatus] = useState('');

  function load() {
    api.get('/music').then((res) => setSongs(res.data)).catch(() => {});
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.artist) return;
    try {
      await api.post('/music', { ...form, userName: session?.name || 'Anónimo' });
      setForm({ title: '', artist: '', message: '' });
      setStatus('¡Gracias! Tu canción ya está en la lista.');
      load();
    } catch (err) {
      setStatus(err.response?.data?.error || 'No se pudo enviar tu canción.');
    }
  }

  async function like(id) {
    await api.post(`/music/${id}/like`);
    load();
  }

  return (
    <div>
      <p style={{ maxWidth: 560, color: '#4a3560' }} className="mb-4">
        Elige música que exprese lo que sientes. A veces una canción dice lo que las palabras no alcanzan.
      </p>

      <form onSubmit={handleSubmit} className="anm-song-form mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input className="form-control" placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" placeholder="Artista" value={form.artist} onChange={(e) => setForm({ ...form, artist: e.target.value })} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" placeholder="Mensaje (opcional)" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
        </div>
        <button className="btn anm-btn-ghost mt-2">Pedir esta canción</button>
        {status && <p className="small mt-2 anm-secondary">{status}</p>}
      </form>

      <div className="anm-song-list">
        {songs.map((s) => (
          <div className="anm-song" key={s.id}>
            <div>
              <span className="anm-song-title">{s.title}</span>
              <br />
              <span className="anm-song-artist">{s.artist}</span>
              {s.message && <p className="small mb-0 mt-1 text-muted fst-italic">"{s.message}"</p>}
            </div>
            <button className="anm-hearts" onClick={() => like(s.id)}>♥ {s.hearts}</button>
          </div>
        ))}
      </div>
      <p className="mt-3 anm-secondary fw-semibold">Tu canción puede sonar en el metro y acompañar a alguien más.</p>
    </div>
  );
}

function AprendeTab() {
  return (
    <div className="row g-4">
      <div className="col-lg-7">
        <div className="anm-info-card h-100">
          <h4>¿Qué es la ansiedad?</h4>
          <p>Es la manera en que tu cuerpo se prepara ante lo que siente como una amenaza. Es real, es común y se puede aprender a manejar. Sentirla no te hace débil.</p>
        </div>
      </div>
      <div className="col-lg-5">
        <div className="anm-info-card anm-breath h-100">
          <h4>Respiración 4-7-8</h4>
          <p>Una técnica simple que puedes usar en cualquier estación.</p>
          <div className="d-flex gap-2 mt-3">
            <div className="anm-bstep"><span className="n">4</span><span className="l">Inhala</span></div>
            <div className="anm-bstep"><span className="n">7</span><span className="l">Sostén</span></div>
            <div className="anm-bstep"><span className="n">8</span><span className="l">Exhala</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActividadesTab() {
  const items = [
    { title: 'Expresa lo que sientes con arte', desc: 'Un taller para poner en color lo que a veces no cabe en palabras.', time: 'Sábados 28 de mayo · 6:00 – 8:00 p.m. · Estación San Antonio' },
    { title: 'Concierto artístico "Vamos que puedes"', desc: 'Música en vivo para respirar y sentirte acompañado/a.', time: 'Viernes 30 de mayo · 6:00 – 9:00 p.m. · Estación Universidad' },
    { title: 'Hablemos sin miedo', desc: 'Círculo de conversación abierta y respetuosa.', time: 'Martes 20 de mayo · 5:00 – 6:30 p.m. · Estación Poblado' }
  ];
  return (
    <div className="d-grid gap-3" style={{ maxWidth: 640 }}>
      {items.map((it) => (
        <div className="anm-act" key={it.title}>
          <div>
            <h4>{it.title}</h4>
            <p className="mb-1">{it.desc}</p>
            <p className="anm-act-time mb-0">{it.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ParaUsuarios() {
  const [tab, setTab] = useState('cancion');

  return (
    <section id="para-usuarios" className="py-5 anm-usuarios-bg">
      <div className="container">
        <p className="anm-eyebrow-alt">Para ti</p>
        <h2 className="anm-title mb-4" style={{ maxWidth: 720 }}>Este viaje también es un buen momento para cuidarte.</h2>

        <div className="d-flex flex-wrap gap-2 mb-4">
          <button className={`anm-tab ${tab === 'cancion' ? 'active' : ''}`} onClick={() => setTab('cancion')}>Pide una canción</button>
          <button className={`anm-tab ${tab === 'aprende' ? 'active' : ''}`} onClick={() => setTab('aprende')}>Aprende y entiende</button>
          <button className={`anm-tab ${tab === 'actividades' ? 'active' : ''}`} onClick={() => setTab('actividades')}>Actividades en el metro</button>
<button
  className={`anm-tab ${tab === 'ahorcado' ? 'active' : ''}`}
  onClick={() => setTab('ahorcado')}
>
   💭 Adivina la emoción
</button>
        </div>

        {tab === 'cancion' && <MusicTab />}
        {tab === 'aprende' && <AprendeTab />}
        {tab === 'actividades' && <ActividadesTab />}
        {tab === 'ahorcado' && <AhorcadoEmociones />}

        <div className="text-center mt-5">
          <p className="anm-empower-big">Eres más fuerte de lo que crees.</p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn anm-btn-ghost">
            Habla con alguien ahora
          </a>
        </div>
      </div>
    </section>
  );
}
