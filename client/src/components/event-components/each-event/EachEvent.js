import React from 'react';

const EachEvent = ({ event }) => {
    // Functions
    const joinGroupHandler = async (e) => {
    }
    console.log(event)
    // JSX
    return (
        <>
            <h2>{event.event_title}</h2>
            <div class="meetup-info-wrapper">
                <div class="time-and-info">
                    <p>Meet up time: {event.event_time}</p>
                    <p>Meet up info: {event.event_text}</p>
                </div>
                <div class="location">
                    <p>Location: {event.event_location}</p>
                </div>
            </div>

            <button class="join-event-btn grey-red-btn" data-id={event.id}>Attending?</button>
        </>
    )
};

export default EachEvent;