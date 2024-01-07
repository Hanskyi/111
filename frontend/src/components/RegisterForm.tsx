import React, { useState } from 'react';
import { fetchRegister } from '../containers/User/userThunk';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectRegisterError, selectUserLoading } from '../containers/User/userSlice';
import { useNavigate } from 'react-router-dom';
import { IRegister } from '../type';
import { useSelector } from 'react-redux';
import BtnSpinner from './Spinner/BtnSpinner';

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const registerLoading = useSelector(selectUserLoading);
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const [state, setState] = useState<IRegister>({
    username: '',
    password: ''
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const onSubmitEventHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(fetchRegister(state)).unwrap();
      alert('Congrats! You\'ve been registered!');
      navigate('/');
    } catch (e) {
      alert('Something is wrong!')
    } finally {
      setState(() => ({
        username: '',
        password: ''
      }));
    }
  };

  const getFieldError = (name: string) => {
    try {
      return error?.errors[name].message;
    } catch (e) {
      return undefined;
    }
  };
  return (
    <form className="form" onSubmit={onSubmitEventHandler}>
        <div>
          <div className="input-wrap">
            <label className="form-label"> Your name:</label>
            {
              Boolean(getFieldError('username')) &&
              <span className="error">{getFieldError('username')}</span>
            }
            <input
              className={Boolean(getFieldError('username')) ? 'form-control-error' : 'form-control'}
              name="username"
              type="text"
              onChange={changeEventHandler}
            />
          </div>

          <div className="input-wrap">
            <label className="form-label"> Password:</label>
            {
              Boolean(getFieldError('password')) &&
              <span className="error">{getFieldError('password')}</span>
            }
            <input
              className={Boolean(getFieldError('password')) ? 'form-control-error' : 'form-control'}
              name="password"
              type="password"
              onChange={changeEventHandler}
            />
          </div>
          <div className="input-wrap">
            <button
              type="submit"
              className="form-btn"
              disabled={registerLoading}
            >
              {registerLoading && <BtnSpinner/>}
              Register
            </button>
          </div>
        </div>
    </form>
  );
};

export default RegisterForm;