export class GameValidations {
  virtualContent: number[][] = [[0,0,0],[0,0,0],[0,0,0]];
  originalContent: number[][] = [[0,0,0],[0,0,0],[0,0,0]];
  size: number;

  constructor(value: number[][] = [], size: number = 0) {
    this.size = size - 1;
    this.originalContent = Array.from(value);
    this.virtualContent = Array.from(value);
  }

  didWon(): boolean {
    return this.someoneWonAnyColumn(Players.AI) || this.someoneWonAnyLine(Players.AI) || this.someoneWonAnyDiagonal(Players.AI);
  }

  didLoose(): boolean {
    return this.someoneWonAnyColumn(Players.HUMAN) || this.someoneWonAnyLine(Players.HUMAN) || this.someoneWonAnyDiagonal(Players.HUMAN);
  }

  getDeep(): number {
    let deep = 0;
    for (let j = 0; j <= this.size; j++) {
      for (let i = 0; i <= this.size; i++) {
        deep = (this.originalContent[j][i] === 0) ? deep + 1 : deep;
      }
    }
    return deep;
  }

  nextAvailableCell(current: Play): Play | false {
    const initial = current.y * this.size + current.x;
    console.log('Initial', initial, this.virtualContent);
    for (let j = initial; j < Math.pow(this.size, 2); j++) {
      const x = j % (this.size + 1);
      const y = Math.floor(j / (this.size + 1));
      console.log('x e y:', x, y, j, this.virtualContent[y][x] === 0);
      if (this.virtualContent[y][x] === 0) {
        return {x, y};
      }
    }
    return false;
  }

  someoneWonAnyLine(player: Players): boolean {
    for (let i = 0; i <= this.size; i++) {
      if (this.virtualContent[i][0] !== player) return false;
      if (this.nextRightIsEqual(0, i)) return true;
    }
    return false;
  }

  someoneWonAnyColumn(player: Players): boolean {
    for (let i = 0; i <= this.size; i++) {
      if (this.virtualContent[0][i] !== player) return false;
      if (this.nextBelowIsEqual(i, 0)) return true;
    }
    return false;
  }

  someoneWonAnyDiagonal(player: Players): boolean {
    if (this.virtualContent[0][0] !== player) return false;
    if (this.virtualContent[0][this.size] !== player) return false;
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

export interface Play {
  x: number;
  y: number;
}

enum Players {
  AI = 2,
  HUMAN = 1
}
