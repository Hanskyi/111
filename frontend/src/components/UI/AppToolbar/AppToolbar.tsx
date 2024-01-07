import React from 'react';
import AnonymousMenu from './AnonymousMenu';
import { Slide } from 'react-awesome-reveal';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../containers/User/userSlice';
import UserMenu from './UserMenu';



const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <header className='header'>
      <Slide>
        <div>
          {user ? <UserMenu user={user}/> : <AnonymousMenu/>}
        </div>
      </Slide>

    </header>
  );
};

export default AppToolbar;