import React from 'react';

const EachMyEvents = ({ event }) => {


    // JSX
    return (
        <>
            <div class="event-wrapper">
                <div class="event-info-wrapper">
                    <h3>{event.event_title}</h3>
                </div>
            </div>
        </>
    )
};

export default EachMyEvents;