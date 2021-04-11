import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_QUESTIONS } from '../utils/queries';
import Auth from '../utils/auth';
import styled from 'styled-components';

const askDevsHome = ({ questions, title }) => {
    if (!questions.length) {
        return <h3>No Questions Yet</h3>;
    }

    if(loading) {
        return (
            <StyledLoader>
                <h1>Loading...</h1>
                <div className="loader"></div>
            </StyledLoader>
        )
    }

    return(
        <div>
            <h3>Ask Devs</h3>
        </div>
    );
};

export default askDevsHome;