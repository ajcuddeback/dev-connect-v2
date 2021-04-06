import React, { useState } from 'react';

// Apollo
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

// Components
import Login from './components/login/Login';
import Nav from './components/layout-components/Nav';
import MeetHome from './components/event-components/MeetHome';
import ZipGroups from './components/event-components/zipGroups';
import GroupHome from './components/event-components/GroupHome';
import GroupAdmin from './components/event-components/GroupAdmin';
import EditEvent from './components/event-components/EditEvent';
import AddEvent from './components/event-components/AddEvent';

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
      {Auth.loggedIn() ? (
        <>
          <h2>You are logged in</h2>
          <Router>
            <Nav />
            <Switch>
              <Route exact path='/meet' render={() => (
                <MeetHome miles={miles} setMiles={setMiles} zipCode={zipCode} setZipCode={setZipCode} />
              )}></Route>
              <Route exact path='/meet/groups' render={() => (
                <ZipGroups miles={miles} zipCode={zipCode} />
              )}  ></Route>
              <Route exact path='/meet/:groupName' render={() => (
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
        <Login />
      )}
    </ApolloProvider>
  );
}

export default App;
