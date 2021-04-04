import React from 'react';

const EachGroup = ({ group }) => {
    return (
        <>
            <div className="group-info">
                <p>{ group.group_title }</p>
                <p>{ group.group_text }</p>
                <p>Zip Code: { group.group_zip }</p>
                <p>Users: { group.users_count }</p>
            </div>
            <button className="join-group" data-id={group.id}>Join {group.group_title}</button>
        </>
    )
};

export default EachGroup;