import React from 'react';


function Post({post}){
    console.log(post);
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

export default Post;