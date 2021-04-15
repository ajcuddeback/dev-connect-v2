import React from 'react';

const AnswerList = ({ answer, answerCount }) => {

  return (
    <div className="eachAnswer">
      <div className="answerInfoWrapper">
        <h3>{answer.user.username} wrote: </h3>
        <p>{answer.answer_text}</p>
      </div>
    </div>
  );
};

export default AnswerList;