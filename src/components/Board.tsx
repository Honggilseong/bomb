import React from "react";

function Board() {
  const dimension = {
    width: 10,
    height: 10,
  };
  //generate 2d array [0,1,2,3,4,5,6,7,8,9] * width
  const array2D = Array(dimension.width)
    .fill("")
    .map((_, indexH) =>
      Array(dimension.height)
        .fill("")
        .map((_, indexW) => indexW)
    );
  return (
    <div>
      <div className={`grid grid-cols-10 grid-rows-10`}>
        {array2D.map((row, i) =>
          row.map((col, j) => (
            <div
              className="p-2 border border-black"
              key={`${i}-${j}`}
              data-dimension={`${i}-${j}`}
            >
              <p className="text-2xl">{col}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Board;
