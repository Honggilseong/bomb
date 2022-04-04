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
  // row cell 만큼 배열을 만들어줍니다.
  const candidate = Array(intRow * intCell)
    .fill("")
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];
  while (candidate.length > intRow * intCell - intBombs) {
    //지뢰의 갯수만큼 지뢰를 랜덤으로 배열에 넣어줍니다.
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }
  const data = [];
  // 지뢰 없는 칸들을 만들어줍니다.
  for (let i = 0; i < intRow; i++) {
    const rowData: number[] = [];
    data.push(rowData);
    for (let j = 0; j < intCell; j++) {
      //row 방향 데이터들을 넣어주고 data 배열에 넣어줍니다.
      rowData.push(CODE.NORMAL);
    }
  }
  for (let k = 0; k < shuffle.length; k++) {
    //한 곳에 뭉치지 않게 칸마다 잘 들어 갈 수 있게 랜덤하게 폭탄을 넣어줍니다.
    const ver = Math.floor(shuffle[k] / intCell);
    const hor = shuffle[k] % intCell;
    data[ver][hor] = CODE.BOMB;
  }
  console.log(data);
  return data;
};
