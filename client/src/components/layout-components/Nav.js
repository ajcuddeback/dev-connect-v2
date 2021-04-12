import React from 'react';

import Auth from '../../utils/auth';

import { Link } from 'react-router-dom';

import logo from '../../images/red-on-trans-logo.png';

import styled from 'styled-components';

function Nav({navOpen, setNavOpen}) {

    // functions
    const handleLogout = () => {
        Auth.logout()
    }

    return (
        <StyledHead>
            <button onClick={() => setNavOpen(!navOpen)} className="toggleNav disabled">Open Nav</button>
            <StyledNav>
                <section className={`${navOpen ? 'active-nav' : ''} `}>
                    <div className="img-wrapper">
                        <img src={logo} alt="dev-connect logo" className="logo" width="500px"/>
                    </div>
                    <ul>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/`}>Feed</Link></li>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/meet`}>Meet</Link></li>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/askDevs`}>AskDevs</Link></li>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/`}>Shop</Link></li>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/meet/dashboard`}>Meet Up Dashboard</Link></li>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/meet/my-groups`}>My Groups</Link></li>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/meet/my-events`}>My Events</Link></li>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/`}>My Posts</Link></li>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/`}>My Questions</Link></li>
                    </ul>
                    
                    <button className="glass-button" onClick={handleLogout}>Logout</button>
                </section>
            </StyledNav>
        </StyledHead>
    )
}

const StyledHead = styled.header`
    display: flex;
    .toggleNav {
        position: relative;
        left: 80vw;;
    }

    @media (max-width: 1050px) {
        .toggleNav {
            opacity: 1;
            pointer-events: auto;
        }
    }
`

const StyledNav = styled.nav`
    
    section {
        min-height: 110vh;
        position: fixed;
        left: 0;
        width: 13rem;
        border: none;
        border-radius: 5px;
        background: rgba(255,255,255,0.5);
        backdrop-filter: blur(5px);
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 0.9s ease;
        z-index: 999;
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
    }

    @media (max-width: 1050px) {
        .active-nav {
        left: -400px;
        transition: all 0.9s ease;
    }
    }
`

export default Nav;