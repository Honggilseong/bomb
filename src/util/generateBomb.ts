export const CODE = {
  BOMB: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_BOMB: -4,
  FLAG_BOMB: -5,
  CLICKED_BOMB: -6,
  OPENED: 0,
};
export const generateBomb = (row: string, cell: string, bombs: string) => {
  console.log(row, cell, bombs);
  const intRow = parseInt(row);
  const intCell = parseInt(cell);
  const intBombs = parseInt(bombs);
  const candidate = Array(intRow * intCell)
    .fill("")
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];
  while (candidate.length > intRow * intCell - intBombs) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }
  const data = [];

  for (let i = 0; i < intRow; i++) {
    const rowData: any = [];
    data.push(rowData);
    for (let j = 0; j < intCell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / intCell);
    const hor = shuffle[k] % intCell;
    data[ver][hor] = CODE.BOMB;
  }
  console.log(data);
  return data;
};
