import React, { useState } from 'react';

function Question({ question, handleAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [showIncorrectMessage, setShowIncorrectMessage] = useState(false);

  const handleChange = (event) => {
    setSelectedAnswer(event.target.value);
    setShowCorrectMessage(false);
    setShowIncorrectMessage(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedSelectedAnswer = selectedAnswer.trim().toLowerCase(); 
    const formattedCorrectAnswer = question.Respuesta_correcta.trim().toLowerCase(); 
    
    // Verifica si la respuesta seleccionada coincide exactamente con la respuesta correcta, ignorando mayúsculas y minúsculas
    if (formattedSelectedAnswer === formattedCorrectAnswer) {
      setShowCorrectMessage(true);
      handleAnswer(true);
    } else {
      // Si la respuesta seleccionada no coincide exactamente, intenta buscar si la respuesta correcta está incluida en la respuesta seleccionada sin el prefijo de opción (por ejemplo, "a. "), ignorando mayúsculas y minúsculas
      const formattedSelectedAnswerWithoutPrefix = formattedSelectedAnswer.includes('.') ? formattedSelectedAnswer.substring(3) : formattedSelectedAnswer;
      const formattedCorrectAnswerWithoutPrefix = formattedCorrectAnswer.includes('.') ? formattedCorrectAnswer.substring(3) : formattedCorrectAnswer;
      
      if (formattedSelectedAnswerWithoutPrefix === formattedCorrectAnswerWithoutPrefix) {
        setShowCorrectMessage(true);
        handleAnswer(true);
      } else if (formattedSelectedAnswerWithoutPrefix.includes(formattedCorrectAnswerWithoutPrefix) || formattedCorrectAnswerWithoutPrefix.includes(formattedSelectedAnswerWithoutPrefix)) {
        // Si las respuestas seleccionada y correcta son similares pero no exactamente iguales
        setShowCorrectMessage(true);
        handleAnswer(true);
      } else {
        setShowIncorrectMessage(true);
        handleAnswer(false);
      }
    }
  };
  
  
  

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title">{question.Pregunta}</h2>
        <form onSubmit={handleSubmit}>
          {question.Respuestas.map((respuesta, index) => (
            <div key={index} className="form-check">
              <input
                type="radio"
                id={index}
                value={respuesta}
                checked={selectedAnswer === respuesta}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor={index} className="form-check-label">{respuesta}</label>
            </div>
          ))}
          <button type="submit" className="btn btn-primary mt-3">Aceptar</button>
        </form>
        {showCorrectMessage && (
          <p className="mt-3 text-success">¡Respuesta correcta!</p>
        )}
        {showIncorrectMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            Respuesta incorrecta. La respuesta correcta es: {question.Respuesta_correcta}
          </div>
        )}
      </div>
    </div>
  );
}

export default Question;
