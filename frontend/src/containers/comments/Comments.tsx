import React, {useEffect} from 'react';
import {Slide} from "react-awesome-reveal";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchComments} from "./CommentsThunk";
import { selectComments, selectCommentsLoading } from './CommentsSlice';
import CommentItem from "../../components/CommentItem";
import {useParams} from "react-router-dom";
import CommentsForm from '../../components/CommentsForm';
import { selectUser } from '../User/userSlice';
import Spinner from '../../components/Spinner/Spinner';

const Comments = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectCommentsLoading);

  useEffect(() => {
        if(id) {
            dispatch(fetchComments(id));
        }
    }, [id, dispatch]);

  return (
      <>
        <div>
          <Slide>
            <div className="hr"></div>
          </Slide>
          <div className="comments">
            <h2 className="comments-title">Comments</h2>
              {user && <CommentsForm />}
            <ul className="comments-list">
              {isLoading ? (
                <Spinner />
              ) : (
                comments.length > 0 ? (
                  comments.map(comment => (
                    <CommentItem comment={comment} key={comment._id} />
                  ))
                ) : (
                  <p>No comments</p>
                ))
              }
            </ul>
          </div>
        </div>
      </>
  );
};

export default Comments;