import React from "react";

import Auth from "../../utils/auth";

import { Link } from "react-router-dom";

import logo from "../../images/red-on-trans-logo.webp";

import styled from "styled-components";

function Nav({ navOpen, setNavOpen }) {
  // functions
  const handleLogout = () => {
    Auth.logout();
  };

  
    return (
        <StyledHead>
            <div onClick={() => setNavOpen(!navOpen)} className={`toggleNav disabled ${navOpen ? 'nav-open' : ''}`}>
                <div className={`line1 ${navOpen ? 'nav-open1' : 'nav-close1'}`}></div>
                <div className={`line2 ${navOpen ? 'nav-open2' : 'nav-close2'}`}></div>
                <div className={`line3 ${navOpen ? 'nav-open3' : 'nav-close3'}`}></div>
            </div>
            <StyledNav>
                <section className={`${navOpen ? '' : 'active-nav'} `}>
                    <div className="img-wrapper">
                        <img src={logo} alt="dev-connect logo" className="logo" width="500px"/>
                    </div>
                    <ul>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/`}>Feed</Link></li>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/meet`}>Meet</Link></li>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/askDevs`}>AskDevs</Link></li>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/shop`}>Shop</Link></li>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/meet/dashboard`}>Meet Up Dashboard</Link></li>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/meet/my-groups`}>My Groups</Link></li>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/meet/my-events`}>My Events</Link></li>
                        <li><Link onClick={() => setNavOpen(!navOpen)} to={`/myquestions`}>My Questions</Link></li>
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
    left: 80vw;
    width: 3rem;
    height: 2.1rem;
    cursor: pointer;
  }

  .line1,
  .line2,
  .line3 {
    width: 3rem;
    height: 0.2rem;
    margin: 0.5rem;
    background: white;
  }

  .nav-open1 {
    transform: translate(0px, 11px) rotate(45deg);
    transition: 1s ease;
  }
  .nav-open2 {
    animation: slideOut 1s forwards;
  }
  .nav-open3 {
    transform: translate(0px, -11px) rotate(-45deg);
    transition: 1s ease;
  }
  .nav-close1 {
    transform: translate(0px, 0px) rotate(0deg);
    transition: 1s ease;
  }
  .nav-close2 {
    animation: slideIn 1s forwards;
  }
  .nav-close3 {
    transform: translate(0px, 0px) rotate(0deg);
    transition: 1s ease;
  }

  @keyframes slideOut {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(-50px);
      opacity: 0;
    }
  }
  @keyframes slideIn {
    from {
      transform: translateX(-50px);
      opacity: 0;
    }
    to {
      transform: translateX(0px);
      opacity: 1;
    }
  }

  @media (max-width: 1050px) {
    .toggleNav {
      opacity: 1;
      pointer-events: auto;
    }
  }
`;

const StyledNav = styled.nav`
  section {
    min-height: 110vh;
    position: fixed;
    left: 0;
    width: 13rem;
    border: none;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.5);
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
      text-align: center;
    }
    button {
      margin-top: 5rem;
    }
  }

  @media (max-width: 1050px) {
    .active-nav {
      left: -400px;
      transition: all 0.9s ease;
    }
  }
`;

export default Nav;
