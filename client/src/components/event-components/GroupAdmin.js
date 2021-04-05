import React, { useEffect, useState } from 'react';

// gql
import { useQuery } from '@apollo/react-hooks';
import { GET_GROUP, OWNER_GROUPS } from '../../utils/queries';

// Router
import { useParams, Link } from 'react-router-dom';

const GroupAdmin = () => {
    // State
    const [isAdmin, setIsAdmin] = useState(false);

    // gql
    const { groupName } = useParams();
    const { loading, data } = useQuery(GET_GROUP, {
        variables: { group_url: groupName }
    });
    const userData = useQuery(OWNER_GROUPS);

    useEffect(() => {
        if(userData.loading || loading) {
            return;
        };
        const myGroups = userData.data.myGroups;
        myGroups.map(group => {
            if(group.id === data.group.id) {
                setIsAdmin(true);
                return;
            }
        })
    }, [data, userData]);

    
   
    // JSX
    if(loading) {
        return (
            <h2>Loading...</h2>
        )
    }

    if(!isAdmin) {
        return (
            <h2>You are not the owner of this group! Please return back to the <Link to={`/meet`}>home page!</Link></h2>
        )
    }
    return (
        <>
            <h2>Admin</h2>
        </>
    )
};

export default GroupAdmin;