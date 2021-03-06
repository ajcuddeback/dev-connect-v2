import React, { useEffect, useState } from 'react';

// gql
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_USER_EVENT } from '../../../utils/mutations';
import { GET_ME_EVENTS } from '../../../utils/queries';

const EachEvent = ({ event, isMember }) => {
    const [eventIds, setEventIds] = useState([])

    // gql
    const [addUserEvent, { err }] = useMutation(ADD_USER_EVENT);
    console.log(err)
    const { loading, data } = useQuery(GET_ME_EVENTS);

    // Functions
    const joinEventHandler = async (e) => {
        const eventId = parseInt(event.id);
        try {
            await addUserEvent({
                variables: { event_id: eventId },
                refetchQueries: [{ query: GET_ME_EVENTS }]
            });

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if(loading) {
            return;
        }
        if(data) {
            const eventIdArr = [];
            data.me.event_user.map(myEvent => {
                eventIdArr.push(myEvent.id);
                return true;
            })
            setEventIds(eventIdArr);
        }
    }, [data, isMember, loading])

    
    
    // JSX
    return (
        <div className="each-event glass-background">
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

            {isMember 
            ? <button onClick={joinEventHandler} className="join-event-btn glass-button" data-id={event.id}>
            {eventIds?.some((eventId) => eventId === event.id)
                ? 'Already Joined'
                : 'Join Event'
            }
        </button>
        : ''}
            
        </div>
    )
};

export default EachEvent;