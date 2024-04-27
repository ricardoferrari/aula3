import { PlayersEnum } from "../enums/players.enum";
import { ResultEnum } from "../enums/result.enum";
import { didLoose, didWon } from "../functions";
import { Move } from "./Move";

export class BoardSnapshot {
  cells: PlayersEnum[][];
  cellsLocked: boolean[];

  constructor(_cells: PlayersEnum[][]) {
    this.cells = Array.from(_cells);
    this.cellsLocked = Array(this.cells.flat.length).fill(false);
    this.cellsLocked = this.cells.flat(1).map(cell => cell !== PlayersEnum.NONE);
    console.log('Snapshot:', this.cells, this.cellsLocked);
  }

  nextAvailableCell(): Move | false {
    const firstAvailable = this.cellsLocked.indexOf(false);
    if (firstAvailable < 0) return false;

    const move: Move = {
      x: (firstAvailable % 3),
      y: Math.floor(firstAvailable / 3)
    }
    return move;
  }

  checkStatus() : ResultEnum {
    if (didWon(this.cells)) return ResultEnum.WIN;
    if (didLoose(this.cells)) return ResultEnum.LOOSE;
    return ResultEnum.DRAW;
  }
}
