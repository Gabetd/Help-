
import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import LogoutButton from './auth/LogoutButton';
import { resetReview } from '../store/review';
import logo from './logo/logo.png'


const NavBar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const User = useSelector(state => state.session.user)

  const restore = () =>{
    dispatch(resetReview())
  }
  return (
    <nav>
      <div>

          {User ?
          <div className='navBar'>
            <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            <h2 className='HelpLogo' onClick={()=> restore()}>Help!</h2>
          </NavLink>
            </div>
            <div className='secondarynavstuff'>
            <button className="oldButton" onClick={() => history.push('/business/add')}>Add a Business!</button>
            <LogoutButton />
            </div>
          </div>:
          <div className='navBar'>
          <div>
        <NavLink to='/' exact={true} activeClassName='active'>
          <h2 className='HelpLogo'>Help!</h2>
        </NavLink>
          </div>
          <div className='secondarynavstuff'>
          <NavLink to='/login' exact={true} activeClassName='active'>
            <button className="oldButton">Login</button>
          </NavLink>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            <span className="newButtontwo">Sign Up</span>
          </NavLink>
          </div>
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
