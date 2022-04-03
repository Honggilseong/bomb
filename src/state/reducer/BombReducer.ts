import { CODE, generateBomb } from "../../util/generateBomb";
import {
  bombActionDispatch,
  START_GAME,
  OPEN_CELL,
  CLICK_BOMB,
} from "../actions/bombActionDispatch";

interface InitialState {
  table: number[][];
  timer: number;
  result: string;
  gameState: boolean;
}
const initialState = {
  table: [],
  timer: 0,
  result: "",
  gameState: false,
};
const BombReducer = (
  state: InitialState = initialState,
  action: bombActionDispatch
) => {
  switch (action.type) {
    case START_GAME: {
      const { row, cell, bombs } = action.payload;
      return {
        ...state,
        table: generateBomb(row, cell, bombs),
        gameState: false,
      };
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
    case CLICK_BOMB: {
      const { row, cell } = action.payload;
      const intRow = parseInt(row);
      const intCell = parseInt(cell);
      const newTable = [...state.table];

      newTable[intRow] = [...state.table[intRow]];
      newTable[intRow][intCell] = CODE.CLICKED_BOMB;
      return { ...state, table: newTable, gameState: true };
    }
    default:
      return state;
  }
};
export default BombReducer;
