import React from 'react';
import {IUser} from "../../../type";
import { Link, useNavigate } from 'react-router-dom';
import logoHi from "../../../assets/images/icon.svg";
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../containers/User/userThunk';


interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    if(window.confirm('Do you want to logout?')) {
      dispatch(logout());
      navigate('/');
    }
  }

  return (
    <div className="header-inner">
      <Link to='/' className="logo">Forum</Link>
      <div className="header-username">
        <h2>Hello <span><img src={logoHi} alt="logo" className="hi-logo"/> ,</span>
            <div className="header-username">{user.username}!</div>
        </h2>
      </div>
      <Link to={'/add-post'} className="header-post">new post</Link>

      < div className="header-logout" onClick={handleLogout}>Logout</div>
    </div>
  );
};

export default UserMenu;