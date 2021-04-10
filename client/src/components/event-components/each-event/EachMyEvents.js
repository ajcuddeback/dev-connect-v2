import React from 'react';

const EachMyEvents = ({ event }) => {


    // JSX
    return (
        <>
            <div className="event-wrapper glass-background">
                <div className="event-info-wrapper">
                    <h3>{event.event_title}</h3>
                </div>
            </div>
        </>
    )
};

export default EachMyEvents;