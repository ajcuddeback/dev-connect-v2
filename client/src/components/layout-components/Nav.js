import React from 'react';

import Auth from '../../utils/auth';

function Nav() {

    // functions
    const handleLogout = () => {
        Auth.logout()
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default Nav;