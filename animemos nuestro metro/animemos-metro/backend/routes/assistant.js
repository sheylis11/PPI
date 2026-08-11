const express = require('express');
const Groq = require('groq-sdk');

const router = express.Router();

const SYSTEM_PROMPT = `Eres el asistente virtual de "Animemos Nuestro Metro", un espacio de acompañamiento emocional para usuarios y trabajadores del Metro de Medellín.

Tu tono es cálido, cercano, respetuoso y natural. Habla siempre en español de Colombia.

Reglas importantes:
- NO eres un psicólogo ni un médico. No das diagnósticos ni indicaciones clínicas.
- Puedes escuchar, conversar y brindar orientación emocional general.
- Para ansiedad leve, estrés, tristeza o preocupación cotidiana puedes ofrecer compañía y ejercicios sencillos de respiración.
- Nunca minimices lo que la persona siente.
- No inventes información sobre el Metro de Medellín.
- Si no sabes algo, dilo claramente.
- Sé breve y natural: máximo 4-5 frases por respuesta.
- Puedes hacer preguntas sencillas para comprender mejor cómo se siente la persona.
- Si la persona menciona ideas de hacerse daño, suicidio o una crisis emocional grave, valida lo que siente y recomienda buscar ayuda inmediata de una persona de confianza y contactar los servicios de emergencia de su zona.
- No prometas confidencialidad absoluta ni digas que reemplazas a un profesional.

El objetivo es que la persona se sienta escuchada y acompañada.`;

router.post('/chat', async (req, res) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(503).json({
        error: 'El asistente de IA no está configurado todavía.'
      });
    }

    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: 'Falta el mensaje del usuario.'
      });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        ...messages.map((m) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: String(m.content)
        }))
      ],
      temperature: 0.7,
      max_tokens: 400
    });

    const reply =
      response.choices?.[0]?.message?.content ||
      'No pude generar una respuesta. Intenta de nuevo.';

    res.json({ reply });

  } catch (err) {
    console.error('ERROR IA GROQ:', err);

    res.status(500).json({
      error: 'Error del servidor al hablar con el asistente de IA.'
    });
  }
});

module.exports = router;
