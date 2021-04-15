import React from 'react';
import { GET_QUESTIONS } from '../../utils/queries';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import QuestionForm from '../question-components/QuestionForm';
import QuestionList from '../question-components/QuestionList';

const AskDevsHome = () => {
    const { loading, data } = useQuery(GET_QUESTIONS);
    
    const questions = data?.questions || [];
    const loggedIn = Auth.loggedIn();

    return(
        <main className="container">
            <div className="titleDiv">
                <h1 className="askDevsHeader">AskDevs Home!</h1>
                <p>Ask, or answer an outstanding question:</p>
            </div>
            <div>
            {loggedIn && (
            <div className="questionForm">
                <QuestionForm />
            </div>
            )}
            </div>
            <div className={` questionList ${loggedIn}`}></div>
                <div>
                <div className={`${loggedIn}`}>
                    {loading ? (
                    <div>Loading...</div>
                    ) : (
                    <QuestionList questions={questions} />
                    )}
                </div>
            </div>
        </main>
    );
};

export default AskDevsHome;