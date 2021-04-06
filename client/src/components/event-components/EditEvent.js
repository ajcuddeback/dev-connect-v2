import React, { useEffect, useState } from 'react';

// gql
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_GROUP, OWNER_GROUPS } from '../../utils/queries';
import { EDIT_EVENT } from '../../utils/mutations';

// Router
import { useParams, Link, useHistory } from 'react-router-dom';


const EditEvent = () => {
    // State
   const [isAdmin, setIsAdmin] = useState(false);
   const [eventData, setEventData] = useState({  event_title: '', event_text: '', event_location: '', event_time: ''});
   const [confirmData, setConfirmData] = useState(false);

    // gql
    const { groupName, eventId } = useParams();
    const { loading, data } = useQuery(GET_GROUP, {
        variables: { group_url: groupName }
    });
    const userData = useQuery(OWNER_GROUPS);
    const [updateEvent, {err}] = useMutation(EDIT_EVENT, {
        refetchQueries: [{
            query: GET_GROUP,
            variables: { group_url: groupName }
        }],
    });

    useEffect(() => {
        if(userData.loading || loading) {
            return;
        };
        
        if(data && userData) {
            const myGroups = userData.data.myGroups;
            myGroups.map(group => {
                if(group.id === data.group.id) {
                    setIsAdmin(true);
                    return;
                }
            });

            setConfirmData(true);

            let myEvents = data.group.events;
            const event = myEvents.filter(event => event.id === eventId);
            setEventData(event[0]);
        }
    }, [data, userData]);

    // Functions
    const setFormData = (e) => {
        const { name, value } = e.target;

        setEventData({...eventData, [name]: value})
    }

    const history = useHistory();

    const editEventHandler = async (e) => {
        e.preventDefault();

        const eventId = parseInt(eventData.id)
        const eventTitle = eventData.event_title
        const eventText = eventData.event_text
        const eventLocation = eventData.event_location
        const eventTime = eventData.event_time

        try {
            await updateEvent({
                variables: {event_id: eventId, event_title: eventTitle, event_text: eventText, event_location: eventLocation, event_time: eventTime}
            })
            history.push(`/meet/admin/${groupName}`)
        } catch (e) {
            console.log(e)
        }

    }

    // JSX
    if(confirmData === false) {
        return (
            <>
                <h2>No group exists at this url! Please return to your <Link to={`/meet/dashboard`}>dashboard!</Link></h2>
                </>
        )
    };

    if(!isAdmin) {
        return (
            <>
                <h2>You are not the owner of this group!</h2>
                <p>Want to make your own group? Go to your<Link to={`/meet/dashboard`}> dashboard!</Link></p>
            </>
        )
    };

    return (
        <>
            <h2>Edit Event {eventData.event_title}</h2>
            <form onSubmit={editEventHandler} className="edit-event-form">
                <div className="form-wrapper">
                    <div className="col-1">
                        <p>Event title:</p>
                        <input onChange={setFormData} type="text" name="event_title" className="event-title" value={eventData.event_title} required />
                        <p>Event time:</p>
                        <input onChange={setFormData} type="text" name="event_time" className="time-and-date" value={eventData.event_time} required />
                        <p>Event location:</p>
                        <input onChange={setFormData} type="text" name="event_location" className="event-location"
                            value={eventData.event_location} required />

                    </div>
                    <div className="col-2">
                        <p>Event information:</p>
                        <textarea onChange={setFormData} name="event_text" id="event-info" cols="30" rows="10" defaultValue={eventData.event_text} required></textarea>
                    </div>
                </div>
                <button className="confirm-edit-event grey-red-btn" type="submit">Edit Event</button>
            </form>
        </>
    );
};

export default EditEvent;