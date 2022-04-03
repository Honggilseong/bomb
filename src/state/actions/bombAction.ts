import { Dispatch } from "redux";
import { StartOption, START_GAME } from "./bombActionDispatch";

export const addData = (option: StartOption) => (dispatch: Dispatch) => {
  dispatch({
    type: START_GAME,
    payload: option,
  });
};
