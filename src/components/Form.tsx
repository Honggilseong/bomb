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
    <div className="flex mt-10">
      <h1 className="self-center mr-5 font-bold text-lg">커스텀 설정</h1>

      <div className="flex flex-row items-center">
        <p className="border-b border-blue-600">세로</p>
        <input
          type="number"
          placeholder="세로"
          value={row}
          onChange={(event) => onChangeNumber(rowSet, event)}
          className="w-10"
        />
      </div>
      <div className="flex flex-row items-center">
        <p className="border-b border-blue-600">가로</p>
        <input
          type="number"
          placeholder="가로"
          value={cell}
          onChange={(event) => onChangeNumber(cellSet, event)}
          className="w-10"
        />
      </div>
      <div className="flex flex-row items-center">
        <p className="border-b border-blue-600">지뢰</p>
        <input
          type="number"
          placeholder="지뢰"
          value={bombs}
          onChange={(event) => onChangeNumber(bombsSet, event)}
          className="w-10"
        />
      </div>

      <div
        onClick={() => onStartGame()}
        className="border border-cyan-700 p-3 flex justify-center items-center cursor-pointer bg-cyan-500 rounded-lg ml-5 hover:bg-cyan-700"
      >
        <p className="text-white">시작</p>
      </div>
    </div>
  );
}

export default Form;
