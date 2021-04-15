import React from "react";
import './post.css';

const Comment = ({c}) => {
  console.log(c)
  return (
    <div className="comment_content">
      <div className="name-date">
      <div className="comment_username">
        {
          c.user.username
        }
      </div>
      <div className="comment_date">
        {
          c.createdAt
        }
      </div>
      </div>
      
      <div className="comment_text">
        {
          c.comment_text
        }
      </div>
    </div>

  );
};
export default Comment;