const LoadAll = 'reviews/LoadAll'
const LoadAllReviews = 'reviews/LoadAllReviews'
const Create = 'reviews/Create'
const Edit = 'reviews/Edit'
const Delete = 'reviews/Delete'
const Reset = 'reviews/Reset'
const LoadOne = 'reviews/LoadOne'

// Action Creators
const load = (reviews, businessId) => ({
    type: LoadAll,
    reviews,
    businessId
})

const loadAllReviews = (reviews) => ({
    type: LoadAllReviews,
    reviews
})


const create = (review, businessId) => ({
    type: Create,
    review,
    businessId
})

const edit = (review) => ({
    type: Edit,
    review
})

const remove = (reviewId) => ({
    type: Delete,
    reviewId
})

export const resetReview = () => ({
    type: Reset
})

const loadOne = (reviewId) => ({
    type: LoadOne,
    reviewId
})

// THUNK action creators by business ID
export const getAllReviewsByBusinessThunk = (businessId) => async dispatch => {
    const response = await fetch(`/api/review/business/${businessId}`)
    // console.log('reviews', response)
    if (response.ok) {
        const Data = await response.json()
        dispatch(load(Data, businessId))
        console.log('data', Data)
        return Data
    }
    return
}

export const getAllReviewsThunk = () => async (dispatch) => {
    const response = await fetch('/api/review/all')
    console.log('all reviews = ',response)
    if (response.ok) {
        const Data = await response.json()
        console.log(Data)
        await dispatch(loadAllReviews(Data))
        return Data
    }
    return
};

export const createReviewThunk = (review, businessId) => async dispatch => {
    const response = await fetch(`/api/review/new/${businessId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const Data = await response.json()
        dispatch(create(Data, businessId))
        console.log('data =', Data)
        return Data
    }
    return
}

export const editReviewThunk = (review, reviewId) => async dispatch => {
    const response = await fetch(`/api/review/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
    console.log(review)
    console.log('inside edit review thunk, res =', response)
    if (response.ok) {
        const Data = await response.json()
        dispatch(edit(Data))
        console.log('edit review data =', Data)
        return Data
    }
    return
}

export const deleteReviewThunk = (reviewId) => async dispatch => {
    const response = await fetch(`/api/review/delete/${reviewId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(remove(reviewId))
        return
    }
    return
}

export const getOneReviewThunk = (reviewId) => async dispatch => {
    const response = await fetch(`/api/review/${reviewId}`)

    if (response.ok) {
        const Data = await response.json()
        dispatch(loadOne(Data))
        return
    }
    return
}


const initialState = {
    business: {},
    user: {},
    allReviews: {}
}

const reviewReducer = (state = initialState, action) => {
    const business = {};
    const user = {};
    const allReviews = {};
    let newState
    switch (action.type) {
        case LoadAll:
            action.reviews.forEach(review => {
                business[review.id] = review
            })
            return {
                ...state,
                business
            }
        case LoadAllReviews:
            action.reviews.forEach(review => {
                allReviews[review.id] = review
            })
            return {
                ...state,
                allReviews
            }
        case LoadOne:
            newState = { ...state, business: { ...state.business }, user: { ...state.user } }
            newState.business[action.reviewId.id] = action.reviewId
            return newState
        case Create:
            newState = { business: { ...state.business }, user: { ...state.user } }
            newState.business[action.review.id] = action.review
            return newState
        case Edit:
            newState = { business: { ...state.business } }
            newState.business[action.review.id] = action.review
            return newState
        case Delete:
            newState = { ...state, business: { ...state.business }, user: { ...state.user } }
            delete newState.business[action.reviewId]
            delete newState.user[action.reviewId]
            return newState
        case Reset:
            return initialState
        default:
            return state
    }
}

export default reviewReducer
