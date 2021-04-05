import React, { useState, useEffect } from 'react';

// Router
import { useParams } from 'react-router-dom';

// gql
import { useQuery } from '@apollo/react-hooks';
import { GET_GROUP } from '../../utils/queries';

import Auth from '../../utils/auth';

const GroupHome = () => {
    const [isMember, setIsMemeber] = useState(false);

    // Get the groupName from params
    let { groupName } = useParams();
    // use query to get the groups data
    const { loading, data } = useQuery(GET_GROUP, {
        variables: {group_url: groupName}
    });    

    useEffect(() => {
        if(data) {
            const groupUsers = data.group.group_user;
            groupUsers.forEach(user => {
                const userid = Auth.getProfile().data.id;
                
                if(parseInt(user.id) === userid) {
                    console.log('yes')
                    setIsMemeber(true);
                } else {
                    setIsMemeber(false);
                    console.log('no')
                }
            })
        }
    }, [data])


    return (
        <h2>Group Home</h2>
    )
};

export default GroupHome;