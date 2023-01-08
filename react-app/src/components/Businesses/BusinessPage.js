import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from 'react-router-dom'
import { getAllBusinessesThunk } from "../../store/business";
import { getSingleBusinessThunk } from "../../store/business";
import { deleteBusinessThunk } from "../../store/business";
import { getAllReviewsByBusinessThunk } from "../../store/review";
import { deleteReviewThunk } from "../../store/review"
import '../omega.css'

export default function SingleBusiness(){
  const history = useHistory()
  const dispatch = useDispatch()
  const User = useSelector(state => state.session.user)
  const business = useSelector(state => state.business.oneBusiness)
  const owner = useSelector(state => state.business.oneBusiness.owner)
  const reviews = useSelector(state => state.reviews.business)
  // const [hasClicked, setHasClicked] = useState(false)
  const {businessId} = useParams()
  console.log('Owner =', owner)
  const ratings = business.rating || []
  useEffect(() => {
    dispatch(getSingleBusinessThunk(businessId))
    dispatch(getAllReviewsByBusinessThunk(businessId))

  }, [dispatch]);

const Remove = () => {
  dispatch(deleteBusinessThunk(businessId))
  dispatch(getAllBusinessesThunk())
  history.push('/')
}

const average = (arr) => {
  // console.log(arr)
  let len = arr.length
  if(len === 0){return ''}
  let sum = 0
  for (let i = 0; i < len; i++){sum += arr[i].stars}
  return aveRating(sum/len)}


  const stars = (num) => {
  if (num == 5){
  return (<div>⭐⭐⭐⭐⭐</div>)}else if (num == 4){
  return (<div>⭐⭐⭐⭐</div>)}else if (num == 3){
  return (<div>⭐⭐⭐</div>)}else if (num == 2){
  return (<div>⭐⭐</div>)}else if (num == 1){
  return (<div>⭐</div>)}
}

const aveRating = (num) => {
  console.log('num',num)
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

const deleteRev = (id) => {
  dispatch(deleteReviewThunk(id))
  dispatch(getAllReviewsByBusinessThunk(businessId))
  window.location.reload(false);
  // history.push(`/business/${businessId}`)
}

  console.log('reviews', reviews)
  let users = Object.values(reviews).map(rev => {
    return rev.user.id
  })
  console.log('users', users)
  let reviewed = (id) => {
    if(users.includes(User.id)){
      return (<></>)
    }else{
      return(<span className='newButton' onClick={() => history.push(`/review/add/${id}`)}>add a review</span>)
    }

  }


if(!owner){
  return (<></>)
}

if (User){return(
  <div className="businessPageHousingOuter">
    <div className="businessPageHousinginner">


    <h1 className="extra">{business.business_name}</h1>
    <p className="work-for-not-against">{average(ratings)} {ratings.length} reviews</p>
    <div>
    <div className="user-review-info bold">
    <img className="pfp-review" src="https://media.istockphoto.com/id/1210939712/vector/user-icon-people-icon-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=vKDH9j7PPMN-AiUX8vsKlmOonwx7wjqdKiLge7PX1ZQ="/>
    <h3>{owner.username} • {business.business_type}</h3>
    </div>
    {User.id === business.owner_id?
    <div>
    {/* <button onClick={() => history.push(`/business/${businessId}/edit`)}>Edit your business</button> */}
    <button onClick={() => Remove()}>Remove your business from Help</button>
    </div>
    :
      reviewed(business.id)
  }
      </div>
         <div className="revhousingsplash">
         {Object.values(reviews).map(rev => (
          <div key={rev.id} className='container-basic'>
            {/* <h2>User Info Here</h2> */}
            <div className="reviewinfo">
            <div className="user-review-info">
            <img className="pfp-review" src="https://media.istockphoto.com/id/1210939712/vector/user-icon-people-icon-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=vKDH9j7PPMN-AiUX8vsKlmOonwx7wjqdKiLge7PX1ZQ="/>
            <p>{rev.user.username}</p>
            </div>
            <div className="stars-review">
            {stars(rev.stars)}
            {rev.user.id === User.id ?
            <div>
              <button onClick={() => deleteRev(rev.id)}> Delete your review</button>
              <button onClick={() => history.push(`/review/edit/${rev.id}/business/${businessId}`)}> Edit Review</button>
            </div>
            :
            <></>
          }
            </div>
            <p className="reviewdisplay">{rev.review}</p>
            </div>
          </div>
        ))}
        <div className="Secondary info">
        <p>{business.description}</p>
        </div>
        <div className="infoBox">
          <p className="border">{business.phone} <img className='smallpic' src='https://img.freepik.com/premium-vector/phone-call-icon-isolated-white-background-telephone-symbol-vector-illustration_548264-469.jpg?w=740'/></p>
          <p className="padding">{business.street_address} {business.city} {business.state}</p>
        </div>
       </div>
    </div>
  </div>
)}else{


return(
  <div>
    <p>{business.id}</p>
    <p className="work-for-not-against">{average(ratings)}</p>
    <p>{business.business_name}</p>
    <p>{business.street_address} {business.city} {business.state}</p>
    <p>{business.description}</p>


         <div className="revhousingsplash">
         {Object.values(reviews).map(rev => (
          <div key={rev.id} className='container-basic'>
            <div className="reviewinfo">
            <div className="user-review-info">
            <img className="pfp-review" src="https://media.istockphoto.com/id/1210939712/vector/user-icon-people-icon-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=vKDH9j7PPMN-AiUX8vsKlmOonwx7wjqdKiLge7PX1ZQ="/>
            <p>{rev.user.username}</p>
            </div>
            <div className="stars-review">
            {stars(rev.stars)}
            </div>
            <p>{rev.review}</p>
            </div>
          </div>
        ))}
       </div>
  </div>
)
}
}
