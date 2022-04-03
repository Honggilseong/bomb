import { CODE, generateBomb } from "../../util/generateBomb";
import {
  bombActionDispatch,
  START_GAME,
  OPEN_CELL,
  CLICK_BOMB,
  FLAG_CELL,
  QUESTION_CELL,
  NORMALIZE_CELL,
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
      // 주변 지뢰 탐색
      let around: number[] = [];
      if (newTable[intRow - 1]) {
        // 클릭한 칸 기준으로 윗줄이 있으면 아랫줄을 배열에 추가해준다.
        around = around.concat(
          newTable[intRow - 1][intCell - 1],
          newTable[intRow - 1][intCell],
          newTable[intRow - 1][intCell + 1]
        );
      }
      console.log("1", around);
      // 클릭한 칸 기준으로 앞 뒤를 배열에 추가해준다.
      around = around.concat(
        newTable[intRow][intCell - 1],
        newTable[intRow][intCell + 1]
      );
      console.log("2", around);
      // 클릭한 칸 기준으로 밑에줄이 있으면 아랫줄을 배열에 추가해준다.
      if (newTable[intRow + 1]) {
        around = around.concat(
          newTable[intRow + 1][intCell - 1],
          newTable[intRow + 1][intCell],
          newTable[intRow + 1][intCell + 1]
        );
      }
      console.log("3", around);
      // 주변 지뢰 갯수 찾고 그 길이만큼 count에 값을추가하여
      const count = around.filter((bomb) =>
        [CODE.BOMB, CODE.FLAG_BOMB, CODE.QUESTION_BOMB].includes(bomb)
      ).length;
      // 클릭한 칸에 카운트 값을 추가해줍니다.
      newTable[intRow][intCell] = count;
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
    case FLAG_CELL: {
      const { row, cell } = action.payload;
      const intRow = parseInt(row);
      const intCell = parseInt(cell);
      const newTable = [...state.table];

      newTable[intRow] = [...state.table[intRow]];

      if (newTable[intRow][intCell] === CODE.BOMB) {
        newTable[intRow][intCell] = CODE.FLAG_BOMB;
      } else {
        newTable[intRow][intCell] = CODE.FLAG;
      }
      return { ...state, table: newTable };
    }
    case QUESTION_CELL: {
      const { row, cell } = action.payload;
      const intRow = parseInt(row);
      const intCell = parseInt(cell);
      const newTable = [...state.table];

      newTable[intRow] = [...state.table[intRow]];

      if (newTable[intRow][intCell] === CODE.FLAG_BOMB) {
        newTable[intRow][intCell] = CODE.QUESTION_BOMB;
      } else {
        newTable[intRow][intCell] = CODE.QUESTION;
      }
      return { ...state, table: newTable };
    }
    case NORMALIZE_CELL: {
      const { row, cell } = action.payload;
      const intRow = parseInt(row);
      const intCell = parseInt(cell);
      const newTable = [...state.table];

      newTable[intRow] = [...state.table[intRow]];

      if (newTable[intRow][intCell] === CODE.FLAG_BOMB) {
        newTable[intRow][intCell] = CODE.BOMB;
      } else {
        newTable[intRow][intCell] = CODE.NORMAL;
      }
      return { ...state, table: newTable };
    }
    default:
      return state;
  }
};
export default BombReducer;
