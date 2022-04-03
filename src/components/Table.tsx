import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/reducer";
import Tr from "./Tr";

function Table() {
  const bombsArray = useSelector((state: RootState) => state.bomb);
  return (
    <table>
      <tbody>
        {Array(bombsArray.table.length)
          .fill("")
          .map((tr, i) => (
            <Tr key={i.toString()} rowIndex={i} />
          ))}
      </tbody>
    </table>
  );
}

export default Table;
