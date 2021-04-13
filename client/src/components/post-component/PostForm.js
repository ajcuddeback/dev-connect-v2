import React from 'react';



function PostForm (){
    return (
        
            <form className= "new-post-form ">
                 <div className="input-group mb-3">
                     <input
                      type="text" className="form-control" name="post-content" placeholder="Write a post" aria-label="Write a post" aria-describedby="basic-addon2"
                      />
                     <div className="input-group-append">
                     <button id = "post-btn" className="btn btn-outline-secondary" type="button">Post</button>
                     </div>
                </div>
            </form>
       
    )

}

export default PostForm;
     
    

