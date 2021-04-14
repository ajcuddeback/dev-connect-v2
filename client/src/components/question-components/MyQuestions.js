import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME_QUESTIONS } from '../../utils/queries';
import Auth from '../../utils/auth';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

const MyQuestions = () => {
  return (
    <div className="questionCardContainer">
      <p></p>
    </div>
  );
};
  
export default MyQuestions;