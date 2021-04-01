import React, { useState } from 'react';

import logo from '../../images/red-on-trans-logo.png'

import { useMutation } from '@apollo/react-hooks'
import { LOGIN_USER, SIGNUP_USER } from '../../utils/mutations';
import Auth from '../../utils/auth'
function Login() {
    // GraphQL
    const [login, {error}] = useMutation(LOGIN_USER);
    const [addUser, {error}] = useMutation(SIGNUP_USER);

    // State
    const [userLoginData, setUserLoginData] = useState({username: '', password: ''});
    const [signupData, setSignupData] = useState({username: '', email: '', first_name: '', last_name: '', password: ''});
    const [isNewUser, setIsNewUser] = useState(false);

    // Functions
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setUserLoginData({ ...userLoginData, [name]: value })
    }

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data } = await login({
                variables: {...userLoginData}
            });


            Auth.login(data.login.token);
        } catch(err) {
            console.log(err)
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const { data } = await addUser({
                variables: {...signupData}
            });

            Auth.login(data.login.token);
        } catch(err) {
            console.log(err)
        }
    }

    // JSX
    if(!isNewUser) {
        return (
            <>
                <div className="img-wrapper">
                    <img src={logo} alt="dev-connect logo" className="logo" width="500px"/>
                </div>
                <form className="login-form" onSubmit={handleLogin} >
                    <h2>Login</h2>
                    <input type="text" name="username" id="username" placeholder="Username" onChange={handleLoginChange} />
                    <br/>
                    <input type="password" name="password" id="password" placeholder="Password"onChange={handleLoginChange} />
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
                <form className="login-form" onSubmit={handleSignup} >
                    <h2>Signup</h2>
                    <input type="text" name="username" id="username" placeholder="Username" onChange={handleSignupChange} />
                    <br/>
                    <input type="email" name="email" id="email" placeholder="example@example.com" onChange={handleSignupChange} />
                    <br/>
                    <input type="text" name="first_name" id="firstName" placeholder="First Name" onChange={handleSignupChange} />
                    <br/>
                    <input type="text" name="last_name" id="lastName" placeholder="Last Name" onChange={handleSignupChange} />
                    <br/>
                    <input type="password" name="password" id="password" placeholder="Password" onChange={handleSignupChange} />
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