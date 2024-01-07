import React, { useState } from 'react';
import { ILogin } from '../type';
import { useAppDispatch } from '../app/hooks';
import { useSelector } from 'react-redux';
import { selectLoginError, selectLoginLoading } from '../containers/User/userSlice';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../containers/User/userThunk';
import BtnSpinner from './Spinner/BtnSpinner';

const LoginForm = () => {
  const loginLoading = useSelector(selectLoginLoading);
  const [state, setState] = useState<ILogin>({
    username: '',
    password: ''
  });
  const dispatch = useAppDispatch();
  const error = useSelector(selectLoginError);
  const navigate = useNavigate();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(fetchLogin(state)).unwrap();
      navigate('/');
    } catch (e) {
      alert('Something is wrong!');
    } finally {
      setState(() => ({
        username: '',
        password: ''
      }));
    }
  };

  return (
    <form className="form" onSubmit={submitFormHandler}>
        <div>
          <div className="input-wrap">
            <label htmlFor="username" className="form-label">Your name:</label>
            {
              error ?   <span className="error">{error.error}</span> : null
            }
            <input
              type="text"
              className={error ? 'form-control-error' : 'form-control'}
              name="username"
              id="username"
              value={state.username}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="password" className="form-label">Password:</label>
            {
              error ?   <span className="error">{error.error}</span> : null
            }
            <input
              type="text"
              className={error ? 'form-control-error' : 'form-control'}
              name="password"
              id="password"
              value={state.password}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="input-wrap">
            <button
              type="submit"
              className="form-btn"
              disabled={loginLoading}
            >
              {loginLoading && <BtnSpinner/>}
              Log in
            </button>
          </div>
        </div>
    </form>
  );
};

export default LoginForm;