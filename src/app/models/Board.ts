import { PlayersEnum } from "../enums/players.enum";
import { ResultEnum } from "../enums/result.enum";
import { didLoose, didWon } from "../functions";
import { Move } from "../interfaces/Move";

export class Board {
  cells: PlayersEnum[][];


  constructor(_cells: PlayersEnum[][]) {
    this.cells = Array.from(_cells);
 }

  checkStatus() : ResultEnum {
    if (didWon(this.cells)) return ResultEnum.WIN;
    if (didLoose(this.cells)) return ResultEnum.LOOSE;
    return ResultEnum.DRAW;
  }

  addMove(player: PlayersEnum, move: Move) {
    if (this.cells[move.y][move.x] === PlayersEnum.NONE) {
      this.cells[move.y][move.x] = player;
    }
  }
}
