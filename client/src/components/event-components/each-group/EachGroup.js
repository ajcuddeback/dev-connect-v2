import React from 'react';

// gql
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER_GROUP } from '../../../utils/mutations';

import { useHistory } from 'react-router-dom';

const EachGroup = ({ group, setGroupFetchSuccess }) => {
    // gql
    const [addUserGroup, {err}] = useMutation(ADD_USER_GROUP);

    const history = useHistory();

    // Functions
    const joinGroupHandler = async (e) => {
        const id = parseInt(group.id)
        try {
            const response = await addUserGroup({
                variables: { group_id: id }
            });
            setGroupFetchSuccess(true);
            history.push(`/meet/groups/${group.group_url}`);
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