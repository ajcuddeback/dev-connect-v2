import React from 'react';

import { Link } from 'react-router-dom';

const EachGroupOwner = ({ group }) => {


    // JSX
    return (
        <>
            <div class="group-wrapper">
                <div class="group-info-wrapper">
                    <h3>{group.group_title}</h3>
                </div>
                <div class="group-button-wrapper">
                    <Link to={`/meet/admin/${group.group_url}`}>Manage Group</Link>
                </div>
            </div>
        </>
    )
};

export default EachGroupOwner;