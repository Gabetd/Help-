import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { getAllBusinessesThunk } from "../../store/business";
import { getSingleBusinessThunk } from "../../store/business";
import { deleteBusinessThunk } from "../../store/business";

export default function SingleBusiness(){
  const history = useHistory()
  const dispatch = useDispatch()
  const User = useSelector(state => state.session.user)
  const business = useSelector(state => state.business.oneBusiness)
  const {businessId} = useParams()

  useEffect(() => {
    dispatch(getSingleBusinessThunk(businessId))
}, [dispatch]);

const Remove = () => {
  dispatch(deleteBusinessThunk(businessId))
  dispatch(getAllBusinessesThunk())
  history.push('/')
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
  </div>
)

}
