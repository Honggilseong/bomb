import { CODE, generateBomb } from "../../util/generateBomb";
import {
  bombActionDispatch,
  START_GAME,
  OPEN_CELL,
  CLICK_BOMB,
  FLAG_CELL,
  QUESTION_CELL,
  NORMALIZE_CELL,
  SET_TIMER,
} from "../actions/bombActionDispatch";

interface InitialState {
  table: number[][];
  timer: number;
  result: string;
  gameState: boolean;
  gameSet: {
    row: string;
    cell: string;
    bombs: string;
  };
  openCounter: number;
  timerCheck: boolean;
  isFirst: boolean;
}
const initialState = {
  table: [],
  timer: 0,
  result: "",
  gameState: false,
  gameSet: {
    row: "",
    cell: "",
    bombs: "",
  },
  openCounter: 0,
  timerCheck: true,
  isFirst: true,
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
        result: "",
        gameState: false,
        gameSet: {
          row,
          cell,
          bombs,
        },
        openCounter: 0,
        timer: 0,
        timerCheck: false,
        isFirst: true,
      };
    }
    case OPEN_CELL: {
      const { row, cell } = action.payload;
      let openCounter = 0;
      const intRow = parseInt(row);
      const intCell = parseInt(cell);
      const newTable = [...state.table];
      newTable.forEach((row, i) => {
        newTable[i] = [...state.table[i]];
      });

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
        if (
          arrayRow < 0 ||
          arrayRow >= newTable.length ||
          arrayCell < 0 ||
          arrayCell >= newTable[0].length
        ) {
          return;
        }
        // 중복 검사.
        if (check.includes(arrayRow + "," + arrayCell)) {
          // 이미 검사한 칸이면 if문을 종료하고 아니라면 else를 실행
          return;
        } else {
          // 아니면 check에 넣어서 중복을 방지해준다.
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

        //주변에 지뢰가 없다면 지뢰가 나올 때 까지 계속 열주는 조건문.
        if (count === 0) {
          const near: number[][] = [];
          // 인덱스가 0번이 아니라면 위에 배열을 near에 추가해줍니다.
          if (arrayRow - 1 > -1) {
            near.push([arrayRow - 1, arrayCell - 1]);
            near.push([arrayRow - 1, arrayCell]);
            near.push([arrayRow - 1, arrayCell + 1]);
          }
          //클릭 기준 좌 우를 near에 추가해줍니다.
          near.push([arrayRow, arrayCell - 1]);
          near.push([arrayRow, arrayCell + 1]);
          if (arrayRow + 1 < newTable.length) {
            near.push([arrayRow + 1, arrayCell - 1]);
            near.push([arrayRow + 1, arrayCell]);
            near.push([arrayRow + 1, arrayCell + 1]);
          }
          //칸이 이미 열려있다면 실행되지 않는다. 안 열려 있다면 계속 열어줍니다.
          near.forEach((n) => {
            if (newTable[n[0]][n[1]] !== CODE.OPENED) {
              checkAround(n[0], n[1]);
            }
          });
        }
        openCounter += 1;
      };
      checkAround(intRow, intCell);
      let gameState = false;
      let result = "";
      let timerCheck = false;
      //승리 방식 : 가로 세로 곱하기 - 폭탄의 갯수 만큼 클릭을하면 승리
      if (
        parseInt(state.gameSet.row) * parseInt(state.gameSet.cell) -
          parseInt(state.gameSet.bombs) ===
        state.openCounter + openCounter
      ) {
        gameState = true;
        timerCheck = true;
        result = "Winner!!";
        console.log("승리!");
      }
      return {
        ...state,
        table: newTable,
        result,
        gameState,
        openCounter: state.openCounter + openCounter,
        timerCheck,
      };
    }
    case CLICK_BOMB: {
      const { row, cell } = action.payload;
      const intRow = parseInt(row);
      const intCell = parseInt(cell);
      const newTable = [...state.table];

      newTable[intRow] = [...state.table[intRow]];
      newTable[intRow][intCell] = CODE.CLICKED_BOMB; // 클릭한 곳에 폭탄이 있다면 게임을 끝냅니다.
      return { ...state, table: newTable, gameState: true, timerCheck: true };
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
    case SET_TIMER: {
      console.log(state.timer);
      return {
        ...state,
        timer: state.timer + 1,
      };
    }
    default:
      return state;
  }
};
export default BombReducer;
