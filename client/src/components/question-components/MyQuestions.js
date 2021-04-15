import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME_QUESTIONS } from '../../utils/queries';
import Auth from '../../utils/auth';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import QuestionList from './QuestionList';
// import QuestionForm from './QuestionForm';

const MyQuestions = () => {
  const [questionData, setQuestionData] = useState(false);
  const { loading, data } = useQuery(GET_ME_QUESTIONS);

  const userData = Auth.getProfile();
  const username = userData.data.username;

  useEffect(() => {
    if(loading) {
      return;
    }
    if(!data.me.questions.length) {
      setQuestionData(false)
      return;
    } else {
      setQuestionData(true)
    }
  }, [data, loading])

  // JSX
  if(loading) {
      return (
          <StyledLoader>
              <h1>Loading...</h1>
              <div className="loader"></div>
          </StyledLoader>
      )
  }

  if(!questionData) {
      return (
          <StyledError>
              <h2>You don't have any questions! Return to </h2>
              <h3>Ask Devs Home here: <Link to={'/askDevs'}> Home</Link> </h3>
          </StyledError>
      )
  }

  return (
    <StyledMyQuestions>
      <h2>{username}'s Questions</h2>
        <div className="events">
          <ol>
            
          </ol>
      </div>
    </StyledMyQuestions>
  );
};

const StyledLoader = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const StyledError = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const StyledMyQuestions = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  .event-wrapper {
    width: 20rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    text-align: center;
  }
`
  
export default MyQuestions;