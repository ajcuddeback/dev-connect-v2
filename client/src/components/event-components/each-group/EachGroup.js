import React from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_USER_GROUP } from '../../../utils/mutations';

const EachGroup = ({ group, setGroupFetchSuccess }) => {
    // gql
    const [addUserGroup, {err}] = useMutation(ADD_USER_GROUP);

    // Functions
    const joinGroupHandler = async (e) => {
        const id = parseInt(group.id)
        try {
            const response = await addUserGroup({
                variables: { group_id: id }
            });
            setGroupFetchSuccess(true);
        } catch (e) {
            console.log(e);
            setGroupFetchSuccess(false)
            setTimeout(() => {
                setGroupFetchSuccess(true)
            }, 3000)
        }
    }

    // JSX
    return (
        <>
            <div className="group-info">
                <p>{ group.group_title }</p>
                <p>{ group.group_text }</p>
                <p>Zip Code: { group.group_zip }</p>
                <p>Users: { group.users_count }</p>
            </div>
            <button onClick={joinGroupHandler} className="join-group" data-id={group.id}>Join {group.group_title}</button>
        </>
    )
};

export default EachGroup;