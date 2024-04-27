import { PlayersEnum } from "../enums/players.enum";
import { Move } from "../interfaces/Move";
import { Board } from "./Board";

export class BoardSnapshot extends Board {
  cellsLocked: boolean[];

  constructor(_cells: PlayersEnum[][]) {
    super(_cells);
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
}
