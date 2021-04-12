import React, { useEffect, useState } from 'react';

import Auth from '../../utils/auth';

// gql
import { useQuery } from '@apollo/react-hooks';
import { GET_ME_EVENTS } from '../../utils/queries';

// router
import { Link } from 'react-router-dom';

// Components
import EachMyEvents from './each-event/EachMyEvents';

// styled comp
import styled from 'styled-components';

const MyEvents = () => {
    // State
    const [eventData, seteventData] = useState(false);

    // gql
    const { loading, data } = useQuery(GET_ME_EVENTS);

    const userData = Auth.getProfile();
    const username = userData.data.username;

    useEffect(() => {
        if(loading) {
          return;
        }
        if(!data.me.event_user.length) {
          seteventData(false)
          return;
        } else {
          seteventData(true)
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

    if(!eventData) {
        return (
            <StyledError>
                <h2>You currently are not a part of any events!</h2>
                <h3>Join a event here: <Link to={'/meet'}>Join event</Link> </h3>
            </StyledError>
        )
    }

    return (
        <StyledEvents>
            <h2>{username}'s Events</h2>
            <div className="events">
                <ol>
                    {data.me.event_user.map(event => (<EachMyEvents event={event} key={event.id} />))}
                </ol>
            </div>
        </StyledEvents>
    )
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

const StyledEvents = styled.div`
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

export default MyEvents;