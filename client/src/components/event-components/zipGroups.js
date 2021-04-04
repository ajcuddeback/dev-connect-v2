import React, { useState, useEffect } from 'react';

// gql
import { useQuery } from '@apollo/react-hooks';
import { GROUPS_BY_ZIP } from '../../utils/queries';

const ZipGroups = ({ miles, zipCode }) => {

    console.log(parseInt(zipCode))

    const { loading, data } = useQuery(GROUPS_BY_ZIP, {
        variables: { group_zip: parseInt(zipCode), miles: miles }
    });

    useEffect (() => {
        if(data) {
            console.log(data)
        }
    }, [data])
    

    // JSX
    return (
        <>
            <div className="hidden join-group-fail">
                <p>You are already part of this group</p>
            </div>
        </>
    )
};

export default ZipGroups;