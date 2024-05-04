import { PlayersEnum } from "./enums/players.enum";

export function didWon(virtualContent: PlayersEnum[][]): boolean {
  return someoneWonAnyColumn(PlayersEnum.AI, virtualContent) || someoneWonAnyLine(PlayersEnum.AI, virtualContent) || someoneWonAnyDiagonal(PlayersEnum.AI, virtualContent);
}

export function didLoose(virtualContent: PlayersEnum[][]): boolean {
  return someoneWonAnyColumn(PlayersEnum.HUMAN, virtualContent) || someoneWonAnyLine(PlayersEnum.HUMAN, virtualContent) || someoneWonAnyDiagonal(PlayersEnum.HUMAN, virtualContent);
}

export function someoneWonAnyLine(player: PlayersEnum, virtualContent: PlayersEnum[][]): boolean {
  const size = Math.sqrt(virtualContent.flat(1).length);
  for (let i = 0; i < size; i++) {
    if (virtualContent[i][0] !== player) continue;
    if (nextRightIsEqual(0, i, virtualContent)) return true;
  }
  return false;
}

export function someoneWonAnyColumn(player: PlayersEnum, virtualContent: PlayersEnum[][]): boolean {
  const size = Math.sqrt(virtualContent.flat(1).length);
  for (let i = 0; i < size; i++) {
    if (virtualContent[0][i] !== player) continue;
    if (nextBelowIsEqual(i, 0, virtualContent)) return true;
  }
  return false;
}

export function someoneWonAnyDiagonal(player: PlayersEnum, virtualContent: PlayersEnum[][]): boolean {
  const size = Math.sqrt(virtualContent.flat(1).length);
  let diagonal = false;
  if (virtualContent[0][size-1] === player) {
    diagonal = nextDiagonalInvertedIsEqual(size-1, 0, virtualContent);
  };
  if (virtualContent[0][0] === player) {
    diagonal = nextDiagonalIsEqual(0, 0, virtualContent) || diagonal;
  }
  return diagonal;
}

export function nextRightIsEqual(x: number, y: number, virtualContent: PlayersEnum[][]): boolean {
  const size = Math.sqrt(virtualContent.flat(1).length);
  if (x >= (size - 2)) return virtualContent[y][x] === virtualContent[y][x+1];
  return virtualContent[y][x] === virtualContent[y][x+1] && nextRightIsEqual(x+1, y, virtualContent);
}

export function nextBelowIsEqual(x: number, y: number, virtualContent: PlayersEnum[][]): boolean {
  const size = Math.sqrt(virtualContent.flat(1).length);
  if (y >= (size - 2)) return virtualContent[y][x] === virtualContent[y+1][x];
  return virtualContent[y][x] === virtualContent[y+1][x] && nextBelowIsEqual(x, y+1, virtualContent);
}

export function nextDiagonalIsEqual(x: number, y: number, virtualContent: PlayersEnum[][]): boolean {
  const size = Math.sqrt(virtualContent.flat(1).length);
  if (y >= (size - 2)) return virtualContent[y][x] === virtualContent[y+1][x+1];
  return virtualContent[y][x] === virtualContent[y+1][x+1] && nextDiagonalIsEqual(x+1, y+1, virtualContent);
}

export function nextDiagonalInvertedIsEqual(x: number, y: number, virtualContent: PlayersEnum[][]): boolean {
  const size = Math.sqrt(virtualContent.flat(1).length);
  if (y >= (size - 2)) return virtualContent[y][x] === virtualContent[y+1][x-1];
  return virtualContent[y][x] === virtualContent[y+1][x-1] && nextDiagonalInvertedIsEqual(x-1, y+1, virtualContent);
}

export function whichColumnWon(virtualContent: PlayersEnum[][]): number | false {
  const size = Math.sqrt(virtualContent.flat(1).length);
  for (let i = 0; i < size; i++) {
    if (virtualContent[0][i] === PlayersEnum.NONE) continue;
    if (nextBelowIsEqual(i, 0, virtualContent)) return i;
  }
  return false;
}

export function whichLineWon(virtualContent: PlayersEnum[][]): number | false {
  const size = Math.sqrt(virtualContent.flat(1).length);
  for (let i = 0; i < size; i++) {
    if (virtualContent[i][0] === PlayersEnum.NONE) continue;
    if (nextRightIsEqual(0, i, virtualContent)) return i;
  }
  return false;
}

export function diagonalInvertedWon(virtualContent: PlayersEnum[][]): boolean {
  const size = Math.sqrt(virtualContent.flat(1).length);
  if (virtualContent[0][size-1] === PlayersEnum.NONE) return false;
  return nextDiagonalInvertedIsEqual(size-1, 0, virtualContent);
}

export function diagonalWon(virtualContent: PlayersEnum[][]): boolean {
  if (virtualContent[0][0] === PlayersEnum.NONE) return false;
  return nextDiagonalIsEqual(0, 0, virtualContent);
}
