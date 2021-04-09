import React from 'react';

// gql
import { useMutation } from '@apollo/react-hooks';
import { GET_ME_GROUPS } from '../../../utils/queries';
import { ADD_USER_GROUP } from '../../../utils/mutations';

import { useHistory } from 'react-router-dom';

const EachGroup = ({ group, setGroupFetchSuccess, groupFetchSuccess }) => {
    // gql
    const [addUserGroup, {err}] = useMutation(ADD_USER_GROUP);

    const history = useHistory();

    // Functions
    const joinGroupHandler = async (e) => {
        const id = parseInt(group.id)
        try {
            const response = await addUserGroup({
                variables: { group_id: id },
                refetchQueries: [{
                    query: GET_ME_GROUPS
                }]
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
            <div className="group-info glass-background">
                <p>{ group.group_title }</p>
                <p>{ group.group_text }</p>
                <p>Zip Code: { group.group_zip }</p>
                <p>Users: { group.users_count }</p>
                <button onClick={joinGroupHandler} className="join-group glass-button" data-id={group.id}>Join {group.group_title}</button>
            </div>
            
        </>
    )
};

export default EachGroup;