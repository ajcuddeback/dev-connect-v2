import REACT from 'react';

import {useQuery} from '@apollo/react-hooks';
import {GET_POST_BY_ID} from  '../../utils/queries';



 function SingleUser(){

    const {loading, data: {getPostByID, posts}} = useQuery(GET_POST_BY_ID);
    console.log(posts, getPostByID);
   
     return (
         <div className="solo-post">
             {
                 loading ? (
                     <h1>loading posts...</h1>
                 ) : (
                     <p>Posts</p>
                    //posts && posts.map(post)
                 )
             }

         </div>
     )


}
export default SingleUser;