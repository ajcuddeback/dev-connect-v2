import React, { useEffect, useState } from 'react';

// gql
import { useQuery } from '@apollo/react-hooks';
import { GET_GROUP, OWNER_GROUPS } from '../../utils/queries';

// Router
import { useParams, Link } from 'react-router-dom';

import EachEventAdmin from './each-event/EachEventAdmin';

const GroupAdmin = () => {
   const [isAdmin, setIsAdmin] = useState(false);

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
        const myGroups = userData.data.myGroups;
        myGroups.map(group => {
            if(group.id === data.group.id) {
                setIsAdmin(true);
                return;
            }
        })
    }, [data, userData]);

    
   
    // JSX
    if(loading) {
        return (
            <h2>Loading...</h2>
        )
    }

    if(!isAdmin) {
        return (
            <>
                <h2>You are not the owner of this group!</h2>
                <p>Want to make your own group? Go to your<Link to={`/meet/dashboard`}> dashboard!</Link></p>
            </>
        )
    }
    return (
        <>
            <h2>Admin</h2>
            <section class="group-content-wrapper">
                <div class="group-info-wrapper">
                    <h2 class="group-name">{data.group.group_title}</h2>
                    <p>{data.group.group_text}</p>
                </div>
                <div class="group-event-wrapper">
                    <h2>Events:</h2>
                    <ol>
                    {data.group.events.map(event => (<EachEventAdmin event={event} ></EachEventAdmin>))}
                    </ol>
                    <a href="/">Add an Event</a>
                </div>
            </section>
        </>
    )
};

export default GroupAdmin;