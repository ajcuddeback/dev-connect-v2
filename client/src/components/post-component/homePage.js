import React from 'react';

import {useQuery} from '@apollo/react-hooks';
import {GET_POSTS} from  '../../utils/queries';
import PostForm from './PostForm';
import Post from './Post';

function Home(){

    const {loading, data} = useQuery(GET_POSTS);
    

    if(loading) {
        return (
            <>
                <p>Posts Loading...</p>
                <div className="loader"></div>
            </>
        )
    }

     return (
        <div className="homeWrapper">
            <div className="postWrapper">
                <PostForm/>
                {
                    data.posts.map((p) => (
                        <Post key = {p.id} post={p} posts = {data.posts}/>
                    ))
                }
            </div>
        </div>   
     )


}
export default Home;