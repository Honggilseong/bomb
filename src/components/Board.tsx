import React from "react";
import {
  generateNearBombs,
  generateRandomBombs,
} from "../util/generateRandomBombs";

export interface ArrayItem {
  x: number;
  y: number;
  isBomb: boolean;
  nNumber: number;
  nearBombs?: number;
}

function Board() {
  const dimension = {
    width: 10,
    height: 10,
  };
  //generate 2d array [0,1,2,3,4,5,6,7,8,9] * width
  const array2D: ArrayItem[][] = Array(dimension.width)
    .fill("")
    .map((_, indexH) =>
      Array(dimension.height)
        .fill("")
        .map((_, indexW) => ({
          x: indexH,
          y: indexW,
          isBomb: false,
          nNumber: 0,
        }))
    );
  let arrayWithBombs = generateRandomBombs(
    array2D,
    dimension.height,
    dimension.width,
    10
  );
  let arrayWithNearBombs = generateNearBombs(
    arrayWithBombs,
    dimension.height,
    dimension.width
  );
  return (
    <div>
      <div className={`grid grid-cols-10 grid-rows-10`}>
        {arrayWithNearBombs.map((row, i) =>
          row.map((col, j) => (
            <div
              className="p-2 border border-black w-10 h-10 justify-center flex items-center"
              key={`${i}-${j}`}
              data-dimension={`${i}-${j}`}
            >
              <p className="text-2xl">
                {array2D[col.x][col.y].isBomb ? "💣" : `${col.nearBombs}`}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Board;
