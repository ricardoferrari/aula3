import { PlayersEnum } from "../enums/players.enum";
import { ResultEnum } from "../enums/result.enum";
import { diagonalInvertedWon, diagonalWon, didLoose, didWon, whichColumnWon, whichLineWon } from "../functions";
import { Move } from "../interfaces/Move";

export class Board {
  cells: PlayersEnum[][];


  constructor(_cells: PlayersEnum[][]) {
    this.cells = Array.from(_cells);
 }

 cloneCells() {
    const newCells = Array();

    for (const line of this.cells) {
      const newRow = Array();
      for (const row of line) {
        newRow.push(row);
      }
      newCells.push(newRow);
    }
    return newCells;
  }

  checkStatus() : ResultEnum {
    if (didWon(this.cells)) return ResultEnum.WIN;
    if (didLoose(this.cells)) return ResultEnum.LOOSE;
    return ResultEnum.DRAW;
  }

  cellsPaintedWhenSomeoneWin() : boolean[][] {
    const line = whichLineWon(this.cells);
    if (line !== false && line >= 0) {
      return this.emptyPainted().map((col) => col.map((_, _line) => _line === line));
    }

    const column = whichColumnWon(this.cells);
    if (column !== false && column >= 0) {
      return this.emptyPainted().map((col, _col) => col.map(() => _col === column));
    }

    const diagonal = diagonalWon(this.cells);
    if (diagonal) {
      return this.emptyPainted().map((col, _col) => col.map((_, _line) => _col === _line));
    }

    const diagonalInverted = diagonalInvertedWon(this.cells);
    if (diagonalInverted) {
      return this.emptyPainted().map((col, _col) => col.map((_, _line) => _col === 2 - _line));
    }

    return this.emptyPainted();
  }

  emptyPainted() {
    return [
      [false, false, false],
      [false, false, false],
      [false, false, false]
    ];
  }

  addMove(player: PlayersEnum, move: Move) {
    if (this.cells[move.y][move.x] === PlayersEnum.NONE) {
      this.cells[move.y][move.x] = player;
    }
  }

  availableCells(): number {
    return this.cells.flat(1).filter(cell => cell === PlayersEnum.NONE).length;
  }

  cleanMove(move: Move) {
    this.cells[move.y][move.x] = PlayersEnum.NONE;
  }

  reset(size: number) {
    this.cells = [
      [PlayersEnum.NONE, PlayersEnum.NONE, PlayersEnum.NONE],
      [PlayersEnum.NONE, PlayersEnum.NONE, PlayersEnum.NONE],
      [PlayersEnum.NONE, PlayersEnum.NONE, PlayersEnum.NONE]
    ];
  }

  // NOTE: This method is used to shuffle the board
  shuffle() {
    const shuffled = this.cells.flat(1).sort(() => Math.random() - 0.5);
    this.cells = [
      [shuffled[0], shuffled[1], shuffled[2]],
      [shuffled[3], shuffled[4], shuffled[5]],
      [shuffled[6], shuffled[7], shuffled[8]]
    ];
  }
}
