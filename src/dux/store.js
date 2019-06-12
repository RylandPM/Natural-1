import { createStore } from "redux";
import charReducer from "./charReducer";
import gameReducer from "./gameReducer";

export default createStore(charReducer, gameReducer);
