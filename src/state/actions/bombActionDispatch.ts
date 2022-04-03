export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_BOMB = "CLICK_BOMB";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";

export interface StartOption {
  row: string;
  cell: string;
  bombs: string;
}

export interface OpenCellOption {
  row: string;
  cell: string;
}

export interface startGame {
  type: typeof START_GAME;
  payload: StartOption;
}

export interface openCell {
  type: typeof OPEN_CELL;
  payload: OpenCellOption;
}

export interface clickBomb {
  type: typeof CLICK_BOMB;
  payload: OpenCellOption;
}

export interface flagCell {
  type: typeof FLAG_CELL;
  payload: OpenCellOption;
}

export interface questionCell {
  type: typeof QUESTION_CELL;
  payload: OpenCellOption;
}

export interface normalizeCell {
  type: typeof NORMALIZE_CELL;
  payload: OpenCellOption;
}

export type bombActionDispatch =
  | startGame
  | openCell
  | clickBomb
  | flagCell
  | questionCell
  | normalizeCell;
