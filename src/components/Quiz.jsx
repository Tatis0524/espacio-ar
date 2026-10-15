import { useState } from 'react';

// Mini reto educativo: selección múltiple con retroalimentación, puntuación
// final, pantalla de resultados y opción de reintentar. Sin backend.
export default function Quiz({ questions, bestScore, onScore }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const total = questions.length;
  const q = questions[idx];
  const answered = picked !== null;
  const isLast = idx === total - 1;

  const pick = (i) => {
    if (answered) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (isLast) {
      onScore?.(score);
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / total) * 100);
    const emoji = score === total ? '🏆' : pct >= 70 ? '👏' : '💪';
    const msg =
      score === total
        ? '¡Puntaje perfecto! Dominas los conceptos básicos.'
        : pct >= 70
          ? '¡Muy bien! Casi lo tienes perfecto.'
          : '¡Buen intento! Vuelve a intentarlo para afianzar lo aprendido.';
    return (
      <div className="quiz quiz-result">
        <p className="quiz-emoji" aria-hidden="true">{emoji}</p>
        <h3>Resultados</h3>
        <p className="quiz-score">
          {score} de {total} <span className="muted small">({pct}%)</span>
        </p>
        <p className="muted">{msg}</p>
        {bestScore > 0 && (
          <p className="small muted">Tu mejor puntuación: {bestScore} de {total}</p>
        )}
        <button className="btn btn-primary" onClick={restart}>Volver a intentarlo</button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz-top">
        <span className="quiz-count">Pregunta {idx + 1} de {total}</span>
        <span className="quiz-dots" aria-hidden="true">
          {questions.map((_, i) => (
            <span key={i} className={`dot ${i < idx ? 'done' : i === idx ? 'current' : ''}`} />
          ))}
        </span>
      </div>

      <h3 className="quiz-question">{q.q}</h3>

      <ul className="quiz-options">
        {q.options.map((opt, i) => {
          let cls = '';
          if (answered) {
            if (i === q.answer) cls = 'correct';
            else if (i === picked) cls = 'wrong';
          }
          return (
            <li key={i}>
              <button
                type="button"
                className={`quiz-option ${cls}`}
                onClick={() => pick(i)}
                disabled={answered}
                aria-pressed={answered && i === picked}
              >
                <span className="quiz-letter" aria-hidden="true">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {answered && (
        <div className={`quiz-feedback ${picked === q.answer ? 'ok' : 'no'}`} role="status">
          <strong>{picked === q.answer ? '✔ Correcto' : '✘ Incorrecto'}</strong>
          <span> {q.feedback}</span>
        </div>
      )}

      <div className="quiz-actions">
        <button className="btn btn-primary" onClick={next} disabled={!answered}>
          {isLast ? 'Ver resultado' : 'Siguiente'}
        </button>
        {answered && (
          <button className="btn" onClick={restart}>Reiniciar reto</button>
        )}
      </div>
    </div>
  );
}
