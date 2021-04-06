import React, { useState, useEffect } from 'react';

// gql
import { useQuery } from '@apollo/react-hooks';
import { OWNER_GROUPS } from '../../utils/queries';

// router
import { Link } from 'react-router-dom';

// Auth
import Auth from '../../utils/auth';

// Components
import EachGroupOwner from './each-group/EachGroupOwner';

function MeetDashboard() {
  // State
  const [groupData, setGroupData] = useState(false);

  // gql
  const { loading, data } = useQuery(OWNER_GROUPS);

  const userData = Auth.getProfile();
  const username = userData.data.username;
  console.log(data)
  useEffect(() => {
    if(loading) {
      return;
    }
    if(!data.myGroups.length) {
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
      <h2>You currently have no groups!</h2>
    )
  }

  return (
    <>
      <h2>Welcome back to your dashboard {username}</h2>
      <h3>Please choose a group you would like to manage</h3>
      <div className="dashboard-groups">
        <ol>
          {data.myGroups.map(group => (<EachGroupOwner group={group} />))}
        </ol>
      </div>
      <div className="create-group-btn">
        <Link to={'/meet'}>Create a group</Link>
      </div>
    </>
  );
}

export default MeetDashboard;
