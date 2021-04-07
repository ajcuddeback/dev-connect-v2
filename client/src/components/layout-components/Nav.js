import React from 'react';

import Auth from '../../utils/auth';

import { Link } from 'react-router-dom';

import logo from '../../images/red-on-trans-logo.png';

import styled from 'styled-components';

function Nav() {

    // functions
    const handleLogout = () => {
        Auth.logout()
    }

    return (
        <StyledNav>
            <div className="img-wrapper">
                <img src={logo} alt="dev-connect logo" className="logo" width="500px"/>
            </div>
            <ul>
                <li><Link to={`/`}>Feed</Link></li>
                <li><Link to={`/meet`}>Meet</Link></li>
                <li><Link to={`/`}>AskDevs</Link></li>
                <li><Link to={`/`}>Shop</Link></li>
                <li><Link to={`/meet/dashboard`}>Meet Up Dashboard</Link></li>
                <li><Link to={`/meet/my-groups`}>My Groups</Link></li>
                <li><Link to={`/meet/my-events`}>My Events</Link></li>
                <li><Link to={`/`}>My Posts</Link></li>
                <li><Link to={`/`}>My Questions</Link></li>
            </ul>
            
            <button className="glass-button" onClick={handleLogout}>Logout</button>
        </StyledNav>
    )
}

const StyledNav = styled.nav`
    min-height: 100vh;
    position: fixed;
    width: 15rem;
    border: none;
    border-radius: 5px;
    background: rgba(255,255,255,0.5);
    backdrop-filter: blur(5px);
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo {
        width: 90%;
    }
    a {
        font-size: 24px;
    }
    ul {
        height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`

export default Nav;