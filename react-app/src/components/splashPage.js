import React, { useEffect, useState } from "react";
import { startTransition } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom'
import { getAllBusinessesThunk } from "../store/business";
import reviewReducer, { getAllReviewsThunk } from "../store/review";
import { resetReview } from "../store/review";
import './omega.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
// import 'swiper/modules/pagination/pagination.min.css';
// import 'swiper/modules/navigation/navigation.min.css';



// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import User from "./User";

// export default function App() {
//   return (
//     <>

    {/* </>
  );
} */}


const Home = () => {
const history = useHistory()
const dispatch = useDispatch()
const user = useSelector(state => state.session.user)
const businesses = useSelector(state => state.business.allBusinesses)
const reviews = useSelector(state => state.reviews.allReviews)
const [search, setSearch] = useState('')

useEffect(() => {
  dispatch(resetReview())
  dispatch(getAllBusinessesThunk())
  dispatch(getAllReviewsThunk())
}, [dispatch])

// if(!businesses){
//   return null
// }

const stars = (num) => {
  if (num === 5){
  return (<div>⭐⭐⭐⭐⭐</div>)}else if (num === 4){
  return (<div>⭐⭐⭐⭐</div>)}else if (num === 3){
  return (<div>⭐⭐⭐</div>)}else if (num === 2){
  return (<div>⭐⭐</div>)}else if (num === 1){
  return (<div>⭐</div>)}
}

const reviewed = (biz) => {
  const ratings= Object.values(biz.rating).map(el => {
    return [el.user_id, el.id]
  })
  for(let i = 0; i < ratings.length; i++){
    if(ratings[i][0]=== user.id ){
      history.push(`/review/edit/${ratings[i][1]}/business/${biz.id}`)
      return
    }
  }
    history.push(`/review/add/${biz.id}`)
    return
}

const Logged = (biz)=> {
  if(!user){
    history.push('/login')
  }else if(biz.owner.id === user.id){
    history.push(`/business/${biz.id}`)
  }else { reviewed(biz)
  }
}

  if(!reviews){
    return (
      <h1> Loading ...</h1>
    )
  }
  return(
    <div>
      <div className="searchBarHousing">
      <input className='searchBar' type="text" placeholder="Search"/>
      <span className="testing">🔍︎
      </span>
      </div>

          <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="cycleimgsplash"><img className="resize" src="https://s3-media0.fl.yelpcdn.com/educatorphoto/ccPzYQQGD-GXSUadmL3SPw/o.jpg" /></SwiperSlide>
        <SwiperSlide className="cycleimgsplash"><img className="resize" src="https://s3-media0.fl.yelpcdn.com/educatorphoto/IJElscsPxKRiQJFwUADA-w/o.jpg"/></SwiperSlide>
        <SwiperSlide className="cycleimgsplash"><img className="resize" src="https://s3-media0.fl.yelpcdn.com/educatorphoto/xL0l_4tg4DdhuHT9S-Kt_w/o.jpg"/></SwiperSlide>
      </Swiper>
      <h1 className="welcomeSplash" >WELCOME TO HELP!</h1>
      <div className="Businessouterhousing">
      <div className="businesseshousingsplash">

      {Object.values(businesses).map(biz => (
        <div className='LittleBusiness' key={biz.id}>
          <img className="businessImgSplashPage" src={biz.preview_img} alt='Photo of business here'/>
          <div className="spacerforbusiness">
          <NavLink to={`/business/${biz.id}`}>
          <p className="bolder">{biz.business_name}</p>
          </NavLink>
          <p>Do you recommend this business?</p>
          {/* <p className="work-for-not-against">{aveRating(average(biz.rating))}{average(biz.rating)}</p> */}
          {/* <div class="product-review-stars">
              <input type="radio" id="star5" name="rating" onClick={() => Logged(biz)} value="5" class="hidden" /><label className="baseStar" for="star5" title="Great">★</label>
              <input type="radio" id="star4" name="rating" onClick={() => Logged(biz)} value="4" class="hidden" /><label className="baseStar" for="star4" title="Good">★</label>
              <input type="radio" id="star3" name="rating" onClick={() => Logged(biz)} value="3" class="hidden" /><label className="baseStar" for="star3" title="Ok">★</label>
              <input type="radio" id="star2" name="rating" onClick={() => Logged(biz)} value="2" class="hidden" /><label className="baseStar" for="star2" title="Could've Been Better">★</label>
              <input type="radio" id="star1" name="rating" onClick={() => Logged(biz)} value="1" class="hidden" /><label className="baseStar" for="star1" title="Not Good">★</label>
            </div> */}
            <span onClick={() => Logged(biz)} className="newButton"> Add Your review</span>
          </div>
          {/* <p>{biz.street_address} {biz.city} {biz.state}</p>
          <p>{biz.description}</p> */}
          {user?
          <div>

          </div>
          :
          <></>
        }
        </div>
       ))}
         </div>
         </div>
         <h2 id="revHeading">Recent Activity</h2>
         <div className="revOuterHousing">
       <div className="revhousingsplash">

        {Object.values(reviews).map(rev => (
          <div key={rev.id} className='container-basic-rev'>
            {/* <h2>User Info Here</h2> */}
            <div className="reviewinfo">
            <div className="user-review-info">
              <NavLink to={`/users/${rev.user.id}`}>
            <img className="pfp-review" src="https://media.istockphoto.com/id/1210939712/vector/user-icon-people-icon-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=vKDH9j7PPMN-AiUX8vsKlmOonwx7wjqdKiLge7PX1ZQ="/>
            <p className="bold">{rev.user.username}</p>
              </NavLink>
            </div>
            <p>Wrote a review</p>
            <NavLink to={`/business/${rev.business.id}`}>
            <p className="bold blue" >{rev.business.business_name}</p>
            </NavLink>
            <div className="stars-review">
            {stars(rev.stars)}
            {/* <p>{rev.stars}</p> */}
            </div>
            <p className="reviewdisplay">{rev.review}</p>
            </div>
          </div>
        ))}
       </div>
       </div>
    </div>
  )
}
export default Home;
