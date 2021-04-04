import React, { useState, useEffect } from 'react';

// gql
import { useQuery } from '@apollo/react-hooks';
import { GROUPS_BY_ZIP } from '../../utils/queries';

import EachGroup from './each-group/EachGroup';

const ZipGroups = ({ miles, zipCode }) => {

    // State
    const [groupData, setGroupData] = useState();
    const [groupFetchSuccess, setGroupFetchSuccess] = useState(true);

    // Query groups by zipcode
    const { loading, data } = useQuery(GROUPS_BY_ZIP, {
        variables: { group_zip: parseInt(zipCode), miles: miles }
    });

    // use Effect for setting group data
    useEffect (() => {
        if(data) {
            setGroupData(true);
        } else {
            setGroupData(false);
        }
    }, [data])
    

    // JSX
    if(loading) {
        return <h2>Loading...</h2>
    }

    return (
        <>
                {!groupFetchSuccess ? (
                    <div className="hidden join-group-fail">
                        <p>You are already part of this group</p>
                    </div>
                ): (
                    <p></p>
                )}
                

                {groupData ? (
                    <section className="groups-near-user-wrapper">
                        <h2>Groups in your area: </h2>
                        <ol>
                            {data.groupByZip.map(group => (<EachGroup group={group} setGroupFetchSuccess={setGroupFetchSuccess} />))}
                        </ol>
                    </section>
                    
                ) : (
                    <h2>There are no groups here!</h2>
                )}
            </>
    )        
};

export default ZipGroups;