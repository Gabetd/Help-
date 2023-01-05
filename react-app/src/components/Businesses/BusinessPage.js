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
  const reviews = useSelector(state => state.reviews.business)
  const [hasClicked, setHasClicked] = useState(false)
  const {businessId} = useParams()
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
  if(len === 0){return 'No Reviews :('}
  let sum = 0
  for (let i = 0; i < len; i++){sum += arr[i].stars}
  return ` average rating ${sum/len}`}


  const stars = (num) => {
  if (num == 5){
  return (<div>⭐⭐⭐⭐⭐</div>)}else if (num == 4){
  return (<div>⭐⭐⭐⭐</div>)}else if (num == 3){
  return (<div>⭐⭐⭐</div>)}else if (num == 2){
  return (<div>⭐⭐</div>)}else if (num == 1){
  return (<div>⭐</div>)}
}

// const aveRating = (num) => {
//   console.log('num',num)
//   if (num > 4.5 ){
//   return (<div>⭐⭐⭐⭐⭐</div>)}else if (num >= 4){
//   // return (<div>⭐⭐⭐⭐</div>)}else if (num > 3.5){
//   return (<div>⭐⭐⭐⭐</div>)}else if (num >= 3){
//   // return (<div>⭐⭐⭐</div>)}else if (num > 2.5){
//   return (<div>⭐⭐⭐</div>)}else if (num >= 2){
//   // return (<div>⭐⭐</div>)}else if (num > 1.5){
//   return (<div>⭐⭐</div>)}else if (num >= 1){
//   return (<div>⭐</div>)}
//   else return (<></>)
// }

const deleteRev = (id) => {
  dispatch(deleteReviewThunk(id))
  dispatch(getAllReviewsByBusinessThunk(businessId))
  window.location.reload(false);
  // history.push(`/business/${businessId}`)
}
const addReview = () => {
  // DO THIS NOW
}

console.log('reviews', reviews)
let users = Object.values(reviews).map(rev => {
  return rev.user.id
})
console.log('users', users)
const reviewed = (id) => {
  if(users.includes(User.id)){
    return (<></>)
  }else{
    return(<button onClick={() => history.push(`/review/add/${id}`)}>add a review</button>)
  }

}
console.log('reviewed', reviewed)

console.log('object vals',Object.values(reviews) )

return(
  <div>
    <p>{business.id}</p>
    <p className="work-for-not-against">{average(ratings)}</p>
    <p>{business.business_name}</p>
    <p>{business.street_address} {business.city} {business.state}</p>
    <p>{business.description}</p>
    {User.id === business.owner_id?
    <div>
    {/* <button onClick={() => history.push(`/business/${businessId}/edit`)}>Edit your business</button> */}
    <button onClick={() => Remove()}>Remove your business from Help</button>
    </div>
    :
      reviewed(business.id)
  }
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
              <button onClick={() => history.push(`/review/edit/${rev.id}`)}> Edit Review</button>
            </div>
            :
            <></>
          }
            </div>
            <p>{rev.review}</p>
            </div>
          </div>
        ))}
       </div>
  </div>
)

}
