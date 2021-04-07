import React, { useState } from 'react';

// Import logo
import logo from '../../images/red-on-trans-logo.png';

// Import utils
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER, SIGNUP_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

// styled comp
import styled from 'styled-components';

function Login() {
    // GraphQL
    const [login, {error}] = useMutation(LOGIN_USER);
    const [addUser, {err}] = useMutation(SIGNUP_USER);

    // State
    const [userLoginData, setUserLoginData] = useState({username: '', password: ''});
    const [signupData, setSignupData] = useState({username: '', email: '', first_name: '', last_name: '', password: ''});
    const [isNewUser, setIsNewUser] = useState(false);
    const [errorP, setErrorP] = useState("")

    // Functions
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setUserLoginData({ ...userLoginData, [name]: value });
    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data } = await login({
                variables: {...userLoginData}
            });


            Auth.login(data.login.token);
        } catch(err) {
            console.log(err);
            setErrorP('We could not log you in with these credentials. Please try again!');
            await setTimeout(function() {
                setErrorP("");
            }, 3500);
        };
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const { data } = await addUser({
                variables: {...signupData}
            });
            console.log(data)
            Auth.login(data.addUser.token);
        } catch(err) {
            console.log(err);
            setErrorP('We could not sign you up with these credentials! Please ensure your password is at least 8 characters long and username is at least 4 characters long!');
            await setTimeout(function() {
                setErrorP("");
            }, 4500);
        };
    };

    // JSX
    if(!isNewUser) {
        return (
            <StyledLogin>
                <div className="img-wrapper">
                    <img src={logo} alt="dev-connect logo" className="logo" width="500px"/>
                </div>
                <h2 className="tagname">The Social Media App for Developers</h2>
                <form className="login-form glass-background" onSubmit={handleLogin} >
                    <h2>Login</h2>
                    <input className="glass-background" type="text" name="username" id="username" placeholder="Username" onChange={handleLoginChange} required />
                    <br/>
                    <input className="glass-background" type="password" name="password" id="password" placeholder="Password"onChange={handleLoginChange} required />
                    <br/>
                    <p className="errorP">{errorP}</p>
                    <button className="glass-button" type="submit">Login</button>
                    <p>Dont have an account with us? <span onClick={() => setIsNewUser(!isNewUser)}>Signup here!</span></p>
                </form>
            </StyledLogin>
        );
    } else {
        return (
            <StyledLogin>
                <div className="img-wrapper">
                    <img src={logo} alt="dev-connect logo" className="logo" width="500px"/>
                </div>
                <h2 className="tagname">The Social Media App for Developers</h2>

                <form className="login-form glass-background" onSubmit={handleSignup} >
                    <h2>Signup</h2>
                    <input className="glass-background" type="text" name="username" id="username" placeholder="Username" onChange={handleSignupChange} required />
                    <br/>
                    <input className="glass-background" type="email" name="email" id="email" placeholder="example@example.com" onChange={handleSignupChange} required />
                    <br/>
                    <input className="glass-background" type="text" name="first_name" id="firstName" placeholder="First Name" onChange={handleSignupChange} required />
                    <br/>
                    <input className="glass-background" type="text" name="last_name" id="lastName" placeholder="Last Name" onChange={handleSignupChange} required />
                    <br/>
                    <input className="glass-background" type="password" name="password" id="password" placeholder="Password" onChange={handleSignupChange} required />
                    <br/>
                    <p className="errorP">{errorP}</p>
                    <button className="glass-button" type="submit">Signup</button>
                    <p>Already have an account? <span onClick={() => setIsNewUser(!isNewUser)}>Login here!</span></p>
                </form>
            </StyledLogin>
        );
    };
};

const StyledLogin = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;

    .tagname {
        margin-bottom: 3rem;
        color: #f05454;
    }

    .img-wrapper {
        margin-bottom: 2rem;
    }

    .login-form {
        margin-bottom: 16rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h2 {
            margin-bottom: 1rem;
        }
        p {
            span {
                cursor: pointer;
            }
        }
    }

    @media (max-width: 500px) {
        width: 60%;
        form {
            width: 20rem;
        }
        .img-wrapper {
            .logo {
                width: 20rem;
            }
        }
        .tagname {
            font-size: 24px;
        }
    }

    @media (max-width: 400px) {
        width: 70%;
        form {
            width: 15rem;
        }
        .img-wrapper {
            .logo {
                width: 18rem;
            }
        }
    }
`

export default Login;