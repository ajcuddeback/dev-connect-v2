import React from 'react';

import {useQuery} from '@apollo/react-hooks';
import {GET_POSTS} from  '../../utils/queries';
import PostForm from './PostForm';
import Post from './Post';

function Home(){

    const {data} = useQuery(GET_POSTS);
    console.log(data)

     return (
        <div className="homeWrapper">
            <div className="postWrapper">
                <PostForm/>
                {
                    // this.data.map((p) => (
                    //     <Post key = {p.id} post={p}/>
                    // ))
                }

            </div>
        </div>   
     )


}
export default Home;