import React, { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Comunidad() {
  const { session } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [anonymous, setAnonymous] = useState(true);
  const [status, setStatus] = useState('');

  function load() {
    api.get('/comments').then((res) => setComments(res.data)).catch(() => {});
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await api.post('/comments', { text, authorName: session?.name, anonymous });
      setText('');
      setStatus('¡Gracias por compartir tu historia!');
      load();
    } catch (err) {
      setStatus(err.response?.data?.error || 'No se pudo publicar tu comentario.');
    }
  }

  return (
    <section id="comunidad" className="py-5">
      <div className="container">
        <div className="anm-com-hero mb-5">
          <div className="anm-com-hero-txt">
            <h2>No estás solo/a</h2>
            <p>Mensajes reales y anónimos de personas que también viajan contigo.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="anm-comment-form mb-5">
          <textarea
            className="form-control mb-2"
            rows={3}
            placeholder="Comparte algo que te ayudó, o cómo te sientes hoy..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="anon" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
              <label className="form-check-label small" htmlFor="anon">Publicar como anónimo</label>
            </div>
            <button className="btn anm-btn-ghost">Publicar en el muro</button>
          </div>
          {status && <p className="small mt-2 anm-secondary">{status}</p>}
        </form>

        <div className="anm-wall">
          {comments.map((c, i) => (
            <div className={`anm-note anm-note-${i % 3}`} key={c.id}>
              <p>"{c.text}"</p>
              <div className="anm-note-who">— {c.authorName}</div>
            </div>
          ))}
        </div>
        <p className="anm-com-close text-center mt-4">Tu historia también puede ayudar a alguien.</p>
      </div>
    </section>
  );
}
