import React, { useEffect, useState } from 'react';
import { IPostMutation } from '../type';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import FileInput from './FileInput';
import { createPosts } from '../containers/Posts/postsThunk';
import { useSelector } from 'react-redux';
import { selectCreateLoading } from '../containers/Posts/postsSlice';
import BtnSpinner from './Spinner/BtnSpinner';
import { selectUser } from '../containers/User/userSlice';

const NewPostForm = () => {
  const createLoading = useSelector(selectCreateLoading);
  const user = useAppSelector(selectUser);
  const [state, setState] = useState<IPostMutation>({
    title: '',
    description: '',
    image: null
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);



  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.description && !state.image) {
      alert('Description and image cannot both be empty!');
      return;
    }
    try {
      await dispatch(createPosts(state)).unwrap();
      navigate('/');
    } catch (e) {
      alert('Something is wrong!');
    } finally {
      setState(() => ({
        title: '',
        description: '',
        image: null
      }));
    }
  };

  return (
    <form className="form" onSubmit={submitFormHandler}>
          <div className="input-wrap">
            <label htmlFor="title" className="form-label">Title:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              value={state.title}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              value={state.description}
              onChange={inputChangeHandler}
            />
          </div>
          <>
            <FileInput onChange={filesInputChangeHandler} name="image" label="Image" />
          </>
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
    </form>
  );
};

export default NewPostForm;
