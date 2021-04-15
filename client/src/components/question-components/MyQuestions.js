import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME_QUESTIONS } from '../../utils/queries';
import { UPDATE_QUESTION, DELETE_QUESTION } from '../../utils/mutations'
import Auth from '../../utils/auth';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MyQuestions = () => {
  const [questionData, setQuestionData] = useState(false);
  const { loading, data } = useQuery(GET_ME_QUESTIONS);

  const [deleteQuestion, {err}] = useMutation(DELETE_QUESTION);
  console.log(err);

  const userData = Auth.getProfile();
  const username = userData.data.username;

  // Displaying my questions
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

  const handleQuestionDelete = async () => {
    const setQuestionId = data.me.questions.question
    const questionId = parseInt(setQuestionId.id);

    await deleteQuestion({
        variables: { question_id: questionId },
        refetchQueries: [{
          query: GET_ME_QUESTIONS,
          variables: { question_text: data.me.question.question_text }
        }],
    });
  }
  console.log()

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
      <p>Have more questions? <Link to={'/askDevs'}> Return to Ask Devs Home</Link> </p>
        <div className="events">
          <ol>
          {data.me.questions.map(question => 
            <div key={question.id} className="event-wrapper glass-background">
              <div className="event-info-wrapper">
              <div className="each-event glass-background">
                  <div className="meetup-info-wrapper">
                      <div className="time-and-info">
                          <p>Question Asked on: {question.createdAt}</p>
                          <p>{question.question_text}</p>
                      </div>
                  </div>
                  <div className="manage-event-buttons">
                      <button onClick={handleQuestionDelete} className="delete-event-button glass-button">Delete Question</button>
                      {/* <Link className="glass-button" to={`/meet/edit-event/${groupName}/${event.id}`}>Edit Question</Link> */}
                  </div>
              </div>
              </div>
            </div>)}
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