import React, { useState } from "react";

// Apollo
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
// Events


import HomePage from './components/post-component/homePage';
import SingleUser from './components/post-component/Dashboard';


import Login from "./components/login/Login";
import Nav from "./components/layout-components/Nav";
import MeetHome from "./components/event-components/MeetHome";
import ZipGroups from "./components/event-components/zipGroups";
import GroupHome from "./components/event-components/GroupHome";
import GroupAdmin from "./components/event-components/GroupAdmin";
import EditEvent from "./components/event-components/EditEvent";
import AddEvent from "./components/event-components/AddEvent";
import MeetDashboard from "./components/event-components/MeetDashboard";
import MyGroups from "./components/event-components/MyGroups";
import MyEvents from "./components/event-components/MyEvents";
import { loadStripe } from "@stripe/stripe-js";


import Home from "./components/store-components/Home";
import Detail from "./components/store-components/Detail";
import Success from "./components/store-components/Success";
import AskDevsHome from "./components/question-components/AskDevsHome";
import MyQuestions from './components/question-components/MyQuestions';
// Styled Component
import GlobalStyle from "./components/GlobalStyles";
import styled from "styled-components";

// Utils
import Auth from "./utils/auth";

// Client
const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  // State
  const [miles, setMiles] = useState(20);
  const [zipCode, setZipCode] = useState();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      {Auth.loggedIn() ? (
        <>
          <Router>
            <Nav navOpen={navOpen} setNavOpen={setNavOpen} />
            <Routes>

              <Route
                exact
                path="meet"
                element={
                  <MeetHome
                    miles={miles}
                    setMiles={setMiles}
                    zipCode={zipCode}
                    setZipCode={setZipCode}
                    navOpen={navOpen}
                  />
                }
              ></Route>
              <Route
                exact
                path="meet/groups"
                element={
                  <ZipGroups
                    miles={miles}
                    zipCode={zipCode}
                    navOpen={navOpen}
                  />
                }
              ></Route>
              <Route
                exact
                path="meet/dashboard"
                element={<MeetDashboard></MeetDashboard>}
              ></Route>
              <Route exact path="askDevs" element={<AskDevsHome></AskDevsHome>}></Route>
              <Route exact path="meet/my-groups" element={<MyGroups></MyGroups>}></Route>
              <Route exact path="meet/my-events" element={<MyEvents></MyEvents>}></Route>
              <Route
                exact
                path="meet/groups/:groupName"
                element={<GroupHome navOpen={navOpen} />}
              ></Route>
              <Route
                exact
                path="/meet/edit-event/:groupName/:eventId"
                element={<EditEvent></EditEvent>}
              ></Route>
              <Route
                exact
                path="meet/add-event/:groupName"
                element={<AddEvent></AddEvent>}
              ></Route>
              <Route
                exact
                path="meet/admin/:groupName"
                element={<GroupAdmin navOpen={navOpen} />}
              ></Route>
              <Route
                exact
                path="shop"
                element={<Home navOpen={navOpen} />}
              ></Route>
              <Route exact path="products/:id" element={<Detail></Detail>} />
              <Route exact path="success" element={<Success></Success>} />
              <Route exact path='myquestions' element={<MyQuestions></MyQuestions>} />
  <Route exact path='/' element={<HomePage></HomePage>}></Route>
              <Route exact path='username' element={<SingleUser></SingleUser>}></Route>

            </Routes>
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
  background: linear-gradient(#090718, #28bad6);
`;

export default App;