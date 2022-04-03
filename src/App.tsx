import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Buttons from "./components/Buttons";
import Form from "./components/Form";
import Table from "./components/Table";
import { RootState } from "./state/reducer";

function App() {
  const state = useSelector((state: RootState) => state.bomb);
  return (
    <div className="flex justify-center items-center w-full flex-col h-full ">
      <h1 className="text-2xl font-bold mb-10">지뢰찾기</h1>
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
