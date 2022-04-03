import { Dispatch } from "redux";
import {
  OpenCellOption,
  OPEN_CELL,
  StartOption,
  START_GAME,
} from "./bombActionDispatch";

export const startGame = (option: StartOption) => (dispatch: Dispatch) => {
  dispatch({
    type: START_GAME,
    payload: option,
  });
};

export const openCell = (option: OpenCellOption) => (dispatch: Dispatch) => {
  dispatch({
    type: OPEN_CELL,
    payload: option,
  });
};
