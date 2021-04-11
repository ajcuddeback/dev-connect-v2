import REACT from 'react';

import {useQuery} from '@apollo/react-hooks';
import {GET_POST_BY_ID} from  '../../utils/queries';

const {loading, data} = useQuery(GET_POST_BY_ID);
    if (data){

    }

 function SingleUser(){
     return (
         <div className="solo-post">
             {
                 loading ? (
                     <h1>loading posts...</h1>
                 ) : (
                     posts && posts.map(post)
                 )
             }

         </div>
     )


}
export default SingleUser;