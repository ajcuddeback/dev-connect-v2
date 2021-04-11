import REACT from 'react';

import {useQuery} from '@apollo/react-hooks';
import {GET_POSTS} from  '../../utils/queries';

const {loading, data} = useQuery(GET_POSTS);
    if (data){

    }

 function Home(){
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
export default Home;