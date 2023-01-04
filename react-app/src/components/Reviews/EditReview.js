import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { editReviewThunk } from "../../store/review";
import { getAllReviewsByBusinessThunk } from "../../store/review";
import { getSingleBusinessThunk } from "../../store/business";
import { getAllReviewsThunk } from "../../store/review";
import '../omega.css'


export default function EditAReview() {
    const {reviewId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const User = useSelector(state => state.session.user)
    const allReviews = useSelector(state => state.reviews.allReviews)
    const [review, setReview] = useState('');
    const [stars,setStars] = useState('');
    // console.log('Clicked')
    const [validationErrors, setValidationErrors] = useState([])
    // const rev = allReviews.find(el => el.id === reviewId)
    const rev = {id:4}
    console.log('review', allReviews)
    /* Validation errors for form */
    useEffect(() => {
        const validationErrors = [];
        setValidationErrors(validationErrors);
    }, []);

    useEffect(() => {
      dispatch(getAllReviewsThunk())
    }, [dispatch])

    const handleSubmit = async (e) => {
      console.log('made it to submit')
        e.preventDefault();
        const newReview = {
          stars,
          review,
          business_id: rev.business_id,
          user_id: User.id
        }
        console.log('payload = ', newReview)
        const data = await dispatch(editReviewThunk(newReview, reviewId))
        console.log(data)
    if(data){
      dispatch(getAllReviewsByBusinessThunk(rev.business_id))
      dispatch(getSingleBusinessThunk(rev.business_id))
      history.push(`/business/${rev.business_id}`)
    }
    }



    return (
        <form onSubmit={handleSubmit}>
            <div>
        {validationErrors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
            <h2>Review</h2>
            <label>
                <input
                    placeholder="Review"
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
            </label>
            <label>
              <div className="stars-create-review-page">
                <span id="1" onClick={() => setStars(1)}>⭐</span>
                <span id="2" onClick={() => setStars(2)}>⭐</span>
                <span id="3" onClick={() => setStars(3)}>⭐</span>
                <span id="4" onClick={() => setStars(4)}>⭐</span>
                <span id="5" onClick={() => setStars(5)}>⭐</span>
              </div>
            </label>
            <div>
            <button type="submit" disabled={validationErrors.length}>Create</button>
            </div>
        </form>

    )
}
