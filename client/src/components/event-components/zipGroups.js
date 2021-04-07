import React, { useState, useEffect } from 'react';
// gql
import { useQuery } from '@apollo/react-hooks';
import { GROUPS_BY_ZIP } from '../../utils/queries';

import EachGroup from './each-group/EachGroup';

// styled comp
import styled from 'styled-components';

const ZipGroups = ({ miles, zipCode }) => {

    // State
    const [groupData, setGroupData] = useState();
    const [groupFetchSuccess, setGroupFetchSuccess] = useState(true);
    console.log(zipCode, miles)

    // Query groups by zipcode
    const { loading, data } = useQuery(GROUPS_BY_ZIP, {
        variables: { group_zip: parseInt(zipCode), miles: miles }
    });

    // use Effect for setting group data
    useEffect (() => {
        if(data?.groupByZip.length > 0) {
            setGroupData(true);
        } else {
            setGroupData(false);
        }
    }, [data])
    

    // JSX
    if(loading) {
        return (
        <StyledLoader>
            <h2>Loading...</h2>
            <div className="loader"></div>
        </StyledLoader>
        )
    }

    return (
        <StyledGroupsZip>
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
                    <h2>There are no groups in your area!</h2>
                )}
            </StyledGroupsZip>
    )        
};

const StyledLoader = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const StyledGroupsZip = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    text-align: center;
    .join-group-fail {
        position: fixed;
        background-color: red;
        color:white;
        padding: 1rem;
        z-index: 999;
    }
    .group-info {
        width: 20rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        padding: 1rem;
        text-align: center;
        div {
            a {
                margin-top: 1rem;
                padding: 3px;
            }
        }
    }
`

export default ZipGroups;