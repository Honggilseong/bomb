import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Buttons from "./components/Buttons";
import Form from "./components/Form";
import Table from "./components/Table";
import { setTimer } from "./state/actions/bombAction";
import { RootState } from "./state/reducer";

function App() {
  const state = useSelector((state: RootState) => state.bomb);
  const dispatch = useDispatch();
  useEffect(() => {
    let cleanTimer: NodeJS.Timeout;

    if (!state.timerCheck) {
      cleanTimer = setInterval(() => {
        dispatch(setTimer());
      }, 1000);
    }
    return () => clearInterval(cleanTimer);
  }, [state.gameState, state.timerCheck]);
  return (
    <div className="flex justify-center items-center w-full flex-col h-full ">
      <h1 className="text-2xl font-bold mb-10">지뢰찾기</h1>
      <p>시간</p>
      <div className=" bg-black p-3 mb-5 rounded-full">
        <p className=" text-red-700 font-bold text-3xl">{state.timer}</p>
      </div>
      {state.result && (
        <h2 className="font-bold text-8xl mb-5">{state.result}</h2>
      )}
      <Buttons />
      <Table />
      <Form />
    </div>
  );
}

export default App;
