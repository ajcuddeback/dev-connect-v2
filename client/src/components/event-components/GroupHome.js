import React, { useState, useEffect } from 'react';

// Router
import { useParams } from 'react-router-dom';

// gql
import { useQuery } from '@apollo/react-hooks';
import { GET_GROUP } from '../../utils/queries';

import Auth from '../../utils/auth';

import { Link } from 'react-router-dom';

const GroupHome = () => {
    const [isMember, setIsMemeber] = useState(false);
    const [isAttending, setIsAttending] = useState({});
    const [dataGroup, setDataGroup] = useState(false);

    // Get the groupName from params
    let { groupName } = useParams();
    // use query to get the groups data
    const { loading, data } = useQuery(GET_GROUP, {
        variables: {group_url: groupName}
    });    

    useEffect(() => {
        if(data) {
            if(data.group === null) {
                return;
            }
            const groupUsers = data.group.group_user;
            groupUsers.forEach(user => {
                const userid = Auth.getProfile().data.id;
                
                if(parseInt(user.id) === userid) {
                    setIsMemeber(true);
                } else {
                    setIsMemeber(false);
                }
            });
            setDataGroup(true);
        }
    }, [data])

    if(loading) {
        return (
            <h2>Loading...</h2>
        )
    };

    if(dataGroup === false) {
        return(
            <h2>No group exists at this url! Go back to the <Link to={`/meet`}>events page</Link>  to find a group in your area!</h2>
        )
    }

    return (
        <>
            <h2>Group Home</h2>
            <div className=" hidden attend-event-success">
                <p>You are now successfully attending this event!</p>
            </div>
            <div className="hidden attend-event-fail">
                <p>You are already attending this event!</p>
            </div>

            <section className="group-content-wrapper">
                <div className="group-info-wrapper">
                    <h2 className="group-name">{data.group.group_title}</h2>
                    <p></p>
                </div>
                <div className="group-event-wrapper">
                    <ol>
                        <li>
                           
                        </li>
                    </ol>
                </div>
            </section>
        </>
    )
};

export default GroupHome;