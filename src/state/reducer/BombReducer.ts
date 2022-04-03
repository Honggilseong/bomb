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
      newTable.forEach((row, i) => {
        newTable[i] = [...state.table[i]];
      });
      console.log("first Array", newTable);
      const check: string[] = [];
      const checkAround = (arrayRow: number, arrayCell: number) => {
        if (
          [
            CODE.OPENED,
            CODE.FLAG_BOMB,
            CODE.FLAG,
            CODE.QUESTION_BOMB,
            CODE.QUESTION,
          ].includes(newTable[arrayRow][arrayCell])
        )
          return;
        // 상하좌우 없는 칸은 안 열기
        if (
          arrayRow < 0 ||
          arrayRow >= newTable.length ||
          arrayCell < 0 ||
          arrayCell >= newTable[0].length
        ) {
          return;
        }
        // 옆에칸 서로 검사하는 거 막아주기
        if (check.includes(arrayRow + "," + arrayCell)) {
          // 이미 검사한 칸이면
          return;
        } else {
          // 아니면 checked 배열에 넣어주기
          check.push(arrayRow + "," + arrayCell);
        }
        // 주변 지뢰 탐색
        let around: number[] = [];
        if (newTable[arrayRow - 1]) {
          // 클릭한 칸 기준으로 윗줄이 있으면 아랫줄을 배열에 추가해준다.
          around = around.concat(
            newTable[arrayRow - 1][arrayCell - 1],
            newTable[arrayRow - 1][arrayCell],
            newTable[arrayRow - 1][arrayCell + 1]
          );
        }

        // 클릭한 칸 기준으로 앞 뒤를 배열에 추가해준다.
        around = around.concat(
          newTable[arrayRow][arrayCell - 1],
          newTable[arrayRow][arrayCell + 1]
        );

        // 클릭한 칸 기준으로 밑에줄이 있으면 아랫줄을 배열에 추가해준다.
        if (newTable[arrayRow + 1]) {
          around = around.concat(
            newTable[arrayRow + 1][arrayCell - 1],
            newTable[arrayRow + 1][arrayCell],
            newTable[arrayRow + 1][arrayCell + 1]
          );
        }

        // 주변 지뢰 갯수 찾고 그 길이만큼 count에 값을추가하여
        const count = around.filter((bomb) =>
          [CODE.BOMB, CODE.FLAG_BOMB, CODE.QUESTION_BOMB].includes(bomb)
        ).length;
        // 클릭한 칸에 카운트 값을 추가해줍니다.
        newTable[arrayRow][arrayCell] = count;

        if (count === 0) {
          const near: number[][] = [];
          if (arrayRow - 1 > -1) {
            near.push([arrayRow - 1, arrayCell - 1]);
            near.push([arrayRow - 1, arrayCell]);
            near.push([arrayRow - 1, arrayCell + 1]);
          }
          near.push([arrayRow, arrayCell - 1]);
          near.push([arrayRow, arrayCell + 1]);
          if (arrayRow + 1 < newTable.length) {
            near.push([arrayRow + 1, arrayCell - 1]);
            near.push([arrayRow + 1, arrayCell]);
            near.push([arrayRow + 1, arrayCell + 1]);
          }
          near.forEach((n) => {
            if (newTable[n[0]][n[1]] !== CODE.OPENED) {
              checkAround(n[0], n[1]);
            }
          });
        }
      };
      checkAround(intRow, intCell);
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
