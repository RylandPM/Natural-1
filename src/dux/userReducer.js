import axios from "axios";

const initialState = {
  username: null,
  email: null,
  user_id: 0
};

const REQUEST_USER_DATA = "REQUEST_USER_DATA";

export const requestUserData = () => {
  let data = axios.get("/auth/user").then(res => res.data);
  return {
    type: REQUEST_USER_DATA,
    payload: data
  };
};

export default function userReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case REQUEST_USER_DATA + "_FULLFILLED":
      const { username, email, user_id } = action.payload.user;
      return {
        username,
        email,
        user_id
      };
    default:
      return state;
  }
}
