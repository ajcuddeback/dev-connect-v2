import React from 'react';
import { Link } from 'react-router-dom';

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
                <Link to={`/profile/${answer.username}`} style={{ fontWeight: 700 }}>
                    {answer.username} on {answer.createdAt}
                </Link>
                </p>
            ))}
        </div>
    </div>
  );
};

export default AnswerList;