import React from 'react';

const AnswerList = ({ answers }) => {
  return (
    <div className="card mb-3">
        <div className="card-header">
            <span className="text-light">Answers from other Devs: </span>
        </div>
        <div className="card-body">
            {answers &&
            answers.map(answer => (
                <p className="pill mb-3" key={answer.id}>
                {answer.answer_text} {'// '}
                </p>
            ))}
        </div>
    </div>
  );
};

export default AnswerList;