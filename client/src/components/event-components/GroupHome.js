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

// styled comp
import styled from 'styled-components';

const GroupHome = () => {
    const [isMember, setIsMemeber] = useState();
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
            setIsMemeber(true)
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
            console.log(groupUsers)
            groupUsers.forEach(user => {
                const userid = Auth.getProfile().data.id;
                console.log(user.id, userid)
                
                if(parseInt(user.id) === userid) {
                    console.log('yes')
                    setIsMemeber(true);
                    return;
                } else {
                    setIsMemeber(false);
                }
            });
            setDataGroup(true);
        }
    }, [data])

    if(loading) {
        return (
            <StyledLoader>
                <h2>Loading...</h2>
                <div className="loader"></div>
            </StyledLoader>
        )
    };

    if(dataGroup === false) {
        return(
            <StyledError>
                <h2>No group exists at this url! Go back to the <Link to={`/meet`}>events page</Link>  to find a group in your area!</h2>
            </StyledError>
        )
    }

    return (
        <StyledGroupHome>
            <h2>Group Home</h2>

            <section className="group-content-wrapper">
                <div className="group-info-wrapper">
                    <h2 className="group-name">{data.group.group_title}</h2>
                    <p>{data.group.group_text}</p>
                    {!isMember ? (
                        <button className="glass-button" onClick={handleJoinGroup}>Join Group</button>
                    ) : ''}
                </div>
                <div className="group-event-wrapper">
                    <ol>
                        {data.group.events.map(event => (<EachEvent event={event} isMember={isMember} ></EachEvent>))}
                    </ol>
                </div>
            </section>
        </StyledGroupHome>
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

const StyledGroupHome = styled.div`
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

    @media (max-width: 550px) {
        .each-event {
            width: 20rem;
        }
    }
    @media (max-width: 400px) {
        .each-event {
            width: 16rem;
        }
    }
`

export default GroupHome;