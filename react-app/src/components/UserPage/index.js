import React, { useEffect, useState } from "react";
import { getAllReviewsByUserThunk } from "../../store/review"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, NavLink } from 'react-router-dom'
// import { resetReview } from "../store/review";
import { getUserThunk } from "../../store/user";
export default function UserPage(){
  const history = useHistory()
  const dispatch = useDispatch()
  const LoggedUser = useSelector(state => state.session.user)
  const user = useSelector(state => state.user)
  const businesses = useSelector(state => state.business.allBusinesses)
  const reviews = Object.values(useSelector(state => state.reviews.allReviews))
  const {userId} = useParams()
  // const [user, setUser] = useState([]);

  useEffect(() => {
    dispatch(getAllReviewsByUserThunk(userId))
    dispatch(getUserThunk(userId))
  }, [dispatch]);

  const stars = (num) => {
    if (num === 5){
    return (<div>⭐⭐⭐⭐⭐</div>)}else if (num === 4){
    return (<div>⭐⭐⭐⭐</div>)}else if (num === 3){
    return (<div>⭐⭐⭐</div>)}else if (num === 2){
    return (<div>⭐⭐</div>)}else if (num === 1){
    return (<div>⭐</div>)}
  }

  if(!user){
    return (
      <h1>Loading ...</h1>
    )
  }
  console.log('user =', user)
  console.log(reviews)
return(
<div className="OutermostHolder">
  <div className="WideInfoHolder">

  <div className="upperUserPage">
    <div className="UserInfo">
    <img className="ProfileImage" src='https://media.istockphoto.com/id/1210939712/vector/user-icon-people-icon-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=vKDH9j7PPMN-AiUX8vsKlmOonwx7wjqdKiLge7PX1ZQ='/>
    <div className="UserStats">
    <div className="bolder spaced">
      {user.username}
      </div>
    <div className="bold spaced">{reviews.length} {
      reviews.length === 1 ? 'review':'reviews'}</div>
    </div>
    </div>
    </div>
  <div className="underImg bolder spaced">{user.username}'s Profile</div>
  </div>
  <div className="bolder welcome">Reviews</div>
      {reviews.map(rev => (
        <div className="mrWide">
        <div className="reviewHousing">
            <NavLink to={`/business/${rev.business.id}`}>
            <p className="bold blue" >{rev.business.business_name}</p>
            </NavLink>
            <div className="stars-review">
            {stars(rev.stars)}
            </div>
            <p className="reviewdisplay">{rev.review}</p>
        </div>
        </div>
      ))}

</div>
)
}
