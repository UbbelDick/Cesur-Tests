import React, { useState, useEffect } from 'react';
import Question from './Question';

function Quiz({ quizId }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showPreviousButton, setShowPreviousButton] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch(`/data/quiz${quizId}.json`);
        const data = await response.json();
        setQuestions(data.Questions);
      } catch (error) {
        console.error('Error al cargar las preguntas:', error);
      }
    };
    loadQuestions();
  }, [quizId]);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentIndex];

    if (answer === currentQuestion.Respuesta_correcta) {
      setScore(score + 1);
    }

    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    const newIndex = currentIndex + 1;
    if (newIndex < questions.length) {
      setCurrentIndex(newIndex);
      setShowPreviousButton(true); // Mostrar el botón después de la primera pregunta
    } else {
      alert(`Tu puntaje final es: ${score}/${questions.length}`);
      // Reiniciar el quiz
      setCurrentIndex(0);
      setScore(0);
      setShowPreviousButton(false); // Ocultar el botón al reiniciar el quiz
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      if (currentIndex === 1) {
        setShowPreviousButton(false); // Ocultar el botón al retroceder a la primera pregunta
      }
    }
  };

  return (
    <div className="container">
      {questions.length > 0 && (
        <div>
          <Question
            question={questions[currentIndex]}
            handleAnswer={handleAnswer}
            selectedAnswer={selectedAnswer}
          />
          {selectedAnswer && (
            <button className="btn btn-primary mt-3" onClick={handleNextQuestion}>
              Siguiente pregunta
            </button>
          )}
          {showPreviousButton && (
            <button className="btn btn-secondary mt-3 mr-3" onClick={handlePreviousQuestion}>
              Pregunta anterior
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;
