import React from 'react';
import { GET_QUESTIONS } from '../../utils/queries';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import QuestionForm from '../question-components/QuestionForm';
import QuestionList from '../question-components/QuestionList';

const AskDevsHome = () => {
    const { loading, data } = useQuery(GET_QUESTIONS);
    
    // const { data: userData } = useQuery(QUERY_ME_BASIC);
    const questions = data?.questions || [];
    const loggedIn = Auth.loggedIn();

    return(
        <main class="container">
            <div className="flex-row justify-space-between">
                <h1 className="text-center">Ask Devs Home!</h1>
            </div>
            <div className="flex-row justify-space-between">
            {loggedIn && (
            <div className="col-12 mb-3">
                <QuestionForm />
            </div>
            )}
            </div>
            <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}></div>
                <div className='flex-row justify-space-between'>
                <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
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