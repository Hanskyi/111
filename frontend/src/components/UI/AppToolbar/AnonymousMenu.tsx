import React from 'react';
import { Link  } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <div className="header-inner">
      <Link to='/' className="logo">Forum</Link>
      <Link to={'/register'} className="header-register">Register</Link>

      <Link to={'/login'} className="header-login">Login</Link>
    </div>
  );
};

export default AnonymousMenu;