import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Home from './components/splashPage';
import CreateABusiness from './components/Businesses/Create/CreateBusinessModal';
import SingleBusiness from './components/Businesses/BusinessPage';
import EditABusiness from './components/Businesses/Edit/EditBusinessModal';
import CreateAReview from './components/Reviews/CreateReview';
import EditAReview from './components/Reviews/EditReview';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
      <Route path='/review/edit/:reviewId' exact={true}>
          <h2>Edit Review page</h2>
          <EditAReview/>
        </Route>
      <Route path='/review/add/:businessId' exact={true}>
        <h2>You are on create a review page</h2>
          <CreateAReview/>
        </Route>
      <Route path='/business/add' exact={true}>
          <CreateABusiness/>
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Home/>
        </Route>
        <Route path='/business/:businessId/edit'>
          <h2>EDIT PAGE</h2>
          <EditABusiness />
        </Route>
        <Route path='/business/:businessId'>
        <SingleBusiness />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
