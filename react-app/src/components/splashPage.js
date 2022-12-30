import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom'
import { getAllBusinessesThunk } from "../store/business";
import { getAllReviewsThunk } from "../store/review";


const Home = () => {
const history = useHistory()
const dispatch = useDispatch()
const user = useSelector(state => state.session.user)
const businesses = useSelector(state => state.business.allBusinesses)

useEffect(() => {
  dispatch(getAllBusinessesThunk())
  dispatch(getAllReviewsThunk())
}, [dispatch])

// if(!businesses){
//   return null
// }
  console.log('this is ',businesses)
  return(
    <div>
      {user ?
      <button onClick={() => history.push('/business/add')}>Add a Business to Help!</button>

      :
    <button>Log In</button>}
      <h1>WELCOME TO HELP!</h1>
      {Object.values(businesses).map(biz => (
        <div key={biz.id}>
          <NavLink to={`/business/${biz.id}`}>
          <h2>image goes here</h2>
          <p>{biz.business_name}</p>
          <p>{biz.street_address} {biz.city} {biz.state}</p>
          <p>{biz.description}</p>
          </NavLink>
          {user?
          <button>Add a Review</button>
        :
          <button>add review</button>
        }
        </div>
       ))}
    </div>
  )
}
export default Home;
