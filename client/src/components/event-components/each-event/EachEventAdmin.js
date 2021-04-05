import React, { useEffect, useState } from 'react';

// gql
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_ME_EVENTS } from '../../../utils/queries';

const EachEventAdmin = ({ event }) => {

    // gql
    const { loading, data } = useQuery(GET_ME_EVENTS);
    
    // JSX
    return (
        <>
            <h2>{event.event_title}</h2>
            <div className="meetup-info-wrapper">
                <div className="time-and-info">
                    <p>Meet up time: {event.event_time}</p>
                    <p>Meet up info: {event.event_text}</p>
                </div>
                <div className="location">
                    <p>Location: {event.event_location}</p>
                </div>
            </div>
        </>
    )
};

export default EachEventAdmin;