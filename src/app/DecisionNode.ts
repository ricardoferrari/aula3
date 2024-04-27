import { ResultEnum } from './enums/result.enum';
import { PlayersEnum } from "./enums/players.enum";
import { Move } from './interfaces/Move';
import { BoardSnapshot } from './models/BoardSnapshot';

export class DecisionNode {

  player: PlayersEnum;
  result: ResultEnum = ResultEnum.DRAW;
  score: number = 0;
  move: Move;
  board: BoardSnapshot;

  parent: DecisionNode | undefined;

  status: ResultEnum = ResultEnum.DRAW;

  constructor(_player: PlayersEnum, _move: Move, _board: BoardSnapshot, _parent?: DecisionNode) {
    this.player = _player;
    this.move = _move;
    this.board = _board;
    this.parent = _parent;
  }

  check(): ResultEnum {
    this.status = this.board.checkStatus();
    return this.status;
  }

}
