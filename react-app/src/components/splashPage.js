import React, { useEffect, useState } from "react";
import { startTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom'
import { getAllBusinessesThunk } from "../store/business";
import { getAllReviewsThunk } from "../store/review";
import { resetReview } from "../store/review";
import './omega.css'

const Home = () => {
const history = useHistory()
const dispatch = useDispatch()
const user = useSelector(state => state.session.user)
const businesses = useSelector(state => state.business.allBusinesses)
const reviews = useSelector(state => state.reviews.allReviews)

useEffect(() => {
  dispatch(resetReview())
  dispatch(getAllBusinessesThunk())
  dispatch(getAllReviewsThunk())
}, [dispatch])

// if(!businesses){
//   return null
// }

const stars = (num) => {
  if (num === 5){
  return (<div>⭐⭐⭐⭐⭐</div>)}else if (num === 4){
  return (<div>⭐⭐⭐⭐</div>)}else if (num === 3){
  return (<div>⭐⭐⭐</div>)}else if (num === 2){
  return (<div>⭐⭐</div>)}else if (num === 1){
  return (<div>⭐</div>)}
}

const aveRating = (num) => {
  if (num > 4.5 ){
  return (<div>⭐⭐⭐⭐⭐</div>)}else if (num >= 4){
  // return (<div>⭐⭐⭐⭐</div>)}else if (num > 3.5){
  return (<div>⭐⭐⭐⭐</div>)}else if (num >= 3){
  // return (<div>⭐⭐⭐</div>)}else if (num > 2.5){
  return (<div>⭐⭐⭐</div>)}else if (num >= 2){
  // return (<div>⭐⭐</div>)}else if (num > 1.5){
  return (<div>⭐⭐</div>)}else if (num >= 1){
  return (<div>⭐</div>)}
  else return (<></>)
}

const average = (arr) => {
  let len = arr.length
  if(len === 0){return 'No Reviews :('}
  let sum = 0
  for (let i = 0; i < len; i++){sum += arr[i].stars}
  return `${sum/len}`}

  console.log('this is ',businesses)
  return(
    <div>
      {user ?
      <></>
      :
    <></>}
      {/* <img className="cycleimgsplash" src="https://s3-media0.fl.yelpcdn.com/educatorphoto/ccPzYQQGD-GXSUadmL3SPw/o.jpg" /> */}
      <img className="cycleimgsplash" src="https://s3-media0.fl.yelpcdn.com/educatorphoto/IJElscsPxKRiQJFwUADA-w/o.jpg"/>
      {/* <img className="cycleimgsplash" src="https://s3-media0.fl.yelpcdn.com/educatorphoto/xL0l_4tg4DdhuHT9S-Kt_w/o.jpg"/> */}
      <h1 className="welcomeSplash" >WELCOME TO HELP!</h1>
      <div className="Businessouterhousing">
      <div className="businesseshousingsplash">

      {Object.values(businesses).map(biz => (
        <div className='LittleBusiness' key={biz.id}>
          <img className="businessImgSplashPage" src={biz.preview_img} />
          <div className="spacerforbusiness">
          <NavLink to={`/business/${biz.id}`}>
          <p>{biz.business_name}</p>
          </NavLink>
          <p className="work-for-not-against">{aveRating(average(biz.rating))}{average(biz.rating)}</p>
          </div>
          {/* <p>{biz.street_address} {biz.city} {biz.state}</p>
          <p>{biz.description}</p> */}
          {user?
          <div>

          </div>
          :
          <></>
        }
        </div>
       ))}
         </div>
         </div>
         <h2 id="revHeading">Reviews</h2>
         <div className="revOuterHousing">
       <div className="revhousingsplash">

        {Object.values(reviews).map(rev => (
          <div key={rev.id} className='container-basic'>
            {/* <h2>User Info Here</h2> */}
            <div className="reviewinfo">
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
          </div>
        ))}
       </div>
       </div>
    </div>
  )
}
export default Home;
