import React,{useState} from 'react';
import './post.css';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {CREATE_POST} from '../../utils/mutations';
import { useMutation } from '@apollo/client';



function PostForm (){
    //mutation
    const [createPost, {error}] = useMutation(CREATE_POST);
    const [message, setMessage] = useState('')

    //functions
    const handleAddPost = async event => {
        event.preventDefault();

        console.log(message)
      
        try {
          // add post to database
          await createPost({
            variables: { post_content: message }
          });
      
          // clear form value
          
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
                 <input onChange={(e) => handleMessageChange(e)} type="text" placeholder="Write a post..." name="post"/>
                 <button onClick = {handleAddPost} type="submit">{send}</button>
            </form>

       
    )

}

export default PostForm;
     
    

