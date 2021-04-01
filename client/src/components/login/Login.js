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
                    <img src={logo} alt="dev-connect logo" className="logo" width="500px"/>
                </div>
                <form className="login-form">
                    <h2>Login</h2>
                    <input type="text" name="username" id="username" placeholder="Username"/>
                    <br/>
                    <input type="password" name="password" id="password" placeholder="Password"/>
                    <br/>
                    <p className="errorP"></p>
                    <button type="submit">Login</button>
                    <p>Dont have an account with us? <span onClick={() => setIsNewUser(!isNewUser)}>Signup here!</span></p>
                </form>
            </>
        )
    } else {
        return (
            <>
                <div className="img-wrapper">
                    <img src={logo} alt="dev-connect logo" className="logo" width="500px"/>
                </div>
                <form className="login-form">
                    <h2>Signup</h2>
                    <input type="text" name="username" id="username" placeholder="Username"/>
                    <br/>
                    <input type="email" name="email" id="email" placeholder="example@example.com"/>
                    <br/>
                    <input type="text" name="first_name" id="firstName" placeholder="First Name"/>
                    <br/>
                    <input type="text" name="last_name" id="lastName" placeholder="Last Name"/>
                    <br/>
                    <input type="password" name="password" id="password" placeholder="Password"/>
                    <br/>
                    <p className="errorP"></p>
                    <button type="submit">Login</button>
                    <p>Already have an account? <span onClick={() => setIsNewUser(!isNewUser)}>Signup here!</span></p>
                </form>
            </>
        )
    }
}

export default Login;