import React from "react";

function Buttons() {
  return (
    <div className="flex justify-evenly items-center mb-5 w-full max-w-lg">
      <div className="border bg-cyan-500 p-3 border-cyan-700 cursor-pointer  rounded-lg hover:bg-cyan-700">
        <p className="text-white">Beginner</p>
      </div>
      <div className="border  rounded-lg bg-cyan-500 p-3 border-cyan-700 cursor-pointer hover:bg-cyan-700">
        <p className="text-white">Intermediate</p>
      </div>
      <div className="border rounded-lg bg-cyan-500 p-3 border-cyan-700 cursor-pointer hover:bg-cyan-700">
        <p className="text-white">Expert</p>
      </div>
    </div>
  );
}

export default Buttons;
