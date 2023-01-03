import React, { useEffect, useState } from "react";
import { startTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom'
import { getAllBusinessesThunk } from "../store/business";
import { getAllReviewsThunk } from "../store/review";
import './omega.css'

const Home = () => {
const history = useHistory()
const dispatch = useDispatch()
const user = useSelector(state => state.session.user)
const businesses = useSelector(state => state.business.allBusinesses)
const reviews = useSelector(state => state.reviews.allReviews)

useEffect(() => {
  dispatch(getAllBusinessesThunk())
  dispatch(getAllReviewsThunk())
}, [dispatch])

// if(!businesses){
//   return null
// }

const stars = (num) => {
    if (num == 5){
    return (<div>⭐⭐⭐⭐⭐</div>)
    }else if (num == 4){
    return (<div>⭐⭐⭐⭐</div>)
    }else if (num == 3){
    return (<div>⭐⭐⭐</div>)
  }else if (num == 2){
    return (<div>⭐⭐</div>)
  }else if (num == 1){
    return (<div>⭐</div>)
  }
}

  console.log('this is ',businesses)
  return(
    <div>
      {user ?
      <button onClick={() => history.push('/business/add')}>Add a Business to Help!</button>

      :
    <button>Log In</button>}
      <h1>WELCOME TO HELP!</h1>
      <div className="businesseshousingsplash">

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
       <div className="revhousingsplash">
        {Object.values(reviews).map(rev => (
          <div key={rev.id} className='container-basic'>
            <h2>User Info Here</h2>
            <div className="user-review-info">
            <img className="pfp-review" src="https://media.istockphoto.com/id/1210939712/vector/user-icon-people-icon-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=vKDH9j7PPMN-AiUX8vsKlmOonwx7wjqdKiLge7PX1ZQ="/>
            <p>{rev.user.username}</p>
            </div>
            <NavLink to={`/business/${rev.business.id}`}>
            <p>{rev.business.business_name}</p>
            </NavLink>
            <div className="stars-review">
            {stars(rev.stars)}
            {/* <p>{rev.stars}</p> */}
            </div>
            <p>{rev.review}</p>
          </div>
        ))}
       </div>
    </div>
  )
}
export default Home;
