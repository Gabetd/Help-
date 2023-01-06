import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <span id='logout' className='newButton' onClick={onLogout} placeholder="Logout">Logout</span>;
};

export default LogoutButton;
