import React, { useState } from 'react';

import logo from '../../images/red-on-trans-logo.png'

function Login() {
    // State
    const [userLoginData, setUserLoginData] = useState({username: '', password: ''});
    const [signupData, setSignupData] = useState({username: '', email: '', first_name: '', last_name: '', password: ''});
    const [isNewUser, setIsNewUser] = useState(false);

    // JSX
    if(!isNewUser) {
        return (
            <>
                <div className="img-wrapper">
                    <img src={logo} alt="dev-connect logo" className="logo"/>
                </div>
                <form className="login-form">
                    <h2>Login</h2>
                </form>
            </>
        )
    }
}

export default Login;