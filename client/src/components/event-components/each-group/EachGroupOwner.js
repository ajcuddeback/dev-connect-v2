import React from 'react';

import { Link } from 'react-router-dom';

const EachGroupOwner = ({ group }) => {


    // JSX
    return (
        <>
            <div className="group-wrapper glass-background">
                <div className="group-info-wrapper">
                    <h3>{group.group_title}</h3>
                </div>
                <div className="group-button-wrapper">
                    <Link className="glass-button" to={`/meet/admin/${group.group_url}`}>Manage Group</Link>
                </div>
            </div>
        </>
    )
};

export default EachGroupOwner;