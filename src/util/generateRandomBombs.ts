import { ArrayItem } from "../components/Board";

export const generateRandomBombs = (
  data: ArrayItem[][],
  height: number,
  width: number,
  bombs: number
) => {
  let bombsPlanted = 0;

  while (bombsPlanted < bombs) {
    let randomX = Math.floor(Math.random() * width);
    let randomY = Math.floor(Math.random() * height);
    if (!data[randomX][randomY].isBomb) {
      data[randomX][randomY].isBomb = true;
      bombsPlanted++;
    }
  }
  return data;
};

export const getNearBombs = (
  i: number,
  j: number,
  data: ArrayItem[][],
  height: number,
  width: number
) => {
  let nearBombs: any[] = [];
  const surroundings = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  surroundings.forEach(([x, y]) => {
    const newX = i + x;
    const newY = j + y;
    if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
      nearBombs.push(data[newX][newY]);
    }
  });
  return nearBombs;
};

export const generateNearBombs = (
  data: ArrayItem[][],
  height: number,
  width: number
) => {
  let copyArray = data;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      let bombs = 0;
      const area = getNearBombs(
        data[i][j].x,
        data[i][j].y,
        data,
        height,
        width
      );
      area.map((value) => {
        if (value.isBomb) {
          return bombs++;
        }
        return 0;
      });
      copyArray[i][j].nearBombs = bombs;
    }
  }
  return copyArray;
};
