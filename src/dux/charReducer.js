import axios from "axios";

const initialState = {
  charname: null,
  classes: null,
  lvl: 0,
  health: 0,
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0
};

const SET_CHARACTER = "SET_CHARACTER";

export const selectCharacter = id => {
  let char = axios.get(`/api/characters/${id}`).then(res => res.data);
  return {
    type: SET_CHARACTER,
    payload: char
  };
};

export default function charReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHARACTER:
      const {
        charactername,
        classes,
        lvl,
        health,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma
      } = action.payload.character;
      return {
        charname: charactername,
        classes: classes,
        lvl: lvl,
        health: health,
        strength: strength,
        dexterity: dexterity,
        constitution: constitution,
        intelligence: intelligence,
        wisdom: wisdom,
        charisma: charisma
      };
    default:
      return state;
  }
}
