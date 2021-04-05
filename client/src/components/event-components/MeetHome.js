import React, { useState } from 'react';
// Router
import { useHistory } from 'react-router-dom';

import axios from 'axios';

// gql
import { useMutation } from '@apollo/react-hooks';
import { CREATE_GROUP } from '../../utils/mutations';

const MeetHome = ({ miles, setMiles, setZipCode }) => {
    // State
    const [createGroupForm, setCreateGroupForm] = useState({group_title: '', group_url: '', group_text: '', group_zip: 0});

    // gql
    const [ createGroup, {err} ] = useMutation(CREATE_GROUP);

    // useHistory
    const history = useHistory();

    // Functions for creating a group
    const createGroupHandler = async (e) => {
        e.preventDefault();
        const groupUrl = createGroupForm.group_title.trim().toLowerCase().split(' ').join('-');
        setCreateGroupForm({ ...createGroupForm, ['group_url']: groupUrl });
        const group_title = createGroupForm.group_title;
        const group_url = createGroupForm.group_url;
        const group_text = createGroupForm.group_text;
        const group_zip = parseInt(createGroupForm.group_zip);
        
        try {
            const response = await createGroup({
                variables: {group_title: group_title, group_url: group_url, group_text: group_text, group_zip: group_zip}
            })
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

    const handleZipChange = (e) => {
        setZipCode(e.target.value)
    };

    const findGroupHandler = (e) => {
        e.preventDefault();

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
        <>
            <section>
                <h2>Welcome to meetDevs</h2>
                <p>meetDevs is a great place to find groups for developers like you! Simply eneter your zip-code in the find 
                    group form below and pick a group that best fits you needs! Don't see a group in your area? Feel free to start one!
                </p>
            </section>
            <section className="get-group-wrapper">
                <div className="start-group-wrapper">
                    <form onSubmit={createGroupHandler} className="create-group-form">
                        <input onChange={handleFormChange} type="text" name="group_title" className="group-name" placeholder="Name of your group" required />
                        <textarea onChange={handleFormChange} name="group_text" id="about-group" cols="30" rows="10"
                            placeholder="What is your group about?" required></textarea>
                        <input onChange={handleFormChange} type="number" name="group_zip" className="zip" placeholder="Zip Code" required />
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