import React, { useState, useEffect } from 'react';

// gql
import { useQuery } from '@apollo/react-hooks';
import { GROUPS_BY_ZIP } from '../../utils/queries';

import EachGroup from './each-group/EachGroup';

const ZipGroups = ({ miles, zipCode }) => {

    const [groupData, setGroupData] = useState();

    console.log(parseInt(zipCode))

    const { loading, data } = useQuery(GROUPS_BY_ZIP, {
        variables: { group_zip: parseInt(zipCode), miles: miles }
    });

    useEffect (() => {
        if(data) {
            setGroupData(true);
            console.log(data)
        } else {
            setGroupData(false);
        }
    }, [data])
    

    // JSX
    return (
        <>
            <div className="hidden join-group-fail">
                <p>You are already part of this group</p>
            </div>

            {groupData ? (
                <section className="groups-near-user-wrapper">
                    <h2>Groups in your area: </h2>
                    <ol>
                        {data.groupByZip.map(group => (<EachGroup group={group} />))}
                    </ol>
                </section>
                
            ) : (
                <h2>There are no groups here!</h2>
            )}
        </>
    )
};

export default ZipGroups;