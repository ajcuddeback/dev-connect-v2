import React, { useState, useEffect } from 'react';
import AnswerList from '../question-components/AnswerList';
import AnswerForm from './AnswerForm'
import { FaChevronDown } from "react-icons/fa";

const QuestionList = ({ questions }) => {
   
    const [answerOpen, setAnswersOpen] = useState({});
   
    useEffect(() => {
        const questionsObject = {};
        questions.forEach(question => {
            questionsObject[question.id]=false;
        })

        setAnswersOpen(questionsObject)
    },[questions])

    const handleAnswerClick = (id) => {
        let questionObject = {...answerOpen};
        let currentState = questionObject[id];

        questionObject[id] = !currentState;

        setAnswersOpen(questionObject);
    }

    if (!questions.length) {
        return <h3 className="questionList">No Questions Yet!</h3>;
    }

    return (
        <div className="questionsContainer">
            <h1 className="questionListTitle">Developer Questions</h1>
            {
                questions.map(question => (
                    <>
                    <div key={question.id} className="questionCardContainer">
                        <div className="questionHeaderDiv">
                            <h3 className="questionCardHeader">
                            {question.user.username} asked on {question.createdAt}:
                            </h3>
                        </div>
                        <div className="questionDiv">
                            <p className="questions">{question.question_text}</p>
                        </div>
                        <AnswerForm />
                        <div>
                            <p className="answerDrop" value={answerOpen[question.id]} onClick={()=>handleAnswerClick(question.id)}><span FaChevronDown>Click to get answers</span></p>
                        </div>
                    </div>
                    {(answerOpen[question.id] === true) &&
                        question.answers.map(answer => (<AnswerList answer = {answer} 
                        answerCount = {question.answers.length}/>) ) 
                    }
                </>
            ))}
        </div>
    )
};

export default QuestionList;