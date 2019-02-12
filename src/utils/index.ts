import { IMineButton, IPosition } from '../typings';

export const ROW_COUNT = 20;
export const COL_COUNT = 30;
export const MINE_COUNT = 50;

export function initialMap(srcMap: IMineButton[][]) {
  for (let i = 0; i < MINE_COUNT; ++i) {
    while (true) {
      const x = Math.round(Math.random() * (srcMap.length - 1));
      const y = Math.round(Math.random() * (srcMap[0].length - 1));
      if (srcMap[x][y].isMine === false) {
        srcMap[x][y].isMine = true;
        srcMap[x][y].realContent = -1;
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
  const queue: IPosition[] = [];
  const dir = [[0, 1], [0, -1], [1, 0], [1, -1], [1, 1], [-1, 0], [-1, -1], [-1, 1]];
  queue.push(pos);
  while (queue.length > 0) {
    const cur = queue.pop();
    if (cur) {
      srcMap[cur.x][cur.y].isOpen = true;
      srcMap[cur.x][cur.y].showContent =
      (srcMap[cur.x][cur.y].realContent === 0) ? ' ' : srcMap[cur.x][cur.y].realContent;
      for (const d of dir) {
        const nextPos: IPosition = { x: cur.x + d[0], y: cur.y + d[1] };
        if (nextPos.x >= 0 && nextPos.x < srcMap.length
          && nextPos.y >= 0 && nextPos.y < srcMap[0].length) {
          if (srcMap[nextPos.x][nextPos.y].realContent === 0
            && srcMap[nextPos.x][nextPos.y].isOpen === false) {
            queue.push(nextPos);
          } else if (srcMap[nextPos.x][nextPos.y].isOpen === false
          && srcMap[nextPos.x][nextPos.y].isMine === false
          && srcMap[cur.x][cur.y].realContent === 0) {
            srcMap[nextPos.x][nextPos.y].isOpen = true;
            srcMap[nextPos.x][nextPos.y].showContent = srcMap[nextPos.x][nextPos.y].realContent;
          }
        }
      }
    }
  }
}
