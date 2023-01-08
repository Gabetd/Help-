import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { editReviewThunk } from "../../store/review";
import { getAllReviewsByBusinessThunk } from "../../store/review";
import { getSingleBusinessThunk } from "../../store/business";
import { getOneReviewThunk } from "../../store/review";
import { getAllReviewsThunk } from "../../store/review";
import '../omega.css'


export default function EditAReview() {
    const {reviewId} = useParams()
    const {businessId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const User = useSelector(state => state.session.user)
    const ReviewOne = useSelector(state => state.reviews.business[reviewId])
    const Review = useSelector(state => state.reviews.allReviews[reviewId])
    const [review, setReview] = useState('')
    const [stars,setStars] = useState('');
    const [validationErrors, setValidationErrors] = useState([])
    // const rev = allReviews.find(el => el.id === reviewId)
    // const rev = {business_id:2}
    // console.log('review', allReviews)
    console.log('review', Review)
    /* Validation errors for form */
    useEffect(() => {
      const Errors = [];
      if (!review) Errors.push('Please add a review before submitting')
      if (review.length > 3000) validationErrors.push('Review must be less than 3000 characters')
      if (!stars) Errors.push('Please rate this business before submitting')

      setValidationErrors(Errors);
    }, [review, stars]);

    useEffect(() => {
      dispatch(getAllReviewsThunk())
      dispatch(getOneReviewThunk(reviewId))
      if(ReviewOne){
        setReview(ReviewOne.review)
      }
    }, [dispatch])

    // console.log(ReviewOne?.review)

    const handleSubmit = async () => {
      console.log('made it to submit')
      if(validationErrors.length > 0){
        return
      }
        const newReview = {
          stars,
          review,
          business_id: businessId,
          user_id: User.id
        }
        console.log('payload = ', newReview)
        const data = await dispatch(editReviewThunk(newReview, reviewId))
        console.log(data)
    if(data){
      dispatch(getAllReviewsByBusinessThunk(businessId))
      dispatch(getSingleBusinessThunk(businessId))
      history.push(`/business/${businessId}`)
    }
    }


    if(!User){
      history.push('/')
  }
    return (
        <form className="CreateForm" onSubmit={handleSubmit}>
          <div className="ReviewPage">
            <div>
        {validationErrors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
            <h2>Change your Review</h2>
            <div className="reviewBox">
            <label>
            <div class="product-review-stars">
              <input type="radio" id="star5" name="rating" onClick={() => setStars(5)} value="5" class="hidden" /><label className="baseStar" for="star5" title="Great">★</label>
              <input type="radio" id="star4" name="rating" onClick={() => setStars(4)} value="4" class="hidden" /><label className="baseStar" for="star4" title="Good">★</label>
              <input type="radio" id="star3" name="rating" onClick={() => setStars(3)} value="3" class="hidden" /><label className="baseStar" for="star3" title="Ok">★</label>
              <input type="radio" id="star2" name="rating" onClick={() => setStars(2)} value="2" class="hidden" /><label className="baseStar" for="star2" title="Could've Been Better">★</label>
              <input type="radio" id="star1" name="rating" onClick={() => setStars(1)} value="1" class="hidden" /><label className="baseStar" for="star1" title="Not Good">★</label>
            </div>
            </label>
            <label className="reviewinput">
                <textarea
                    className="reviewInputContents"
                    placeholder="Review"
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                    />
            </label>

                    </div>
            <div>
            <span onClick={()=> handleSubmit()} className='newButton' type="submit" disabled={validationErrors.length}>Update Review</span>
            </div>
            </div>
        </form>

    )
}
