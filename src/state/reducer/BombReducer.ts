import { CODE, generateBomb } from "../../util/generateBomb";
import {
  bombActionDispatch,
  START_GAME,
  OPEN_CELL,
} from "../actions/bombActionDispatch";

interface InitialState {
  table: number[][];
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
    case OPEN_CELL: {
      const { row, cell } = action.payload;
      const intRow = parseInt(row);
      const intCell = parseInt(cell);
      const newTable = [...state.table];

      newTable[intRow] = [...state.table[intRow]];
      newTable[intRow][intCell] = CODE.OPENED;
      return { ...state, table: newTable };
    }
    default:
      return state;
  }
};
export default BombReducer;
