import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startGame } from "../state/actions/bombAction";

function Form() {
  const [row, rowSet] = useState<string>("10");
  const [cell, cellSet] = useState<string>("10");
  const [bombs, bombsSet] = useState<string>("10");
  const dispatch = useDispatch();

  const onChangeNumber = (
    setState: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(event.target.value);
  };

  const onStartGame = () => {
    dispatch(startGame({ row, cell, bombs }));
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <p>세로</p>
        <input
          type="number"
          placeholder="세로"
          value={row}
          onChange={(event) => onChangeNumber(rowSet, event)}
        />
      </div>
      <div className="flex flex-col items-center">
        <p>가로</p>
        <input
          type="number"
          placeholder="가로"
          value={cell}
          onChange={(event) => onChangeNumber(cellSet, event)}
        />
      </div>
      <div className="flex flex-col items-center">
        <p>지뢰</p>
        <input
          type="number"
          placeholder="지뢰"
          value={bombs}
          onChange={(event) => onChangeNumber(bombsSet, event)}
        />
      </div>

      <div onClick={() => onStartGame()}>
        <p>시작</p>
      </div>
    </div>
  );
}

export default Form;
