import React, { useEffect, useState } from 'react';

import Auth from '../../utils/auth';

// gql
import { useQuery } from '@apollo/react-hooks';
import { GET_ME_GROUPS } from '../../utils/queries';

// router
import { Link } from 'react-router-dom';

// Components
import EachMyGroups from './each-group/EachMyGroups';

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
            <h1>Loading...</h1>
        )
    }

    if(!groupData) {
        return (
            <>
                <h2>You currently are not a part of any groups!</h2>
                <p>Join a group here: <Link to={'/meet'}>Join Group</Link> </p>
            </>
        )
    }

    return (
        <>
            <h2>{username}'s groups</h2>
            <div className="groups">
                <ol>
                    {data.me.group_user.map(group => (<EachMyGroups group={group} />))}
                </ol>
            </div>
        </>
    )
};

export default MyGroups;