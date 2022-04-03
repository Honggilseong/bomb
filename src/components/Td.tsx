import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clickBomb,
  flagCell,
  normalizeCell,
  openCell,
  questionCell,
} from "../state/actions/bombAction";
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
        background: "#9e9e9e",
      };
    case CODE.OPENED:
      return {
        background: "white",
      };
    case CODE.QUESTION:
    case CODE.QUESTION_BOMB:
      return {
        background: "yellow",
      };
    case CODE.FLAG_BOMB:
    case CODE.FLAG:
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
      return "";
    case CODE.CLICKED_BOMB:
      return "💣";
    case CODE.QUESTION:
    case CODE.QUESTION_BOMB:
      return "❓";
    case CODE.FLAG_BOMB:
    case CODE.FLAG:
      return "🚩";
    default:
      return code || "";
  }
};

function Td({ rowIndex, cellIndex }: Props) {
  const bombsArray = useSelector((state: RootState) => state.bomb);
  const dispatch = useDispatch();
  const onClickTable = () => {
    if (bombsArray.gameState) return;
    switch (bombsArray.table[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_BOMB:
      case CODE.FLAG:
      case CODE.QUESTION_BOMB:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL:
        dispatch(
          openCell({ row: rowIndex.toString(), cell: cellIndex.toString() })
        );
        return;
      case CODE.BOMB:
        dispatch(
          clickBomb({ row: rowIndex.toString(), cell: cellIndex.toString() })
        );
        return;
      default:
        return;
    }
  };
  const onRightClick = (event: any) => {
    event.preventDefault();
    switch (bombsArray.table[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.BOMB:
        dispatch(
          flagCell({ row: rowIndex.toString(), cell: cellIndex.toString() })
        );
        return;
      case CODE.FLAG_BOMB:
      case CODE.FLAG:
        dispatch(
          questionCell({ row: rowIndex.toString(), cell: cellIndex.toString() })
        );
        return;
      case CODE.QUESTION_BOMB:
      case CODE.QUESTION:
        dispatch(
          normalizeCell({
            row: rowIndex.toString(),
            cell: cellIndex.toString(),
          })
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
      onContextMenu={(event) => onRightClick(event)}
      style={getStyle(bombsArray.table[rowIndex][cellIndex])}
    >
      <div className="flex justify-center items-center">
        <p>{getBombs(bombsArray.table[rowIndex][cellIndex])}</p>
      </div>
    </td>
  );
}

export default Td;
