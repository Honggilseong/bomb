export const START_GAME = "START_GAME";

export interface StartOption {
  row: string;
  cell: string;
  bombs: string;
}

export interface startGame {
  type: typeof START_GAME;
  payload: StartOption;
}

export type bombActionDispatch = startGame;
