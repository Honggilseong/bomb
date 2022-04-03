import React from "react";
import "./App.css";
import Form from "./components/Form";

function App() {
  return (
    <div className="flex justify-center items-center w-full flex-col h-full ">
      <h1 className="text-2xl font-bold mb-10">지뢰찾기</h1>
      <Form />
    </div>
  );
}

export default App;
