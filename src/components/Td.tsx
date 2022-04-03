import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCell } from "../state/actions/bombAction";
import { RootState } from "../state/reducer";
import { CODE } from "../util/generateBomb";

interface Props {
  rowIndex: number;
  cellIndex: number;
}

const getStyle = (code: number) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.BOMB:
      return {
        background: "#444",
      };
    case CODE.OPENED:
      return {
        background: "white",
      };
    default:
      return {
        background: "white",
      };
  }
};

const getBombs = (code: number) => {
  switch (code) {
    case CODE.NORMAL:
      return "";
    case CODE.BOMB:
      return "X";
    default:
      return code || "";
  }
};

function Td({ rowIndex, cellIndex }: Props) {
  const bombsArray = useSelector((state: RootState) => state.bomb);
  const dispatch = useDispatch();
  const onClickTable = () => {
    switch (bombsArray.table[rowIndex][cellIndex]) {
      case CODE.NORMAL:
        dispatch(
          openCell({ row: rowIndex.toString(), cell: cellIndex.toString() })
        );
        return;
      default:
        return;
    }
  };
  return (
    <td
      className="border border-black w-10 h-10"
      onClick={() => onClickTable()}
      style={getStyle(bombsArray.table[rowIndex][cellIndex])}
    >
      <div className="flex justify-center items-center">
        <p>{getBombs(bombsArray.table[rowIndex][cellIndex])}</p>
      </div>
    </td>
  );
}

export default Td;
