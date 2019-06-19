import axios from "axios";

const initialState = {
  messages: []
};

const SET_MESSAGES = "SET_MESSAGES";

export default function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case SET_MESSAGES + "_FULFILLED":
      return {
        ...state,
        messages: action.payload
      };
    default:
      return state;
  }
}

export const setMessages = game => {
  console.log({ game_name: game });
  let messages = axios
    .get(`/api/messages?game_name=${game}`)
    .then(res => res.data);
  console.log(messages);
  return {
    type: SET_MESSAGES,
    payload: messages
  };
};
