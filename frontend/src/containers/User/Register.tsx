import React from 'react';
import AppToolbar from '../../components/UI/AppToolbar/AppToolbar';
import { Slide } from 'react-awesome-reveal';
import RegisterForm from '../../components/RegisterForm';

const Register = () => {
  return (
    <>
      <AppToolbar/>
      <div className="main">
        <Slide>
          <h1 className='titles'>Registration</h1>
          <div className="hr"></div>
          <RegisterForm/>
        </Slide>

      </div>
    </>
  );
};

export default Register;