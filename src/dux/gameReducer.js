import axios from "axios";

const initialState = {
  game_name: null,
  gm: 0
};

const SET_GAME = "SET_GAME";

export const selectGame = gname => {
  const game = axios.get(`/api/game/${gname}`).then(res => res.data[0]);
  return {
    type: SET_GAME,
    payload: game
  };
};

export default function gameReducer(state = initialState, action) {
  // console.log(action.payload);
  switch (action.type) {
    case SET_GAME + "_FULFILLED":
      const { game_name, gm } = action.payload;
      return {
        ...state,
        game_name: game_name,
        gm: gm
      };
    default:
      return state;
  }
}
