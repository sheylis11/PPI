const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

const router = express.Router();

const SYSTEM_PROMPT = `Eres el asistente virtual de "Animemos Nuestro Metro", un espacio de acompañamiento
emocional para usuarios del Metro de Medellín. Tu tono es cálido, cercano y respetuoso.

Reglas importantes:
- NO eres un psicólogo ni un médico. No das diagnósticos ni indicaciones clínicas.
- Si la persona menciona ideas de hacerse daño, de suicidio, o una crisis emocional grave,
  responde con calma, valida lo que siente, y anímala de inmediato a llamar a la Línea de
  Emergencia 123 o a escribir al WhatsApp de acompañamiento. No la dejes sin una salida concreta.
- Para malestar cotidiano (ansiedad leve, estrés, tristeza) puedes ofrecer compañía, técnicas de
  respiración simples (como la 4-7-8) y palabras de aliento.
- Sé breve (máximo 4-5 frases por respuesta) y habla en español de Colombia.
- Nunca minimices lo que la persona siente.`;

router.post('/chat', async (req, res) => {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(503).json({
        error: 'El asistente de IA no está configurado todavía. Agrega ANTHROPIC_API_KEY en el archivo .env del backend.'
      });
    }

    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Falta el mensaje del usuario.' });
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({ role: m.role, content: m.content }))
    });

    const textBlock = response.content.find((c) => c.type === 'text');
    res.json({ reply: textBlock ? textBlock.text : 'No pude generar una respuesta, intenta de nuevo.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor al hablar con el asistente de IA.' });
  }
});

module.exports = router;
