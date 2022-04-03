import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/reducer";
import Td from "./Td";

interface Props {
  rowIndex: number;
}

function Tr({ rowIndex }: Props) {
  const bombsArray = useSelector((state: RootState) => state.bomb);
  return (
    <tr>
      {bombsArray.table[0] &&
        Array(bombsArray.table[0].length)
          .fill("")
          .map((tr, i) => (
            <Td key={i.toString()} rowIndex={rowIndex} cellIndex={i} />
          ))}
    </tr>
  );
}

export default Tr;
