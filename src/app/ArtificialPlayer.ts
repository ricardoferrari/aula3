export default class ArtificialPlayer {

  private AI_PLAYER = 2;
  virtualContent: number[][] = [[0,0,0],[0,0,0],[0,0,0]];
  originalContent: number[][] = [[0,0,0],[0,0,0],[0,0,0]];
  size: number;

  steps: Step[] = [];

  constructor(value: number[][] = [], size: number = 0) {
    this.size = size - 1;
    this.originalContent = Array.from(value);
    this.virtualContent = Array.from(value);
  }

  findCell(deep: number, x: number, y: number) {
    this.virtualContent[y][x] = this.AI_PLAYER;
    this.steps.push({player: 1, deep, x, y});
    if (this.didWon()) {

    }
  }

  didWon(): boolean {
    return this.someoneWonAnyColumn() || this.someoneWonAnyLine() || this.someoneWonAnyDiagonal();
  }

  someoneWonAnyLine(): boolean {
    for (let i = 0; i <= this.size; i++) {
      if (this.nextRightIsEqual(0, i)) return true;
    }
    return false;
  }

  someoneWonAnyColumn(): boolean {
    for (let i = 0; i <= this.size; i++) {
      if (this.nextBelowIsEqual(i, 0)) return true;
    }
    return false;
  }

  someoneWonAnyDiagonal(): boolean {
    if (this.nextDiagonalIsEqual(0, 0)) return true;
    if (this.nextDiagonalInvertedIsEqual(this.size, 0)) return true;
    return false;
  }

  nextRightIsEqual(x: number, y: number): boolean {
    // NOTE: Quando existe uma celula vazia
    if (this.virtualContent[y][x] === 0) return false;
    if (x === (this.size - 1)) return this.virtualContent[y][x] === this.virtualContent[y][x+1];
    return this.virtualContent[y][x] === this.virtualContent[y][x+1] && this.nextRightIsEqual(x+1, y);
  }

  nextBelowIsEqual(x: number, y: number): boolean {
    // NOTE: Quando existe uma celula vazia
    if (this.virtualContent[y][x] === 0) return false;
    if (y === (this.size - 1)) return this.virtualContent[y][x] === this.virtualContent[y+1][x];
    return this.virtualContent[y][x] === this.virtualContent[y+1][x] && this.nextBelowIsEqual(x, y+1);
  }

  nextDiagonalIsEqual(x: number, y: number): boolean {
    // NOTE: Quando existe uma celula vazia
    if (this.virtualContent[y][x] === 0) return false;
    if (y === (this.size - 1)) return this.virtualContent[y][x] === this.virtualContent[y+1][x+1];
    return this.virtualContent[y][x] === this.virtualContent[y+1][x+1] && this.nextDiagonalIsEqual(x+1, y+1);
  }

  nextDiagonalInvertedIsEqual(x: number, y: number): boolean {
    // NOTE: Quando existe uma celula vazia
    if (this.virtualContent[y][x] === 0) return false;
    if (y === (this.size - 1)) return this.virtualContent[y][x] === this.virtualContent[y+1][x-1];
    return this.virtualContent[y][x] === this.virtualContent[y+1][x-1] && this.nextDiagonalInvertedIsEqual(x-1, y+1);
  }
}

interface Step {
  player: number;
  deep: number;
  x: number;
  y: number;
}
