import React from 'react';

import Auth from '../../utils/auth';

import { Link } from 'react-router-dom';

function Nav() {

    // functions
    const handleLogout = () => {
        Auth.logout()
    }

    return (
        <>
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
            
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Nav;