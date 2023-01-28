const GetUser = 'session/GetUser';

const getUserAction = (user) => ({
  type: GetUser,
  payload: user
});


export const getUserThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`,{
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(getUserAction(data));
    return
  }
  return null
};

const initialState = { user: null };
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case GetUser:
      return { ...action.payload }
    default:
      return state;
  }
}
