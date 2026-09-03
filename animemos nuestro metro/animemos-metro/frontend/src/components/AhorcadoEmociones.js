import React, { useState } from 'react';

const EMOTIONS = [
  {
    word: 'MIEDO',
    clue: 'Lo que sentimos cuando estamos frente a algo que nos asusta o representa un peligro.'
  },
  {
    word: 'ALEGRIA',
    clue: 'Lo que sentimos cuando ocurre algo que nos hace sentir muy bien.'
  },
  {
    word: 'TRISTEZA',
    clue: 'Lo que podemos sentir cuando perdemos algo o a alguien importante.'
  },
  {
    word: 'ENOJO',
    clue: 'Lo que sentimos cuando algo nos molesta o no sale como esperábamos.'
  },
  {
    word: 'AMOR',
    clue: 'Lo que sentimos cuando tenemos un cariño muy fuerte por alguien o algo.'
  },
  {
    word: 'SORPRESA',
    clue: 'Lo que sentimos cuando sucede algo inesperado.'
  },
  {
    word: 'CULPA',
    clue: 'Lo que podemos sentir cuando creemos que hicimos algo incorrecto.'
  },
  {
    word: 'VERGUENZA',
    clue: 'Lo que podemos sentir cuando hacemos algo que nos hace sentir incómodos frente a otras personas.'
  },
  {
    word: 'FRUSTRACION',
    clue: 'Lo que sentimos cuando queremos conseguir algo y no podemos hacerlo.'
  },
  {
    word: 'ANSIEDAD',
    clue: 'Lo que podemos sentir cuando estamos muy preocupados por lo que podría pasar.'
  }
];

const LETTERS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

function normalize(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export default function AhorcadoEmociones() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guessed, setGuessed] = useState([]);
  const [errors, setErrors] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const current = EMOTIONS[currentIndex];
  const word = normalize(current.word);
  const maxErrors = 6;

  const displayWord = word
    .split('')
    .map((letter) => guessed.includes(letter) ? letter : '_')
    .join(' ');

  const drawParts = [
    'head',
    'body',
    'leftArm',
    'rightArm',
    'leftLeg',
    'rightLeg'
  ];

  function chooseLetter(letter) {
    if (gameOver || guessed.includes(letter)) return;

    const newGuessed = [...guessed, letter];
    setGuessed(newGuessed);

    if (word.includes(letter)) {
      const completed = word
        .split('')
        .every((char) => newGuessed.includes(char));

      if (completed) {
        setScore((currentScore) => currentScore + 1);
        setMessage('🎉 ¡Correcto! Descubriste la emoción.');

        setTimeout(() => {
          nextWord();
        }, 1200);
      }
    } else {
      const newErrors = errors + 1;
      setErrors(newErrors);

      if (newErrors >= maxErrors) {
        setMessage(`😮 La palabra era ${current.word}.`);
        setGameOver(true);
      }
    }
  }

  function nextWord() {
    if (currentIndex + 1 >= EMOTIONS.length) {
      setGameOver(true);
      setMessage('🏆 ¡Terminaste todas las emociones!');
      return;
    }

    setCurrentIndex((index) => index + 1);
    setGuessed([]);
    setErrors(0);
    setMessage('');
  }

  function restartGame() {
    setCurrentIndex(0);
    setGuessed([]);
    setErrors(0);
    setScore(0);
    setMessage('');
    setGameOver(false);
  }

  return (
    <section className="anm-emotions-game py-5">
      <div className="container">
        <div className="anm-game-card">
          <div className="text-center mb-4">
            <span className="anm-game-tag">🧠 Juego emocional</span>

            <h2 className="mt-2">
              Ahorcado de emociones
            </h2>

            <p>
              Lee la pista, descubre la emoción y evita quedarte sin intentos.
            </p>
          </div>

          <div className="anm-game-score">
            <span>🏆 Puntos: {score}</span>
            <span>❤️ Intentos: {maxErrors - errors}</span>
            <span>🎮 {currentIndex + 1}/{EMOTIONS.length}</span>
          </div>

          <div className="anm-hangman-area">
            <div className="anm-hangman">
              <div className="anm-rope"></div>
              <div className="anm-pole"></div>
              <div className="anm-base"></div>

              {drawParts.slice(0, errors).map((part) => (
                <div key={part} className={`anm-${part}`}></div>
              ))}
            </div>
          </div>

          <div className="anm-clue">
            <strong>💡 Pista:</strong>
            <p>{current.clue}</p>
          </div>

          <div className="anm-word">
            {displayWord}
          </div>

          {!gameOver && (
            <div className="anm-letters">
              {LETTERS.map((letter) => {
                const used = guessed.includes(letter);
                const correct = used && word.includes(letter);

                return (
                  <button
                    key={letter}
                    type="button"
                    disabled={used}
                    className={`anm-letter ${
                      used ? (correct ? 'correct' : 'wrong') : ''
                    }`}
                    onClick={() => chooseLetter(letter)}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          )}

          {message && (
            <div className="anm-game-message">
              {message}
            </div>
          )}

          {gameOver && (
            <div className="text-center mt-4">
              <p className="anm-final-score">
                Tu puntuación: <strong>{score}</strong> / {EMOTIONS.length}
              </p>

              <button
                type="button"
                className="btn anm-btn-primary"
                onClick={restartGame}
              >
                🔄 Jugar nuevamente
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
