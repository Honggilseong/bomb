import { generateBomb } from "../../util/generateBomb";
import { bombActionDispatch, START_GAME } from "../actions/bombActionDispatch";

interface InitialState {
  timer: number;
  result: string;
}
const initialState = {
  table: [],
  timer: 0,
  result: "",
};
const BombReducer = (
  state: InitialState = initialState,
  action: bombActionDispatch
) => {
  switch (action.type) {
    case START_GAME: {
      const { row, cell, bombs } = action.payload;
      return { ...state, table: generateBomb(row, cell, bombs) };
    }
    default:
      return state;
  }
};
export default BombReducer;
