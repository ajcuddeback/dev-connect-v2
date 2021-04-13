import React from "react";

const Comment = () => {
  return (
    <StyledFormComment>
      <form class="comment-form">
        <div>
          <input class="ml-5" name="comment-text" placeholder="Write a Comment"/>
        </div>

        <div>
          <button class="" type="submit">
            Reply
          </button>
        </div>
      </form>
    </StyledFormComment>
  );
};
