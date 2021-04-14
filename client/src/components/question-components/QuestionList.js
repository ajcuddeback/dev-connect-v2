import React, { useState, useEffect } from 'react';
import AnswerList from '../question-components/AnswerList'

const QuestionList = ({ questions }) => {
   
    const [answerOpen, setAnswersOpen] = useState({});
   
    useEffect(() => {
        const questionsObject = {};
        questions.forEach(question => {
            console.log(question)
            
            questionsObject[question.id]=false;
        })

        setAnswersOpen(questionsObject)
        console.log(answerOpen)
    },[questions])
    //console.log(answerOpen);

    const handleAnswerClick = (id) => {
        let questionObject = {...answerOpen};
        let currentState = questionObject[id];

        questionObject[id] = !currentState;
        console.log("clicked")
        setAnswersOpen(questionObject);
        console.log(answerOpen)
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
                        <div>
                            <p className="answerDrop" value={answerOpen[question.id]} onClick={()=>handleAnswerClick(question.id)}>Click to get answers</p>
                        </div>
                    </div>
                    {console.log("test " + answerOpen[question.id])}
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