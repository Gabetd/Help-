const GetAll = 'businesses/GetAll'
const GetOne = 'businesses/GetOne'
const CreateNew = 'businesses/CreateNew'
const Update = 'business/Update'
const Delete = 'business?Delete'

const GetAllAction = (businesses) => {
  return{
    type: GetAll,
    businesses
  };
};


const GetOneAction = (business) => ({
  type: GetOne,
  business
});

const CreateNewAction = (business) => ({
  type: CreateNew,
  business
});

const UpdateAction = (business) => ({
  type: Update,
  business
});

const DeleteAction = businessId => ({
  type: Delete,
  businessId
});

// const Reset = () => ({
//   type: Reset,
// });

// THUNK action creators
export const getAllBusinessesThunk = () => async (dispatch) => {
  const response = await fetch("/api/business/all");

  if (response.ok) {
    const Data = await response.json();
    await dispatch(GetAllAction(Data));
    return Data
  }
  return;
};


export const getSingleBusinessThunk = (businessId) => async (dispatch) => {
  const response = await fetch(`/api/business/${businessId}`);

  if (response.ok) {
    const Data = await response.json();
    dispatch(GetOneAction(Data));
  }
}

export const createBusinessThunk = (business) => async (dispatch) => {
  const response = await fetch("/api/business/new", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(business)
  });

  if (response.ok) {
    const Data = await response.json();
    dispatch(CreateNewAction(Data));
    return Data;
  }
  return
}

export const editBusinessThunk = (business, businessId) => async (dispatch) => {
  const response = await fetch(`/api/business/${businessId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(business)
  });

  if (response.ok) {
    const Data = await response.json();
    dispatch(UpdateAction(Data));
    return Data;
  }

}

export const deleteBusinessThunk = (businessId) => async (dispatch) => {
  const response = await fetch(`/api/businesses/${businessId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    const Data = await response.json();
    dispatch(DeleteAction(Data));
  }
}




let initialState = {
  allBusinesses: {},
  oneBusiness: {}
}

export default function businessReducer(state = initialState, action){
  let newState;
  const allBusinesses = {}
  switch (action.type) {
    case GetAll:
      action.businesses.forEach(business => {
        allBusinesses[business.id] = business;
      })
      return {
        ...state,
        allBusinesses
      }
    case GetOne:
      newState = { ...state, allBusinesses: { ...state.allBusinesses }, singleBusiness: { ...state.oneBusiness } }
      newState.singleBusiness = action.business
      return { ...newState }
    case CreateNew:
      newState = { allBusinesses: { ...state.allBusinesses } }
      newState.singleBusiness = action.business
      newState.singleBusiness.BusinessImages = []
      return newState
    case Delete:
      newState = {
        allBusinesses: { ...state.allBusinesses },
        singleBusiness: { ...state.oneBusiness }
      }
      delete newState.allBusinesses[action.businessId]
      if (newState.singleBusiness.id === action.businessId) {
        newState.singleBusiness = {}
      }
      return newState

    // case Reset:
    //   return initialState
    default:
      return state
  }
}