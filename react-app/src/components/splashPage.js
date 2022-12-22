import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getAllBusinessesThunk } from "../store/business";

const Home = () => {
  const history = useHistory()
const dispatch = useDispatch()
const user = useSelector(state => state.session.user)
const businesses = useSelector(state => state.businesses)

useEffect(() => {
  dispatch(getAllBusinessesThunk())
  console.log("I was hit")
}, [dispatch])

// if(!businesses){
//   return null
// }
  console.log('HOME')
  return(
    <div>
      <h1>WELCOME TO HELP!</h1>
      {/* {Object.values(businesses).map(biz => (
        <div>
          <p>{biz.business_name}</p>
          <p>{biz.street_address} {biz.city} {biz.state}</p>

        </div>
       ))} */}
    </div>
  )
}
export default Home;
