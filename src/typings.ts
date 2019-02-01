export interface IPosition {
  x: number;
  y: number;
}

export interface IMineButton {
  isMine: boolean;
  postion: IPosition;
  isOpen: boolean;
  isFlag: boolean;
  showContent: number | '*' | '^' | ' ';
  realContent: number;
}
