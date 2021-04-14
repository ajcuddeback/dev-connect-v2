import React from 'react';
import Comment from './Comment';
import ReactDOM from 'react-dom';
import './post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faComment, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {useQuery} from '@apollo/react-hooks';
import {COMMENT_BY_POST} from  '../../utils/queries';



function Post({post}){
    const like = <FontAwesomeIcon icon={faHeart} />
    const commentSymbol = <FontAwesomeIcon icon ={faComment} />
    const editPost = <FontAwesomeIcon icon ={faEdit} />
    const deletePost = <FontAwesomeIcon icon ={faTrash} />
    const {loading, data} = useQuery(COMMENT_BY_POST);
    console.log(data)
    if(loading) {
        return (
            <>
                <p>Comments Loading...</p>
                <div className="loader"></div>
            </>
        )
    }
    return(
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <span className="postUsername">{post.user.username}</span>
                        <span className="postDate">{}</span>
                    </div>
                </div>
                <div className="postCenter">{post.post_content}</div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {like}
                    </div>
                    <div className="postBottomRight">{
                        commentSymbol   

                        //  data.comments.map((comment) => (
                        //     <Comment key = {comment.id} comment={c}/>
                        // ))

                    }{ editPost}{deletePost}</div>
                </div>
            </div>
            <div className="commentsByPost">
                <input type="text" className="reply" placeholder="Reply"/>

            </div>
           
                
        </div>
        
    )
}

export default Post;