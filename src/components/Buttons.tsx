import React from "react";
import { useDispatch } from "react-redux";
import { startGame } from "../state/actions/bombAction";

function Buttons() {
  const dispatch = useDispatch();

  const onClickLevel = (row: string, cell: string, bombs: string) => {
    dispatch(startGame({ row, cell, bombs }));
  };
  return (
    <div className="flex justify-evenly items-center mb-5 w-full max-w-lg">
      <div
        className="border bg-cyan-500 p-3 border-cyan-700 cursor-pointer  rounded-lg hover:bg-cyan-700"
        onClick={() => onClickLevel("8", "8", "10")}
      >
        <p className="text-white">Beginner</p>
      </div>
      <div
        className="border  rounded-lg bg-cyan-500 p-3 border-cyan-700 cursor-pointer hover:bg-cyan-700"
        onClick={() => onClickLevel("16", "16", "40")}
      >
        <p className="text-white">Intermediate</p>
      </div>
      <div
        className="border rounded-lg bg-cyan-500 p-3 border-cyan-700 cursor-pointer hover:bg-cyan-700"
        onClick={() => onClickLevel("32", "16", "99")}
      >
        <p className="text-white">Expert</p>
      </div>
    </div>
  );
}

export default Buttons;
