import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import '../omega.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    // e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
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
        {/* <label>User Name</label> */}
        <input
        className='AuthInput'
          type='text'
          name='username'
          placeholder='username'
          onChange={updateUsername}
          value={username}
        ></input>
        {/* <label>Email</label> */}
        <input
        className='AuthInput'
          type='text'
          name='email'
          placeholder='email'
          onChange={updateEmail}
          value={email}
        ></input>

        {/* <label>Password</label> */}
        <input
        className='AuthInput'
          type='password'
          name='password'
          placeholder='password'
          onChange={updatePassword}
          value={password}
        ></input>

        {/* <label>Repeat Password</label> */}
        <input
        className='AuthInput'
          type='password'
          name='repeat_password'
          placeholder='repeat password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      <span className='newButton' onClick={() => onSignUp()} type='submit'>Sign Up</span>
      </div>
      <div className='AuthImg'>
        <img src='https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png'/>
      </div>
      </div>
    </form>
  );
};

export default SignUpForm;
