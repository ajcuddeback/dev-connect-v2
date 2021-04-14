import React from "react";

const Comment = (c) => {
  return (
    <div className="comment_content">
      <div className="comment_username">
        {
          c.username
        }
      </div>
      <div className="comment_date">
        {
          c.createdAt
        }
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