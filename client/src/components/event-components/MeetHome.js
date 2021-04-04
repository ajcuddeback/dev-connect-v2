import React, { useState } from 'react';

import axios from 'axios'

const MeetHome = ({ miles, setMiles, zipCode, setZipCode }) => {

    // Functions
    const handleRange = (event) => {
        setMiles(event.target.value)
    };

    const handleZipChange = (e) => {
        setZipCode(e.target.value)
    };

    const findGroupHandler = (e) => {
        e.preventDefault();
    };

    const findGroupZipHandler = async () => {
        if(navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition(position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                const apiUrl = `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_GEOAPIKEY}&lat=${lat}&lon=${lon}&format=json`;
                axios.get(apiUrl).then(response => console.log(response.data.address.postcode));
            });
        } else {
            console.log("No location!")
        };
    };

    // JSX
    return (
        <>
            <section>
                <h2>Welcome to meetDevs</h2>
                <p>meetDevs is a great place to find groups for developers like you! Simply eneter your zip-code in the find 
                    group form below and pick a group that best fits you needs! Don't see a group in your area? Feel free to start one!
                </p>
            </section>
            <section className="get-group-wrapper">
                <div className="start-group-wrapper">
                    <form className="create-group-form">
                        <input type="text" name="group-name" className="group-name" placeholder="Name of your group" required />
                        <textarea name="about-group" id="about-group" cols="30" rows="10"
                            placeholder="What is your group about?" required></textarea>
                        <input type="number" name="zip" className="zip" placeholder="Zip Code" required />
                        <button type="submit" className="grey-red-btn">Create Group</button>
                    </form>
                </div>
                <div className="find-group-wrapper">
                    <h2>Find a group near you!</h2>
                    <form onSubmit={findGroupHandler} className="find-group-form">
                        <input type="range" className="mile-slider" max="150" min="10" value={miles} onChange={handleRange} />
                        <p>Within <span className="miles-nr">{miles}</span> miles</p>
                        <input onChange={handleZipChange} type="number" name="zip-code" placeholder="Zip Code" required />
                        <button type="submit" className="grey-red-btn">Find a group!</button>
                    </form>
                    <button className="use-location grey-red-btn" onClick={findGroupZipHandler}>Use your current location?</button>
                    </div>
            </section>
        </>
    )
};

export default MeetHome;