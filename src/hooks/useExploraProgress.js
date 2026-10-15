import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage.js';

// Progreso local de ExploraAR: modelos explorados, categorías visitadas y mejor
// puntuación del mini reto. Todo en LocalStorage, sin cuentas ni backend.
export function useExploraProgress() {
  const [explored, setExplored] = useLocalStorage('espacioar:explora:explored', []);
  const [visitedCategories, setVisitedCategories] = useLocalStorage('espacioar:explora:categories', []);
  const [bestQuizScore, setBestQuizScore] = useLocalStorage('espacioar:explora:quiz-best', 0);

  const markExplored = useCallback(
    (id) => setExplored((prev) => (prev.includes(id) ? prev : [...prev, id])),
    [setExplored]
  );

  const visitCategory = useCallback(
    (id) => setVisitedCategories((prev) => (prev.includes(id) ? prev : [...prev, id])),
    [setVisitedCategories]
  );

  // Solo guarda el mejor puntaje alcanzado.
  const saveQuizScore = useCallback(
    (score) => setBestQuizScore((prev) => Math.max(prev, score)),
    [setBestQuizScore]
  );

  return { explored, visitedCategories, bestQuizScore, markExplored, visitCategory, saveQuizScore };
}
