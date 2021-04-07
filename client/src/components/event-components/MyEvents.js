import React, { useEffect, useState } from 'react';

import Auth from '../../utils/auth';

// gql
import { useQuery } from '@apollo/react-hooks';
import { GET_ME_EVENTS } from '../../utils/queries';

// router
import { Link } from 'react-router-dom';

// Components
import EachMyEvents from './each-event/EachMyEvents';

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
      }, [data])

    // JSX
    if(loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    if(!eventData) {
        return (
            <>
                <h2>You currently are not a part of any events!</h2>
                <p>Join a event here: <Link to={'/meet'}>Join event</Link> </p>
            </>
        )
    }

    return (
        <>
            <h2>{username}'s events</h2>
            <div className="events">
                <ol>
                    {data.me.event_user.map(event => (<EachMyEvents event={event} />))}
                </ol>
            </div>
        </>
    )
};

export default MyEvents;