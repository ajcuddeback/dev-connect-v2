import React, {useState, useEffect}from 'react';
import Comment from './Comment';
import ReactDOM from 'react-dom';
import './post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faComment, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {useQuery,useMutation} from '@apollo/react-hooks';
import {COMMENT_BY_POST, GET_POSTS} from  '../../utils/queries';
import {ADD_LIKE, REMOVE_LIKE, DELETE_POST} from '../../utils/mutations';
import Auth from '../../utils/auth';

import { useParams, Link, useHistory } from 'react-router-dom';



function Post({post}){
    const user = Auth.getProfile();

    // Font Awesome
    const like = <FontAwesomeIcon icon={faHeart} />
    const commentSymbol = <FontAwesomeIcon icon ={faComment} />
    const editPost = <FontAwesomeIcon icon ={faEdit} />
    const deletePostIcon = <FontAwesomeIcon icon ={faTrash} />
    

    //queries and mutations
    const {loading, data} = useQuery(COMMENT_BY_POST);
    // const {loadingPosts, posts} = useQuery(GET_POSTS);
    
    const { user_id, post_id } = useParams();
     const [addLike, {err}] = useMutation(ADD_LIKE);
   
    const [removeLike, {error}] = useMutation(REMOVE_LIKE);   
    const [deletePost,{deletePostErr}]= useMutation(DELETE_POST);

    const [liked, setLiked] = useState(false)
    
    // useEffect(()=>{
        
    //     console.log(user)
    //     if (liked_posts.username===user.username){
    //         setLiked(true);
    //     }else setLiked(false);
    // }, []);
    useEffect(() => {
        console.log('liked');
    }, [liked])

    if(loading) {
        return (
            <>
                <p>Comments Loading...</p>
                <div className="loader"></div>
            </>
        )
    }

    //Functions
    const handleDeleteClick = async () => {
        const postId = parseInt(post.id);
        try {
          await deletePost({
            variables: { post_id: postId }
          });
        } catch (e) {
          console.error(e);
        }
      };

      const handleEditClick = async () => {
        try {
          await deletePost({
            variables: { id: post.id }
          });
        } catch (e) {
          console.error(e);
        }
      };

      post.liked_posts.forEach((likedPost) => {
          if (likedPost.username === user.username) {
              setLiked(true)
          } 
      })

      const handleAddLike = async () => {
        const postId = parseInt(post.id);
        
        try {
            await addLike({
                variables: { post_id: postId }
            });

            setLiked(true)
          } catch (e) {
            console.error(e);
          }
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
                    {liked && <span>liked</span>}
                    <div onClick={handleAddLike}  className="postBottomLeft">
                        {/* <likeButton  user ={user}post ={post}/> */}
                        {like}
                    </div>
                    <div className="postBottomRight">
                        {/* { data.comments.map((comment) => (
                             <Comment key = {comment.id} comment={c}/>
                         ))} */}
                         <span className="comments">{commentSymbol}</span>
                         <span onClick = {handleEditClick} className="editPost" >{editPost}</span>
                         <span onClick ={handleDeleteClick} className="deletePost">{deletePostIcon}</span>
                                
                             

                         
                    </div>
                </div>
            </div>
            <div className="commentsByPost">
                <input type="text" className="reply" placeholder="Reply"/>

            </div>
           
                
        </div>
        
    )
}

export default Post;