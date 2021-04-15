import React from 'react';

import {useQuery} from '@apollo/react-hooks';
import {GET_POST_BY_ID} from  '../../utils/queries';
import Dashboard from './Dashboard';

const userPage = ()=>{
    return (
        <div className="userPageWrapper">
            <div className="userPostWrapper">
                
                {
                    data.posts.map((p) => (
                        <Dashboard key = {p.id} post={p}/>
                    ))
                }
            </div>
        </div>   
     )
}
