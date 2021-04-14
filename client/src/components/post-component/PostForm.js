import React from 'react';
import './post.css';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';



function PostForm (){
    const send = <FontAwesomeIcon icon={faPaperPlane} />
    return (
            <form className= "new-post-form ">
                 <input type="text" placeholder="Write a post..." name="post"/>
                 <button type="submit">{send}</button>
            </form>

       
    )

}

export default PostForm;
     
    

