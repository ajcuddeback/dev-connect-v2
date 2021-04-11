import React from 'react';




     
    return (
        <StyledFormPost>
            <form class = "new-post-form ">
                 <div class="input-group mb-3">
                     <input
                      type="text" class="form-control" name="post-content" placeholder="Write a post" aria-label="Write a post" aria-describedby="basic-addon2"
                      />
                     <div class="input-group-append">
                     <button id = "post-btn" class="btn btn-outline-secondary" type="button">Post</button>
                     </div>
                </div>
            </form>
        </StyledFormPost>
    )

