import React, {useState, useEffect}from 'react';
import Comment from './Comment';
import ReactDOM from 'react-dom';
import './post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faComment, faEdit, faTrash, faReply} from '@fortawesome/free-solid-svg-icons';
import {useQuery,useMutation} from '@apollo/react-hooks';
import {COMMENT_BY_POST, GET_POSTS} from  '../../utils/queries';
import {ADD_LIKE, REMOVE_LIKE, DELETE_POST, UPDATE_POST, CREATE_COMMENT} from '../../utils/mutations';
import Auth from '../../utils/auth';
import styled from 'styled-components';

import { useParams, Link, useHistory } from 'react-router-dom';



function Post({post, posts}){
    const [isLiked, setIsLiked] = useState({})
    
    
    const user = Auth.getProfile();

    // Font Awesome
    const like = <FontAwesomeIcon icon={faHeart} />
    const commentSymbol = <FontAwesomeIcon icon ={faComment} />
    const editPost = <FontAwesomeIcon icon ={faEdit} />
    const deletePostIcon = <FontAwesomeIcon icon ={faTrash} />
    const replyIcon = <FontAwesomeIcon icon = {faReply} />
    

    //queries and mutations

    const {loading, commentError, data } = useQuery(COMMENT_BY_POST,{
        variables:{post_id: parseInt(post.id)}
    });
    // const {loadingPosts, posts} = useQuery(GET_POSTS);
    
    const { user_id, post_id } = useParams();
     const [addLike, {err}] = useMutation(ADD_LIKE, {
        refetchQueries: [{
            query: GET_POSTS
        }]
    });
   
    const [removeLike, {error}] = useMutation(REMOVE_LIKE, {
        refetchQueries: [{
            query: GET_POSTS
        }]
    });   
    const [deletePost,{deletePostErr}]= useMutation(DELETE_POST,{
        refetchQueries: [{
            query: GET_POSTS
        }]
    });
    const [updatePost,{updatePostErr}]= useMutation(UPDATE_POST);
    const [createComment,{createCommentErr}]= useMutation(CREATE_COMMENT, {
        refetchQueries: [{
            query: GET_POSTS
        }]
    });

    const [message, setMessage] = useState('')

    useEffect(() => {
        let likedObj = {};
        posts.forEach(post => {
            if(post.liked_posts.id === user.data.id) {
                likedObj[post.id] = true;
            } else {
                likedObj[post.id] = false;
            }
        });
        setIsLiked(likedObj)
    }, [])

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
        const postId = parseInt(post.id);
        try {
          await updatePost({
            variables: { post_id: postId }
          });
        } catch (e) {
          console.error(e);
        }
      };

     

      const handleAddLike = async (id) => {
        
        const postId = parseInt(id)
        
        try {
            await addLike({
                variables: { post_id: postId }
            });

            
          } catch (e) {
            console.error(e);
          }
      };

      const handleRemoveLike = async (id) => {
        const postId = parseInt(id)
      
        
        try {
            await removeLike({
                variables: { post_id: postId }
            });

            
          } catch (e) {
            console.error(e);
          }
      };

      const handleReplyClick = async(event) => {
        
        event.preventDefault();      
        try {
          // add comment to database
          await createComment({
            variables: {comment_text: message, post_id:parseInt(post.id)}
          });
        } catch (e) {
          console.error(e);
        }
      };
      
      const handleMessageChange = event => {
        setMessage(event.target.value);
      };

      const toggleLike = (id)=>{
          const currentPost = posts.filter(post => post.id === id);
          const usersLiked = currentPost[0].liked_posts;
          console.log(usersLiked)
          let isLiked =  false;
          if(usersLiked) {
              
          usersLiked.forEach(like => {
             
            if(parseInt(like.id) === user.data.id) {
                console.log('we changing to true ')
                isLiked = true;
                
            } else {
                isLiked = false
            }
            
          })
        } 
            if (isLiked === true){
                handleRemoveLike(id)
          }else {  handleAddLike(id);}       
      }

     if(loading) {
        return (
            <>
                <p>Comments Loading...</p>
                <div className="loader"></div>
            </>
        )
    }

    return(
        <StyledPost className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <p className="postUsername">{post.user.username}</p>
                        <span className="postDate">{}</span>
                    </div>
                </div>
                <div className="postCenter">{post.post_content}</div>
                <div className="postBottom">
                    
                    <div onClick={() => toggleLike(post.id)}  className="postBottomLeft">
                        
                        {like}
                    </div>
                    <div className="postBottomRight">
                     
                         <span className="comments">{post.comments.length}{commentSymbol}</span>
                         <span onClick = {handleEditClick} className="editPost" >{editPost}</span>
                         <span onClick ={handleDeleteClick} className="deletePost">{deletePostIcon}</span>
                    </div>
                </div>
            </div>
            <div className="commentInput">
                <input onChange={(e) => handleMessageChange(e)} type="text" className="reply" placeholder="Reply"/>
                <span onClick = {handleReplyClick} className="replyIcon">{replyIcon}</span>

            </div>
          
             <div className="comments-by-post">
                  {
                    data.commentsByPost.map((c)=>(
                        <Comment key = {c.id} c={c} /> 
                    ))
                 }
            </div>

            
           
                
        </StyledPost>
        
    )
}

const StyledPost = styled.div`
p {
    font-size:1.5rem;
}
    .commentInput {
        input {
            width: 20rem;
        }

    }
    
`

export default Post;