import { combineReducers } from "redux";
import BombReducer from "./BombReducer";

const rootReducer = combineReducers({
  bomb: BombReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
