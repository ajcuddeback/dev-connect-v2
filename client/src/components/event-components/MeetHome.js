import React from 'react';

const MeetHome = () => {
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
                    <form class="create-group-form">
                        <input type="text" name="group-name" class="group-name" placeholder="Name of your group" />
                        <textarea name="about-group" id="about-group" cols="30" rows="10"
                            placeholder="What is your group about?"></textarea>
                        <input type="number" name="zip" class="zip" placeholder="Zip Code" />
                        <button type="submit" class="grey-red-btn">Create Group</button>
                    </form>
                </div>
                <div className="find-group-wrapper">
                    <h2>Find a group near you!</h2>
                    <form class="find-group-form">
                        <input type="range" class="mile-slider" max="150" min="10" value="20" />
                        <p>Within <span class="miles-nr">20</span> miles</p>
                        <input type="number" name="zip-code" placeholder="Zip Code" />
                        <button type="submit" class="grey-red-btn">Find a group!</button>
                    </form>
                    <button class="use-location grey-red-btn">Use your current location?</button>
                    </div>
            </section>
        </>
    )
};

export default MeetHome;