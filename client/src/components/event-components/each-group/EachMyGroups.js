import React from 'react';

import { Link } from 'react-router-dom';

const EachMyGroups = ({ group }) => {


    // JSX
    return (
        <>
            <div class="group-wrapper glass-background">
                <div class="group-info-wrapper">
                    <h3>{group.group_title}</h3>
                </div>
                <div class="group-button-wrapper">
                    <Link className="glass-button" to={`/meet/groups/${group.group_url}`}>Go to {group.group_title}'s homepage.</Link>
                </div>
            </div>
        </>
    )
};

export default EachMyGroups;