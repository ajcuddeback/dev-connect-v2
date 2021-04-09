import React, {  } from 'react';

// gql
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_ME_EVENTS, GET_GROUP } from '../../../utils/queries';
import { DELETE_EVENT } from '../../../utils/mutations';

import { Link } from 'react-router-dom';

const EachEventAdmin = ({ event, groupName }) => {

    // gql
    const { loading, data } = useQuery(GET_ME_EVENTS);
    const groupData = useQuery(GET_GROUP);
    const [deleteEvent, {err}] = useMutation(DELETE_EVENT);

    // Functions
    const handleEventDelete = async () => {
        const eventId = parseInt(event.id);

        await deleteEvent({
            variables: { event_id: eventId },
            refetchQueries: [{
                query: GET_GROUP,
                variables: { group_url: groupName }
            }],
                
            
        });
    }
    console.log(event)
    
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
                    <p>Users: {event.event_user.length}</p>
                </div>
            </div>
            <div className="manage-event-buttons">
                <button onClick={handleEventDelete} className="delete-event-button glass-button">Delete Event</button>
                <Link className="glass-button" to={`/meet/edit-event/${groupName}/${event.id}`}>Edit event</Link>
            </div>
        </div>
    )
};

export default EachEventAdmin;