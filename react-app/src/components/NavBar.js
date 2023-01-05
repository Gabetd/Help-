
import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import {useSelector } from "react-redux";
import LogoutButton from './auth/LogoutButton';
import logo from './logo/logo.png'


const NavBar = () => {
  const history = useHistory()
  const User = useSelector(state => state.session.user)

  return (
    <nav>
      <div>

          {User ?
          <div className='navBar'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src={logo}/>
          </NavLink>
            <button onClick={() => history.push('/business/add')}>Add a Business to Help!</button>
            <LogoutButton />
          </div>:
          <div className='navBar'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src={logo}/>
          </NavLink>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
          </div>
          }

          {/* <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink> */}
      </div>
      {/* <ul>
        <li>
        </li>
        <li>
        </li>
        <li>
        </li>
        <li>
        </li>
      </ul> */}
    </nav>
  );
}

export default NavBar;
