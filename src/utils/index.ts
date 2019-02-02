import { IMineButton, IPosition } from '../typings';

export function initialMap(srcMap: IMineButton[][]) {
  for (let i = 0; i < 99; ++i) {
    while (true) {
      const x = Math.round(Math.random() * (srcMap.length - 1));
      const y = Math.round(Math.random() * (srcMap[0].length - 1));
      if (srcMap[x][y].isMine === false) {
        srcMap[x][y].isMine = true;
        break;
      }
    }
  }
  const dir = [[0, 1], [0, -1], [1, 0], [1, -1], [1, 1], [-1, 0], [-1, -1], [-1, 1]];
  for (const i in srcMap) {
    const x = Number(i);
    for (const j in srcMap[i]) {
      const y = Number(j);
      for (const k of dir) {
        if (srcMap[x][y].isMine) {
          continue;
        }
        if (x + k[0] >= 0 && x + k[0] < srcMap.length && y + k[1] >= 0 && y + k[1] < srcMap[0].length) {
          if (srcMap[x + k[0]][y + k[1]].isMine === true) {
            srcMap[x][y].realContent ++;
          }
        }
      }
    }
  }
}

export function openButton(srcMap: IMineButton[][], pos: IPosition) {
  // noop
}
