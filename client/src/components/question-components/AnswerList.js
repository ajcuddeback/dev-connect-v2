import React from 'react';

const AnswerList = ({ answer, answerCount }) => {
  if(answerCount >= 5){
    
  }

  return (
    <div className="eachAnswer">
      <div className="usernameAnswerWrapper">
        <p>{answer.username}</p>
        <p>{answer.answer_text}</p>
      </div>
    </div>
  );
};

export default AnswerList;