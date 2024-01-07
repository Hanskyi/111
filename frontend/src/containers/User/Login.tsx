import React from 'react';
import AppToolbar from '../../components/UI/AppToolbar/AppToolbar';
import { Slide } from 'react-awesome-reveal';
import LoginForm from '../../components/LoginForm';

const Login = () => {
  return (
    <>
      <AppToolbar/>
      <div className="main">
        <Slide>
          <h1 className='titles'>Login</h1>
          <div className="hr"></div>
          <LoginForm/>
        </Slide>
      </div>
    </>
  );
};

export default Login;