import { bombActionDispatch } from "../actions/bombActionDispatch";

interface InitialState {
  timer: number;
  result: string;
}

const initialState = {
  timer: 0,
  result: "",
};
const BombReducer = (
  state: InitialState = initialState,
  action: bombActionDispatch
) => {
  switch (action.type) {
    case "ADD_DATA": {
      return state;
    }
    default:
      return state;
  }
};
export default BombReducer;
