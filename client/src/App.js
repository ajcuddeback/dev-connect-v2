import React, { useState } from 'react';

// Apollo
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

// Components
// Events
import Login from './components/login/Login';
import Nav from './components/layout-components/Nav';
import MeetHome from './components/event-components/MeetHome';
import ZipGroups from './components/event-components/zipGroups';
import GroupHome from './components/event-components/GroupHome';
import GroupAdmin from './components/event-components/GroupAdmin';
import EditEvent from './components/event-components/EditEvent';
import AddEvent from './components/event-components/AddEvent';
import MeetDashboard from './components/event-components/MeetDashboard';
import MyGroups from './components/event-components/MyGroups';
import MyEvents from './components/event-components/MyEvents';

// Styled Component
import GlobalStyle from './components/GlobalStyles';
import styled from 'styled-components';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Utils
import Auth from './utils/auth'

// Client
const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}`: ''
      }
    })
  }, 
  uri: '/graphql'
})

function App() {
  // State
  const [miles, setMiles] = useState(20);
  const [zipCode, setZipCode] = useState();

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      {Auth.loggedIn() ? (
        <>
          <Router>
            <Nav />
            <Switch>
              <Route exact path='/meet' render={() => (
                <MeetHome miles={miles} setMiles={setMiles} zipCode={zipCode} setZipCode={setZipCode} />
              )}></Route>
              <Route exact path='/meet/groups' render={() => (
                <ZipGroups miles={miles} zipCode={zipCode} />
              )}  ></Route>
              <Route exact path='/meet/dashboard' component={MeetDashboard}></Route>
              <Route exact path='/meet/my-groups' component={MyGroups}></Route>
              <Route exact path='/meet/my-events' component={MyEvents}></Route>
              <Route exact path='/meet/groups/:groupName' render={() => (
                <GroupHome />
              )} ></Route>
              <Route exact path='/meet/edit-event/:groupName/:eventId' component={EditEvent}></Route>
              <Route exact path='/meet/add-event/:groupName' component={AddEvent}></Route>
              <Route exact path='/meet/admin/:groupName' render={() => (
                <GroupAdmin />
              )}></Route>
              
            </Switch>
          </Router>
            
        </>
      ) : (
        <StyledLoginBack>
          <GlobalStyle />
          <Login />
        </StyledLoginBack>
      )}
    </ApolloProvider>
  );
}

const StyledLoginBack = styled.div`
  min-height: 100vh;
  background: linear-gradient( #090718,  #005bff);
`

export default App;
