import React, { useContext } from "react";
import {
  Wrapper,
  CommentHeader,
  UserName,
  CommentBody
} from "../../Styles/Comments/Comment";
import { ProfileIcon } from "../../Styles/Components/Image";
import { AuthCtx } from "../../Auth";
import { Button } from "../../Styles/Components/Button";
import moment from "moment";

const Comment = ({ comment, deleteComment }) => {
  const { user } = useContext(AuthCtx);
  return (
    <Wrapper>
      <CommentHeader>
        <ProfileIcon src={comment.author_img} />
        <CommentBody>
          <p>{comment.text}</p>
        </CommentBody>
      {user && user.username === comment.author && (
        <Button
          icon="pi pi-trash"
          white
          onClick={() => deleteComment(comment.id)}
        />
      )}
      </CommentHeader>
      <div>
        <UserName>{comment.author}</UserName>
        <span style={{ padding: "0 3px" }}>&#8226;</span>
        <span>{moment(comment.created_at).fromNow()}</span>
      </div>
    </Wrapper>
  );
};

export default Comment;
