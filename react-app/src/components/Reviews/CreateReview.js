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
    const BizName = useSelector(state => state.business.oneBusiness.business_name)
    const [review, setReview] = useState('');
    const [stars,setStars] = useState('');
    const {businessId} = useParams()
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(()=> {
      dispatch(getSingleBusinessThunk(businessId))
    }, [dispatch])
    /* Validation errors for form */
    useEffect(() => {
      const Errors = [];
      if (!review) Errors.push('Please add a review before submitting')
      if (review.length > 3000) validationErrors.push('Review must be less than 3000 characters')
      if (!stars) Errors.push('Please rate this business before submitting')
      console.log(review.length)
      setValidationErrors(Errors);
    }, [review, stars]);



    const handleSubmit = async () => {
      if(validationErrors.length > 0){
        return
      }
        const newReview = {
          stars,
          review,
          business_id: businessId,
          user_id: User.id
        }
        const data = await dispatch(createReviewThunk(newReview, businessId))
    if(data){
      dispatch(resetReview())
      dispatch(getAllReviewsByBusinessThunk(businessId))
      history.push(`/business/${businessId}`)
    }
    }

    if(!User){
      history.push('/')
  }
    return (
        <form className="CreateForm" onSubmit={handleSubmit}>
          <div className="ReviewPage">
        {validationErrors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>

            <h2>{BizName}</h2>
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
            <span onClick={()=> handleSubmit()} className='newButton' type="submit" disabled={validationErrors.length}>Create</span>
            </div>
          </div>
        </form>

    )
}
