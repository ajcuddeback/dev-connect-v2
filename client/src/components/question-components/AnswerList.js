import React from 'react';

const AnswerList = ({ answer, answerCount }) => {
  console.log(answer)

  return (
    <div className="eachAnswer">
      <div className="usernameAnswerWrapper">
        <p>{answer.user.username} on {answer.createdAt}</p>
        <p>{answer.answer_text}</p>
      </div>
    </div>
  );
};

export default AnswerList;