import React, { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleSelectQuiz = (quizId) => {
    setSelectedQuiz(quizId);
  };

  return (
    <div><br/>
      <a href="/"><center><h1>DAW 1º</h1></center></a>
      {!selectedQuiz ? (
        <Home onSelectQuiz={handleSelectQuiz} />
      ) : (
        <Quiz quizId={selectedQuiz} />
      )}
    </div>
  );
}

export default App;