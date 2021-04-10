import React, { useState } from 'react';
// Router
import { useHistory } from 'react-router-dom';

import axios from 'axios';

// gql
import { useMutation } from '@apollo/react-hooks';
import { OWNER_GROUPS } from '../../utils/queries';
import { CREATE_GROUP } from '../../utils/mutations';

import { useForm } from 'react-hook-form';

// styled comp
import styled from 'styled-components';

const MeetHome = ({ miles, setMiles, setZipCode }) => {

    const { register, handleSubmit, watch, formState: {errors} } = useForm();

    // State
    const [createGroupForm, setCreateGroupForm] = useState({group_title: '', group_text: '', group_zip: 0});

    // gql
    const [ createGroup, {err} ] = useMutation(CREATE_GROUP);

    // useHistory
    const history = useHistory();

    // Functions for creating a group
    const createGroupHandler = async (e) => {
        e.preventDefault();
        const groupUrl = createGroupForm.group_title.trim().toLowerCase().split(' ').join('-');
        const group_title = createGroupForm.group_title;
        const group_text = createGroupForm.group_text;
        const group_zip = parseInt(createGroupForm.group_zip);
        
        try {
            await createGroup({
                variables: {group_title: group_title, group_url: groupUrl, group_text: group_text, group_zip: group_zip},
                refetchQueries: [{
                    query: OWNER_GROUPS
                }]
            });
            history.push(`/meet/admin/${groupUrl}`);
        } catch(e) {
            console.log(e)
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setCreateGroupForm({ ...createGroupForm, [name]: value })
    };

    // Functions for finding group
    const handleRange = (event) => {
        setMiles(event.target.value)
    };


    const findGroupHandler = (e, j) => {
        j.preventDefault();

        setZipCode(e.zipCode)

        history.push('/meet/groups')
    };

    const findGroupZipHandler = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                const apiUrl = `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_GEOAPIKEY}&lat=${lat}&lon=${lon}&format=json`;
                await axios.get(apiUrl).then(response => setZipCode(response.data.address.postcode));

                history.push('/meet/groups');
            });
            
        } else {
            console.log("No location!")
        };
    };

    // JSX
    return (
        <StyledHome>
            <section className="welcome glass-background">
                <h1>Welcome to meetDevs</h1>
                <p>meetDevs is a great place to find groups for developers like you! Simply eneter your zip-code in the find 
                    group form below and pick a group that best fits you needs! Don't see a group in your area? Feel free to start one!
                </p>
            </section>
            <section className="get-group-wrapper">
                <div className="start-group-wrapper glass-background">
                    <h2>Create a group in your area!</h2>
                    <form onSubmit={createGroupHandler} className="create-group-form">
                        <input onChange={handleFormChange} aria-label="Name of your group" type="text" name="group_title" className="group-name" placeholder="Name of your group" required />
                        <textarea onChange={handleFormChange} name="group_text" id="about-group" cols="30" rows="10" aria-label="What is your group about?"
                            placeholder="What is your group about?" required></textarea>
                        <input onChange={handleFormChange} aria-label="Zip Code" type="number" name="group_zip" className="zip" placeholder="Zip Code" required />
                        <button type="submit" className="glass-button">Create Group</button>
                    </form>
                </div>
                <div className="find-group-wrapper glass-background">
                    <h2>Find a group near you!</h2>
                    <form onSubmit={handleSubmit(findGroupHandler)} className="find-group-form">
                        <input type="range" aria-label="range" className="mile-slider" max="150" min="10" value={miles} onChange={handleRange} />
                        <p>Within <span className="miles-nr">{miles}</span> miles</p>
                        <input type="number" aria-label="Zip Code" {...register("zipCode", {minLength:5, maxLength: 5})} placeholder="Zip Code" required />
                        {errors.zipCode && "You must enter a zip code!"}
                        <button type="submit" className="glass-button">Find a group!</button>
                    </form>

                    <button className="use-location glass-button" onClick={findGroupZipHandler}>Use your current location?</button>
                    </div>
            </section>
        </StyledHome>
    )
};

const StyledHome = styled.div`
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 0 auto;
    align-items: center;
    justify-content: center;

    .welcome {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem;
        p {
            text-align: center;
            font-size: 20px;
        }
    }
    .get-group-wrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 3rem;
        div {
            width: 30rem;
            padding: 1.5rem;
            height: 30rem;
            .create-group-form {
                margin-top: 1rem;
                height: 80%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .find-group-form {
                display: flex;
                flex-direction: column;
                height: 60%;
                justify-content: center;
                input {
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                }
                input:focus {
                    outline: auto 1px -webkit-focus-ring-color;
                }   
                /* Input styles by Natalie:  https://codemenatalie.com/blog/classy-slider-with-pure-css/*/
                input[type="range"] {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    background-color: transparent;

                    &:focus {
                    outline-color: #f8b195;
                    }
                }
                input[type="range"]::-webkit-slider-runnable-track {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 3px;
                    background: rgb(246, 114, 128);
                    background: -webkit-linear-gradient(
                    left,
                    #005bff 0%,
                    rgba(192, 108, 132, 1) 50%,
                    #f05454 100%
                    );
                    background: linear-gradient(
                    to right,
                    #005bff 0%,
                    rgba(192, 108, 132, 1) 50%,
                    #f05454 100%
                    );
                    filter: progid:DXImageTransform.Microsoft.gradient(
                    startColorstr="#f67280",
                    endColorstr="#355c7d",
                    GradientType=1
                    );
                }

                input[type="range"]::-moz-range-track {
                    -moz-appearance: none;
                    appearance: none;
                    height: 3px;
                    background: rgb(246, 114, 128);
                    background: -moz-linear-gradient(
                    left,
                    #005bff 0%,
                    rgba(192, 108, 132, 1) 50%,
                    #f05454 100%
                    );
                    background: linear-gradient(
                    to right,
                    #005bff 0%,
                    rgba(192, 108, 132, 1) 50%,
                    #f05454 100%
                    );
                    filter: progid:DXImageTransform.Microsoft.gradient(
                    startColorstr="#f67280",
                    endColorstr="#355c7d",
                    GradientType=1
                    );
                }
                
                input[type="range"]::-ms-track {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    height: 3px;
                    background: rgb(246, 114, 128);
                    background: -moz-linear-gradient(
                    left,
                    #005bff 0%,
                    rgba(192, 108, 132, 1) 50%,
                    #f05454 100%
                    );
                    background: -webkit-linear-gradient(
                    left,
                    #005bff 0%,
                    rgba(192, 108, 132, 1) 50%,
                    #f05454 100%
                    );
                    background: linear-gradient(
                    to right,
                    #005bff 0%,
                    rgba(192, 108, 132, 1) 50%,
                    #f05454 100%
                    );
                    filter: progid:DXImageTransform.Microsoft.gradient(
                    startColorstr="#f67280",
                    endColorstr="#355c7d",
                    GradientType=1
                    );
                }

                input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                border: 2px solid #005bff;
                border-radius: 50%;
                height: 20px;
                width: 20px;
                position: relative;
                bottom: 8px;
                background: #222
                    url("http://codemenatalie.com/wp-content/uploads/2019/09/slider-thumb.png")
                    center no-repeat;
                background-size: 50%;
                box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4);
                cursor: grab;
                    
                    &:active {
                    cursor: grabbing;
                    }
                }


                input[type="range"]::-moz-range-thumb {
                    -moz-appearance: none;
                    appearance: none;
                    border: 2px solid #f8b195;
                    border-radius: 50%;
                    height: 20px;
                    width: 20px;
                    position: relative;
                    bottom: 8px;
                    background: #222
                    url("http://codemenatalie.com/wp-content/uploads/2019/09/slider-thumb.png")
                    center no-repeat;
                    background-size: 50%;
                    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4);
                    cursor: grab;
                    
                    &:active {
                    cursor: grabbing;
                    }
                }

                input[type="range"]::-ms-thumb {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    border: 2px solid #f8b195;
                    border-radius: 50%;
                    height: 20px;
                    width: 20px;
                    position: relative;
                    bottom: 8px;
                    background: #222
                    url("http://codemenatalie.com/wp-content/uploads/2019/09/slider-thumb.png")
                    center no-repeat;
                    background-size: 50%;
                    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4);
                    cursor: grab;
                    
                    &:active {
                    cursor: grabbing;
                    }
                }
            }
        }
    }
    @media (max-width: 1600px) {
        width: 65%;
    }
    @media (max-width: 1500px) {
        .get-group-wrapper {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            div {
                margin-bottom: 1rem;
            }
        }
    }
    @media (max-width: 970px) {
        .welcome {
            width: 100%;
        }
    }
    @media (max-width: 550px) {
        width: 80%;
        .get-group-wrapper {
            div {
                width: 25rem;
            }
        } 
    }

    @media (max-width: 450px) {
        width: 90%;
        .get-group-wrapper {
            div {
                width: 20rem;
            }
        }
    }
`

export default MeetHome;