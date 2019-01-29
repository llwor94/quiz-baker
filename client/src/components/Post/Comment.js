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
        <div>

          <p>
            <UserName>
              <strong>{comment.author}</strong> said:{" "}
            </UserName>
            {comment.text}
          </p>
        </div>
        <span>{moment(comment.created_at).fromNow()}</span>
        </CommentBody>
        {user && user.username === comment.author && (
          <Button
            icon="pi pi-trash"
            white
            onClick={() => deleteComment(comment.id)}
          />
        )}
      </CommentHeader>
    </Wrapper>
  );
};

export default Comment;
