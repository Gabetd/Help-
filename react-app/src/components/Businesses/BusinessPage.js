import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from 'react-router-dom'
import { getAllBusinessesThunk } from "../../store/business";
import { getSingleBusinessThunk } from "../../store/business";
import { deleteBusinessThunk } from "../../store/business";
import { getAllReviewsByBusinessThunk } from "../../store/review";
import '../omega.css'

export default function SingleBusiness(){
  const history = useHistory()
  const dispatch = useDispatch()
  const User = useSelector(state => state.session.user)
  const business = useSelector(state => state.business.oneBusiness)
  const reviews = useSelector(state => state.reviews.business)
  const {businessId} = useParams()

  useEffect(() => {
    dispatch(getSingleBusinessThunk(businessId))
    dispatch(getAllReviewsByBusinessThunk(businessId))
}, [dispatch]);

const Remove = () => {
  dispatch(deleteBusinessThunk(businessId))
  dispatch(getAllBusinessesThunk())
  history.push('/')
}

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


return(
  <div>
    <p>{business.id}</p>
    <p>{business.business_name}</p>
    <p>{business.street_address} {business.city} {business.state}</p>
    <p>{business.description}</p>
    {User.id === business.owner_id?
    <div>
    <button onClick={() => history.push(`/business/${businessId}/edit`)}>Edit your business</button>
    <button onClick={() => Remove()}>Remove your business from Help</button>
    </div>
    :
    <button>Leave a review NOT WORKING ATM</button>
  }
         <div className="revhousingsplash">
        {Object.values(reviews).map(rev => (
          <div key={rev.id} className='container-basic'>
            <h2>User Info Here</h2>
            <div className="user-review-info">
            <img className="pfp-review" src="https://media.istockphoto.com/id/1210939712/vector/user-icon-people-icon-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=vKDH9j7PPMN-AiUX8vsKlmOonwx7wjqdKiLge7PX1ZQ="/>
            <p>{rev.user.username}</p>
            </div>
            {/* <p>{rev.business.business_name}</p> */}
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
