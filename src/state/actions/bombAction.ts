import { Dispatch } from "redux";
import {
  CLICK_BOMB,
  FLAG_CELL,
  NORMALIZE_CELL,
  OpenCellOption,
  OPEN_CELL,
  QUESTION_CELL,
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

export const clickBomb = (option: OpenCellOption) => (dispatch: Dispatch) => {
  dispatch({
    type: CLICK_BOMB,
    payload: option,
  });
};

export const flagCell = (option: OpenCellOption) => (dispatch: Dispatch) => {
  dispatch({
    type: FLAG_CELL,
    payload: option,
  });
};

export const questionCell =
  (option: OpenCellOption) => (dispatch: Dispatch) => {
    dispatch({
      type: QUESTION_CELL,
      payload: option,
    });
  };
export const normalizeCell =
  (option: OpenCellOption) => (dispatch: Dispatch) => {
    dispatch({
      type: NORMALIZE_CELL,
      payload: option,
    });
  };
