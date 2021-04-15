import React,{useState} from 'react';
import './post.css';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {CREATE_POST} from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import {GET_POSTS} from '../../utils/queries';



function PostForm (){
    //mutation
    const [createPost, {error}] = useMutation(CREATE_POST,{
        refetchQueries: [{
            query:GET_POSTS
        }]
    });
    const [message, setMessage] = useState('')

    //functions
    const handleAddPost = async event => {
        event.preventDefault();      
        try {
          // add post to database
          await createPost({
            variables: { post_content: message }
           
          });
          setMessage('')
      
          
        } catch (e) {
          console.error(e);
        }
      };

      const handleMessageChange = event => {
        setMessage(event.target.value);
      }





    const send = <FontAwesomeIcon icon={faPaperPlane} />
    return (
            <form className= "new-post-form ">
                 <input onChange={(e) => handleMessageChange(e)} type="text" placeholder="Write a post..." name="post" value ={message}/>
                 <button onClick = {handleAddPost} type="submit">{send}</button>
            </form>

       
    )

}

export default PostForm;
     
    

