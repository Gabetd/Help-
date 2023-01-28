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
  const reviews = useSelector(state => state.reviews.allReviews)
  const {userId} = useParams()
  // const [user, setUser] = useState([]);

  useEffect(() => {
    dispatch(getAllReviewsByUserThunk(userId))
    dispatch(getUserThunk(userId))
  }, [dispatch]);

  // useEffect(() => {

  // }, [dispatch]);
  if(!user){
    return (
      <h1>Loading ...</h1>
    )
  }
  console.log('user =', user)
return(
<div>
{user.username}



</div>
)
}
