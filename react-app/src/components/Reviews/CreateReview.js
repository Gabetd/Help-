import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { createReviewThunk } from "../../store/review";
import { getAllReviewsByBusinessThunk } from "../../store/review";
import { getSingleBusinessThunk } from "../../store/business";
import { resetReview } from "../../store/review";
import '../omega.css'


export default function CreateAReview() {
    const dispatch = useDispatch()
    const history = useHistory()
    const User = useSelector(state => state.session.user)
    const [review, setReview] = useState('');
    const [stars,setStars] = useState('');
    const {businessId} = useParams()
    // console.log('Clicked')
    const [validationErrors, setValidationErrors] = useState([])

    /* Validation errors for form */
    useEffect(() => {
        const validationErrors = [];
        setValidationErrors(validationErrors);
    }, []);

    const handleSubmit = async (e) => {
      console.log('made it to submit')
        e.preventDefault();
        const newReview = {
          stars,
          review,
          business_id: businessId,
          user_id: User.id
        }
        console.log('payload = ', newReview)
        const data = await dispatch(createReviewThunk(newReview, businessId))
        console.log(data)
    if(data){
      dispatch(resetReview())
      dispatch(getAllReviewsByBusinessThunk(businessId))
      dispatch(getSingleBusinessThunk(businessId))
      history.push(`/business/${businessId}`)
    }
    }

    // const select = (num) => {
    //   const old = document.getElementsByClassName("selected")
    //   old.classList.remove("selected")
    //   const rate = document.getElementById(`${num}`)
    //   rate.classList.add('selected')
    //   setStars(num)
    //   console.log('stars = ', stars)
    // }


    return (
        <form className="CreateForm" onSubmit={handleSubmit}>
          <div className="ReviewPage">
            <div>
        {validationErrors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
            <h2>Add A Review</h2>
            <label>
                <input
                    className="input"
                    placeholder="Review"
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
            </label>
            <label>
              <div className="stars-create-review-page">
                <span id="1" onClick={() => {setStars(1); console.log(stars)}}>⭐</span>
                <span id="2" onClick={() => {setStars(2); console.log(stars)}}>⭐</span>
                <span id="3" onClick={() => {setStars(3); console.log(stars)}}>⭐</span>
                <span id="4" onClick={() => {setStars(4); console.log(stars)}}>⭐</span>
                <span id="5" onClick={() => {setStars(5); console.log(stars)}}>⭐</span>
              </div>
            </label>
            <div>
            <button type="submit" disabled={validationErrors.length}>Create</button>
            </div>
          </div>
        </form>

    )
}
