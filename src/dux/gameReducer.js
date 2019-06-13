import axios from "axios";

const initialState = {
  game_name: null,
  gm: 0
};

const SET_GAME = "SET_GAME";

export const selectGame = gname => {
  const game = axios.get(`/api/game/${gname}`);
  return {
    type: SET_GAME,
    payload: game
  };
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GAME:
      const { game_name, gm } = action.payload.game;
      return {
        game_name: game_name,
        gm: gm
      };
    default:
      return state;
  }
}
