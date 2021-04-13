import React from 'react';
import { Link } from 'react-router-dom';

const QuestionList = ({ questions }) => {
    if (!questions.length) {
        console.log(questions);
        return <h3 className="questionList">No Questions Yet!</h3>;
    }
    
    return (
        <div>
            <h1 className="questionList">Developer Questions</h1>
            {questions &&
                questions.map(question => (
                <div key={question.id} className="questionCard">
                    <p className="card-header">
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