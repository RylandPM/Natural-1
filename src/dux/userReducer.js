import axios from "axios";

const initialState = {
  username: null,
  email: null,
  user_id: 0
};

const REQUEST_USER_DATA = "REQUEST_USER_DATA";

export const requestUserData = () => {
  let data = axios.get("/auth/user").then(res => res.data);
  // console.log(data);
  return {
    type: REQUEST_USER_DATA,
    payload: data
  };
};

export default function userReducer(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case REQUEST_USER_DATA + "_FULFILLED":
      console.log(action.payload);
      const { username, email, user_id } = action.payload;
      return {
        ...state,
        username: username,
        email: email,
        user_id: user_id
      };
    default:
      return state;
  }
}
