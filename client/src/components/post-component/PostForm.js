import React from 'react';
import './post.css';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {CREATE_POST} from '../../utils/mutations';
import { useMutation } from '@apollo/client';



function PostForm (){
    //mutation
    const [createPost, {error}] = useMutation(CREATE_POST);

    //functions
    const handleAddPost = async event => {
        event.preventDefault();
      
        try {
          // add post to database
          await createPost({
            variables: { post_content }
          });
      
          // clear form value
          setText('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
      };





    const send = <FontAwesomeIcon icon={faPaperPlane} />
    return (
            <form className= "new-post-form ">
                 <input type="text" placeholder="Write a post..." name="post"/>
                 <button onClick = {handleAddPost} type="submit">{send}</button>
            </form>

       
    )

}

export default PostForm;
     
    

