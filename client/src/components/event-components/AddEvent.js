import React, { useEffect, useState } from 'react';

// gql
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_GROUP, OWNER_GROUPS } from '../../utils/queries';
import { ADD_EVENT } from '../../utils/mutations';

// Router
import { useParams, Link, useHistory } from 'react-router-dom';

// styled comp
import styled from 'styled-components';

const AddEvent = () => {
    // State
   const [isAdmin, setIsAdmin] = useState(false);
   const [eventData, setEventData] = useState({ event_title: '', event_text: '', event_location: '', event_time: ''});

    // gql
    const { groupName } = useParams();
    console.log(groupName)
    const { loading, data } = useQuery(GET_GROUP, {
        variables: { group_url: groupName }
    });
    const userData = useQuery(OWNER_GROUPS);
    const [createEvent, {err}] = useMutation(ADD_EVENT, {
        refetchQueries: [{
            query: GET_GROUP,
            variables: { group_url: groupName }
        }],
    });

    console.log(err)

    useEffect(() => {
        if(userData.loading || loading) {
            return;
        };
        
        if(data && userData) {
            const myGroups = userData.data.myGroups;
            myGroups.map(group => {
                if(group.id === data.group.id) {
                    setIsAdmin(true);
                    return group;
                }
            });

        }
    }, [data, userData]);

    // Functions
    const setFormData = (e) => {
        const { name, value } = e.target;

        setEventData({...eventData, [name]: value})
    }

    const history = useHistory();

    const addEventHandler = async (e) => {
        e.preventDefault();

        const input = {
            event_title: eventData.event_title,
            event_text: eventData.event_text,
            event_location: eventData.event_location,
            event_time: eventData.event_time,
            group_id: parseInt(data.group.id)
        }


        try {
            const data = await createEvent({
                variables: {input: input}
            })
            history.push(`/meet/admin/${groupName}`)
        } catch (e) {
            console.log(e)
        }

    }

    // JSX
    if(!isAdmin) {
        return (
            <StyledError>
                <h2>You are not the owner of this group!</h2>
                <p>Want to make your own group? Go to your<Link to={`/meet/dashboard`}> dashboard!</Link></p>
            </StyledError>
        )
    };

    return (
        <StyledAddEvent>
            <h2>Add Event to {data.group.group_title}</h2>
            <form onSubmit={addEventHandler} className="edit-event-form glass-background">
                <div className="form-wrapper">
                    <div className="col-1">
                        <p>Event title:</p>
                        <input onChange={setFormData} type="text" name="event_title" className="event-title" required />
                        <p>Event time:</p>
                        <input onChange={setFormData} type="text" name="event_time" className="time-and-date" required />
                        <p>Event location:</p>
                        <input onChange={setFormData} type="text" name="event_location" className="event-location" required />

                    </div>
                    <div className="col-2">
                        <p>Event information:</p>
                        <textarea onChange={setFormData} name="event_text" id="event-info" cols="30" rows="10" required></textarea>
                    </div>
                </div>
                <button className="confirm-edit-event glass-button" type="submit">Add Event</button>
            </form>
        </StyledAddEvent>
    );
};

const StyledError = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const StyledAddEvent = styled.div` 
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    text-align: center;
    h2 {
        margin-top: 4rem;
    }
    form {
        width: 20rem;
        padding: 1rem;
        margin-top: 3rem;
        margin-bottom: 2rem;
    }
`

export default AddEvent;