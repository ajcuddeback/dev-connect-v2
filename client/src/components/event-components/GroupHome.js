import React, { useState, useEffect } from 'react';

// Router
import { useParams, Link } from 'react-router-dom';

// gql
import { useQuery } from '@apollo/react-hooks';
import { GET_GROUP } from '../../utils/queries';
import { useMutation } from '@apollo/react-hooks';
import {  ADD_USER_GROUP } from '../../utils/mutations';
// Auth
import Auth from '../../utils/auth';

import EachEvent from './each-event/EachEvent';

const GroupHome = () => {
    const [isMember, setIsMemeber] = useState(false);
    const [dataGroup, setDataGroup] = useState(false);
    const [addUserGroup, {err}] = useMutation(ADD_USER_GROUP);

    // Get the groupName from params
    let { groupName } = useParams();
    // use query to get the groups data
    const { loading, data } = useQuery(GET_GROUP, {
        variables: {group_url: groupName}
    });

    const handleJoinGroup = async () => {
        try {
            await addUserGroup({
                variables: { group_id: parseInt(data.group.id) },
                refetchQueries: [{ 
                    query: GET_GROUP,
                    variables: { group_url: groupName }
                }]
            })
        } catch (e) {
            console.log(e)
        }
    }
    

    useEffect(() => {
        if(data) {
            if(data.group === null) {
                return;
            }
            const groupUsers = data.group.group_user;
            groupUsers.forEach(user => {
                const userid = Auth.getProfile().data.id;
                
                if(parseInt(user.id) === userid) {
                    setIsMemeber(true);
                } else {
                    setIsMemeber(false);
                }
            });
            setDataGroup(true);
        }
    }, [data])

    if(loading) {
        return (
            <h2>Loading...</h2>
        )
    };

    if(dataGroup === false) {
        return(
            <h2>No group exists at this url! Go back to the <Link to={`/meet`}>events page</Link>  to find a group in your area!</h2>
        )
    }

    return (
        <>
            <h2>Group Home</h2>

            <section className="group-content-wrapper">
                <div className="group-info-wrapper">
                    <h2 className="group-name">{data.group.group_title}</h2>
                    <p>{data.group.group_text}</p>
                    {!isMember ? (
                        <button onClick={handleJoinGroup}>Join Group</button>
                    ) : ''}
                </div>
                <div className="group-event-wrapper">
                    <ol>
                        {data.group.events.map(event => (<EachEvent event={event} ></EachEvent>))}
                    </ol>
                </div>
            </section>
        </>
    )
};

export default GroupHome;