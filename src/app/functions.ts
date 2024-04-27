import { PlayersEnum } from "./enums/players.enum";

export function didWon(virtualContent: PlayersEnum[][]): boolean {
  return someoneWonAnyColumn(PlayersEnum.AI, virtualContent) || someoneWonAnyLine(PlayersEnum.AI, virtualContent) || someoneWonAnyDiagonal(PlayersEnum.AI, virtualContent);
}

export function didLoose(virtualContent: PlayersEnum[][]): boolean {
  return someoneWonAnyColumn(PlayersEnum.HUMAN, virtualContent) || someoneWonAnyLine(PlayersEnum.HUMAN, virtualContent) || someoneWonAnyDiagonal(PlayersEnum.HUMAN, virtualContent);
}

export function getAvailableCells(cells: PlayersEnum[][]): number {
  const available: number = cells
                                  .flat(1)
                                  .map(cell => (cell !== PlayersEnum.NONE) ? 0 : 1)
                                  .map<number>(value => value)
                                  .reduce((amount, x) => (amount + x));
  return available;
}

export function someoneWonAnyLine(player: PlayersEnum, virtualContent: PlayersEnum[][]): boolean {
  const size = virtualContent.flat.length;
  for (let i = 0; i <= size; i++) {
    if (virtualContent[i][0] !== player) return false;
    if (nextRightIsEqual(0, i, virtualContent)) return true;
  }
  return false;
}

export function someoneWonAnyColumn(player: PlayersEnum, virtualContent: PlayersEnum[][]): boolean {
  const size = virtualContent.flat.length;
  for (let i = 0; i <= size; i++) {
    if (virtualContent[0][i] !== player) return false;
    if (nextBelowIsEqual(i, 0, virtualContent)) return true;
  }
  return false;
}

export function someoneWonAnyDiagonal(player: PlayersEnum, virtualContent: PlayersEnum[][]): boolean {
  const size = virtualContent.flat.length;
  if (virtualContent[0][0] !== player) return false;
  if (virtualContent[0][size] !== player) return false;
  if (nextDiagonalIsEqual(0, 0, virtualContent)) return true;
  if (nextDiagonalInvertedIsEqual(size, 0, virtualContent)) return true;
  return false;
}

export function nextRightIsEqual(x: number, y: number, virtualContent: PlayersEnum[][]): boolean {
  const size = virtualContent.flat.length;
  if (virtualContent[y][x] === 0) return false;
  if (x === (size - 1)) return virtualContent[y][x] === virtualContent[y][x+1];
  return virtualContent[y][x] === virtualContent[y][x+1] && nextRightIsEqual(x+1, y, virtualContent);
}

export function nextBelowIsEqual(x: number, y: number, virtualContent: PlayersEnum[][]): boolean {
  const size = virtualContent.flat.length;
  if (virtualContent[y][x] === 0) return false;
  if (y === (size - 1)) return virtualContent[y][x] === virtualContent[y+1][x];
  return virtualContent[y][x] === virtualContent[y+1][x] && nextBelowIsEqual(x, y+1, virtualContent);
}

export function nextDiagonalIsEqual(x: number, y: number, virtualContent: PlayersEnum[][]): boolean {
  const size = virtualContent.flat.length;
  if (virtualContent[y][x] === 0) return false;
  if (y === (size - 1)) return virtualContent[y][x] === virtualContent[y+1][x+1];
  return virtualContent[y][x] === virtualContent[y+1][x+1] && nextDiagonalIsEqual(x+1, y+1, virtualContent);
}

export function nextDiagonalInvertedIsEqual(x: number, y: number, virtualContent: PlayersEnum[][]): boolean {
  const size = virtualContent.flat.length;
  if (virtualContent[y][x] === 0) return false;
  if (y === (size - 1)) return virtualContent[y][x] === virtualContent[y+1][x-1];
  return virtualContent[y][x] === virtualContent[y+1][x-1] && nextDiagonalInvertedIsEqual(x-1, y+1, virtualContent);
}
