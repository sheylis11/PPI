import React, { useState } from 'react';
import api from '../api';

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hola, soy el asistente de Animemos Nuestro Metro. ¿Cómo te sientes hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function send(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const next = [...messages, { role: 'user', content: input }];
    setMessages(next);
    setInput('');
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/assistant/chat', { messages: next });
      setMessages([...next, { role: 'assistant', content: res.data.reply }]);
    } catch (err) {
      setError(err.response?.data?.error || 'El asistente no está disponible en este momento.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button className="anm-fab" onClick={() => setOpen((o) => !o)} aria-label="Abrir asistente">
        {open ? '×' : '💬'}
      </button>

      {open && (
        <div className="anm-chat-panel">
          <div className="anm-chat-header">
            <strong>Asistente Animemos</strong>
            <span className="small d-block text-white-50">No reemplaza ayuda profesional</span>
          </div>
          <div className="anm-chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`anm-chat-msg ${m.role}`}>{m.content}</div>
            ))}
            {loading && <div className="anm-chat-msg assistant">Escribiendo...</div>}
            {error && <div className="anm-chat-msg error">{error}</div>}
          </div>
          <form className="anm-chat-input" onSubmit={send}>
            <input
              className="form-control"
              placeholder="Escribe cómo te sientes..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn anm-btn-primary" disabled={loading}>Enviar</button>
          </form>
        </div>
      )}
    </>
  );
}
