import axios from "axios";

const initialState = {
  messages: []
};

const SET_MESSAGES = "SET_MESSAGES";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    default:
      return state;
  }
}

export const setMessages = () => {
  let messages = axios.get("/api/messages").then(res => res.data);
  return {
    type: SET_MESSAGES,
    payload: messages
  };
};
