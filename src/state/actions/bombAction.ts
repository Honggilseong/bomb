import { Dispatch } from "redux";
import { ADD_DATA } from "./bombActionDispatch";

export const addData = () => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_DATA,
  });
};
