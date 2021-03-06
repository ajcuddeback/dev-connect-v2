import REACT from 'react';
import {GET_POST_BY_ID} from  '../../utils/queries';
import {useQuery} from '@apollo/react-hooks';

 function SingleUser(post){

    const {loading, data} = useQuery(GET_POST_BY_ID);
    console.log(data)

    if(loading) {
        return (
            <>
                <p>Posts Loading...</p>
                <div className="loader"></div>
            </>
        )
    }
    
   
    return(
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <span className="postUsername">{post.username}</span>
                        <span className="postDate">{}</span>
                    </div>
                </div>
                <div className="postCenter">{post.post_content}</div>
                <div className="postBottom">
                    <div className="postBottomLeft">{}</div>
                    <div className="postBottomRight">{}</div>
                </div>
            </div>
        </div>
    )


}
export default SingleUser;