export default class Board {
  content: number[][] = [[0,0,0],[0,0,0],[0,0,0]];
  size: number;

  lineWon: boolean = false;
  columnWon: boolean = false;
  diagonalWon: boolean = false;
  playerWon: number = 0;
  constructor(value: number[][] = [], size: number = 0) {
    this.size = size - 1;
    this.content = Array.from(value);
  }

  get(x: number, y: number): number {
    return this.content[y][x];
  }

  someoneWonAnyLine(): boolean {
    for (let i = 0; i <= this.size; i++) {
      if (this.nextRightIsEqual(0, i)) {
        this.lineWon = true;
        this.playerWon = this.content[i][0];
        break;
      }
    }
    return this.lineWon;
  }

  someoneWonAnyColumn(): boolean {
    for (let i = 0; i <= this.size; i++) {
      if (this.nextBelowIsEqual(i, 0)) {
        this.columnWon = true;
        this.playerWon = this.content[0][i];
        break;
      }
    }
    return this.columnWon;
  }

  someoneWonAnyDiagonal(): boolean {
    if (this.nextDiagonalIsEqual(0, 0)) {
      this.diagonalWon = true;
      this.playerWon = this.content[0][0];
    }
    if (this.nextDiagonalInvertedIsEqual(this.size, 0)) {
      this.diagonalWon = true;
      this.playerWon = this.content[0][this.size];
    }
    return this.diagonalWon;
  }

  nextRightIsEqual(x: number, y: number): boolean {
    // NOTE: Quando existe uma celula vazia
    if (this.content[y][x] === 0) return false;
    if (x === (this.size - 1)) return this.content[y][x] === this.content[y][x+1];
    return this.content[y][x] === this.content[y][x+1] && this.nextRightIsEqual(x+1, y);
  }

  nextBelowIsEqual(x: number, y: number): boolean {
    // NOTE: Quando existe uma celula vazia
    if (this.content[y][x] === 0) return false;
    if (y === (this.size - 1)) return this.content[y][x] === this.content[y+1][x];
    return this.content[y][x] === this.content[y+1][x] && this.nextBelowIsEqual(x, y+1);
  }

  nextDiagonalIsEqual(x: number, y: number): boolean {
    // NOTE: Quando existe uma celula vazia
    if (this.content[y][x] === 0) return false;
    if (y === (this.size - 1)) return this.content[y][x] === this.content[y+1][x+1];
    return this.content[y][x] === this.content[y+1][x+1] && this.nextDiagonalIsEqual(x+1, y+1);
  }

  nextDiagonalInvertedIsEqual(x: number, y: number): boolean {
    // NOTE: Quando existe uma celula vazia
    if (this.content[y][x] === 0) return false;
    if (y === (this.size - 1)) return this.content[y][x] === this.content[y+1][x-1];
    return this.content[y][x] === this.content[y+1][x-1] && this.nextDiagonalInvertedIsEqual(x-1, y+1);
  }
}
