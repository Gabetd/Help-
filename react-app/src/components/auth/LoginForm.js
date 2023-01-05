import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import { getAllBusinessesThunk } from '../../store/business';
import '../omega.css'
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    dispatch(getAllBusinessesThunk())
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}>
      <div className='AuthTop'>
      <NavLink to='/' exact={true} activeClassName='active'>
        <h1 className='HelpLogo'> HELP! </h1>
      </NavLink>
      </div>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='AuthContainer'>
        <div className='AuthInfo'>


        {/* <label htmlFor='email'>Email</label> */}
        <input
          className='AuthInput'
          // name='email'
          // type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />

        {/* <label htmlFor='password'>Password</label> */}
        <input
          className='AuthInput'
          // name='password'
          // type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <span className='newButton' onClick={() => {dispatch(login('demo@aa.io', 'password'))}}
        >Login as Demo User</span>
        <span className='newButton' type='submit'>Login</span>
      </div>
      <div className='AuthImg'>
        <img src='https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png'/>
      </div>
      </div>
    </form>
  );
};

export default LoginForm;
