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

import styled from 'styled-components'
function MeetDashboard() {
  // State
  const [groupData, setGroupData] = useState(false);

  // gql
  const { loading, data } = useQuery(OWNER_GROUPS);

  const userData = Auth.getProfile();
  const username = userData.data.username;
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
  }, [data, loading])
  

  // JSX
  if(loading) {
    return (
      <StyledLoader>
          <h2>Loading...</h2>
          <div className="loader"></div>
      </StyledLoader>
    )
  }

  if(!groupData) {
    return (
      <StyledError>
        <h2>You currently have no groups!</h2>
        <div className="create-group-btn">
          <Link to={'/meet'}>Create a group!</Link>
        </div>
      </StyledError>
    )
  }

  return (
    <StyledDash>
      <h2>Welcome back to your dashboard {username}</h2>
      <h3>Please choose a group you would like to manage</h3>
      <div className="dashboard-groups">
        <ol>
          {data.myGroups.map(group => (<EachGroupOwner group={group} key={group.id} />))}
        </ol>
      </div>
      <div className="create-group-btn">
        <Link className="glass-button" to={'/meet'}>Create a group</Link>
      </div>
    </StyledDash>
  );
}

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

const StyledDash = styled.div`
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

  .create-group-btn {
    margin-bottom: 2rem;
  }
`

export default MeetDashboard;
