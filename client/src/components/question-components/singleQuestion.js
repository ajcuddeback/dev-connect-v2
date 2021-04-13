import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_QUESTIONS } from '../../utils/queries';
import AnswerList from '../question-components/AnswerList';
import Auth from '../utils/auth';
import AnswerForm from '../question-components/AnswerForm';

const SingleQuestion = props => {
    const { id: question_id } = useParams();
    
    const { loading, data } = useQuery(GET_QUESTIONS, {
      variables: { id: question_id }
    });
    
    const question = data?.question || {};
    
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <div className="questionCard">
          <p className="card-header">
            <span style={{ fontWeight: 700 }}>
              {question.username}
            </span>{' '}
            question on {question.createdAt}
          </p>
          <div className="card-body">
            <p>{question.question_text}</p>
          </div>
        </div>
  
        {question.answerCount > 0 && <AnswerList answers={question.answers} />}
        {Auth.loggedIn() && <AnswerForm question_id={question.id} />}
      </div>
    );
  };
  
  export default SingleQuestion;