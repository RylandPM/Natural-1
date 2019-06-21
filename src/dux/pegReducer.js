import axios from "axios";

const initialState = {
  pegs: []
};

const SET_PEGS = "SET_PEGS";

export const setPegs = gamename => {
  console.log("hit pegReducer");
  const peg = axios.get(`/api/peg/${gamename}`).then(res => res.data);
  return {
    type: SET_PEGS,
    payload: peg
  };
};

export default function pegReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PEGS + "_FULFILLED":
      return {
        ...state,
        pegs: action.payload
      };
    default:
      return state;
  }
}
