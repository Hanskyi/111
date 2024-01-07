import React from 'react';
import { IComment } from '../type';
import { Zoom } from "react-awesome-reveal";


interface Props {
  comment: IComment,
}

const CommentItem: React.FC<Props> = ({comment}) => {
  return (
    <Zoom>
      <li className="comments-item">
        <p>{comment.description}</p>
        <p> <strong>Author:</strong>{comment.user.username}</p>
      </li>
    </Zoom>
  );
};

export default CommentItem;