import React, { useState } from 'react';

// Router
import { useParams } from 'react-router-dom';

// gql
import { useQuery } from '@apollo/react-hooks';
import { GET_GROUP } from '../../utils/queries';

const GroupHome = () => {
    const [isMember, setIsMemeber] = useState(false);

    // Get the groupName from params
    let { groupName } = useParams();
    // use query to get the groups data
    const { loading, data } = useQuery(GET_GROUP, {
        variables: {group_url: groupName}
    });    
    
    console.log(data)

    return (
        <h2>Group Home</h2>
    )
};

export default GroupHome;