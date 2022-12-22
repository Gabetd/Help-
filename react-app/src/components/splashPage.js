import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getAllBusinessesThunk } from "../store/business";

const Home = () => {
  const history = useHistory()
const dispatch = useDispatch()
const user = useSelector(state => state.session.user)
const businesses = useSelector(state => state.business.allBusinesses)

useEffect(() => {
  dispatch(getAllBusinessesThunk())
}, [dispatch])

// if(!businesses){
//   return null
// }
  console.log('this is ',businesses)
  return(
    <div>
      <h1>WELCOME TO HELP!</h1>
      {Object.values(businesses).map(biz => (
        <div>
          <h2>image goes here</h2>
          <p>{biz.business_name}</p>
          <p>{biz.street_address} {biz.city} {biz.state}</p>
          <p>{biz.desctiption}</p>
          {user?
          <button>Add a Review</button>
        :
          <button>Sign up / login</button>
        }
        </div>
       ))}
    </div>
  )
}
export default Home;
