import React from 'react';
import { Link } from 'react-router-dom';

const QuestionList = ({ questions }) => {
    if (!questions.length) {
        return <h3>No Questions Yet!</h3>;
    }
    
    return (
        <div>
            <h1>Developer Questions</h1>
            {questions &&
                questions.map(question => (
                <div key={question.id} className="card mb-3">
                    <p className="card-header">
                    <Link
                        to={`/profile/${question.username}`}
                        style={{ fontWeight: 700 }}
                        className="text-light"
                    >
                        {question.username}
                    </Link>{' '}
                    question on {question.createdAt}
                    </p>
                    <div className="card-body">
                    <Link to={`/question/${question.id}`}>
                        <p>{question.question_text}</p>
                        <p className="mb-0">
                        Answers: {question.answerCount} || Click to{' '}
                        {question.answerCount ? 'see' : 'start'} the discussion!
                        </p>
                    </Link>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default QuestionList;