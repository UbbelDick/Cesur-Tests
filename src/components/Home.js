import React from 'react';

function Home({ onSelectQuiz }) {
  const quizzes = [
    { id: 1, title: 'Lenguaje de marcas' },
    { id: 2, title: 'Sistemas informaticos' },
    { id: 3, title: 'Entorno de desarollo' },
    { id: 4, title: 'Bases de datos' },
    { id: 5, title: 'Programacion' },

    // Agregar más quizzes aquí si es necesario
  ];

  const handleSelectQuiz = (quizId) => {
    onSelectQuiz(quizId);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <h2 className="card-title">Elige un tema:</h2>
              <ul className="list-group list-group-flush">
                {quizzes.map((quiz) => (
                  <li key={quiz.id} className="list-group-item">
                    <button className="btn btn-primary btn-lg btn-block" onClick={() => onSelectQuiz(quiz.id)}>
                      {quiz.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;