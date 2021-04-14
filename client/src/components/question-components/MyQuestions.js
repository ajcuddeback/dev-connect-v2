import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Auth from '../../utils/auth';
import { GET_ME_QUESTIONS } from '../../utils/queries';
import { Link } from 'react-router-dom';

const MyQuestions = () => {
  return (
    <div className="questionCardContainer">
      <p></p>
    </div>
  );
};
  
export default MyQuestions;