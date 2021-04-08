import React, { useEffect, useState } from 'react';

import Auth from '../../utils/auth';

// gql
import { useQuery } from '@apollo/react-hooks';
import { GET_ME_GROUPS } from '../../utils/queries';

// router
import { Link } from 'react-router-dom';

// Components
import EachMyGroups from './each-group/EachMyGroups';

// styled comp
import styled from 'styled-components';

const MyGroups = () => {
    // State
    const [groupData, setGroupData] = useState(false);

    // gql
    const { loading, data } = useQuery(GET_ME_GROUPS);

    const userData = Auth.getProfile();
    const username = userData.data.username;


    console.log(data)

    useEffect(() => {
        if(loading) {
          return;
        }
        if(!data.me.group_user.length) {
          setGroupData(false)
          return;
        } else {
          setGroupData(true)
        }
      }, [data])

    // JSX
    if(loading) {
        return (
            <StyledLoader>
                <h2>Loading...</h2>
                <div class="loader"></div>
            </StyledLoader>
        )
    }

    if(!groupData) {
        return (
            <StyledError>
                <h2>You currently are not a part of any groups!</h2>
                <h3>Join a group here: <Link to={'/meet'}>Join Group</Link> </h3>
            </StyledError>
        )
    }

    return (
        <StyledGroups>
            <h2>{username}'s Groups</h2>
            <div className="groups">
                <ol>
                    {data.me.group_user.map(group => (<EachMyGroups group={group} />))}
                </ol>
            </div>
        </StyledGroups>
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

const StyledGroups = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;

    .group-wrapper {
        width: 20rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        padding: 1rem;
        text-align: center;
        div {
            a {
                margin-top: 1rem;
                padding: 3px;
            }
        }
    }
`

export default MyGroups;