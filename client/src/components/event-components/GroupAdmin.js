import React, { useEffect, useState } from 'react';

// gql
import { useQuery } from '@apollo/react-hooks';
import { GET_GROUP, OWNER_GROUPS } from '../../utils/queries';

// Router
import { useParams, Link } from 'react-router-dom';

import EachEventAdmin from './each-event/EachEventAdmin';

// styled comp
import styled from 'styled-components';

const GroupAdmin = () => {
   const [isAdmin, setIsAdmin] = useState(false);
   const [dataGroup, setDataGroup] = useState(false);

    // gql
    const { groupName } = useParams();
    const { loading, data } = useQuery(GET_GROUP, {
        variables: { group_url: groupName }
    });
    const userData = useQuery(OWNER_GROUPS);

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
            })

            setDataGroup(true);
        }
    }, [data, userData]);

    console.log(data)

    
   
    // JSX
    if(loading) {
        return (
            <StyledLoader>
                <h2>Loading...</h2>
                <div class="loader"></div>
            </StyledLoader>
        )
    }

    if(dataGroup === false) {
        return (
            <StyledError>
                <h2>The group you selected does not exist! Please return to the <Link to={`/meet`}>group home page!</Link></h2>
            </StyledError>
        )
    }

    if(!isAdmin) {
        return (
            <StyledError>
                <h2>You are not the owner of this group!</h2>
                <h3>Want to make your own group? Go to your<Link to={`/meet/dashboard`}> dashboard!</Link></h3>
            </StyledError>
        )
    }

    return (
        <StyledAdmin>
            <div className="group-info-wrapper">
                <h2 className="group-name">{data.group.group_title}</h2>
                 <p>{data.group.group_text}</p>
            </div>
            <br/>
            <section className="group-content-wrapper">
                <div className="group-event-wrapper">
                    <h2>Events:</h2>
                    <ol>
                    {data.group.events.map(event => (<EachEventAdmin event={event} groupName={groupName} key={event.id} ></EachEventAdmin>))}
                    </ol>
                    <br/>
                    <br/>
                    <Link className="glass-button" to={`/meet/add-event/${groupName}`}>Add an Event</Link>
                </div>
            </section>
        </StyledAdmin>
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

const StyledAdmin = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    text-align: center;
    section {
        padding: 2rem;
    }
    .each-event {
        margin-top: 1rem;
        padding: 1rem;
        width: 30rem;
    }
    .meetup-info-wrapper {
        display: flex;
        justify-content: center;
    }
    .time-and-info, .location {
        width: 50%;
        p{
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
    }
`

export default GroupAdmin;