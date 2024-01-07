import React, { useEffect, useState } from 'react';
import { ICommentMutation } from '../type';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { createComments, fetchComments } from '../containers/comments/CommentsThunk';
import { useSelector } from 'react-redux';
import { selectCreateCommentsLoading } from '../containers/comments/CommentsSlice';
import BtnSpinner from './Spinner/BtnSpinner';
import { selectUser } from '../containers/User/userSlice';

const CommentsForm = () => {
  const dispatch = useAppDispatch();
  const{id} = useParams();
  const createLoading = useSelector(selectCreateCommentsLoading);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const [state, setState] = useState<ICommentMutation>({
    description: '',
    postId: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);


  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState(prevState => {
      return {...prevState, [name]: value, postId: id!};
    });
  };
  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(createComments(state)).unwrap();
      if(id) {
        dispatch(fetchComments(id));
      }
    } catch (e) {
      alert('Something is wrong!');
    } finally {
      setState(() => ({
        description: '',
        postId: ''
      }));
    }
  };

  return (
    <form className="form comment-form" onSubmit={submitFormHandler}>
        <div>
          <div className="input-wrap">
            <label htmlFor="description" className="form-label">Write a comment:</label>
            <input
              name="description"
              type="text"
              id="description"
              value={state.description}
              onChange={inputChangeHandler}
              className="form-control"
            />
          </div>
          <div className="input-wrap">
            <button
              type="submit"
              className="form-btn"
              disabled={createLoading}
            >
              {createLoading && <BtnSpinner/>}
              Create
            </button>
          </div>
        </div>
    </form>
  );
};

export default CommentsForm;