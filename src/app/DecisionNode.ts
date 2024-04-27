import { ResultEnum } from './enums/result.enum';
import { PlayersEnum } from "./enums/players.enum";
import { Move } from './interfaces/Move';
import { BoardSnapshot } from './interfaces/BoardSnapshot';
import { didWon } from './functions';

export class DecisionNode {

  player: PlayersEnum;
  result: ResultEnum = ResultEnum.DRAW;
  score: number = 0;
  move: Move;
  board: BoardSnapshot;

  parent: DecisionNode | undefined;

  constructor(_player: PlayersEnum, _move: Move, _board: BoardSnapshot, _parent?: DecisionNode) {
    this.player = _player;
    this.move = _move;
    this.board = _board;
    this.parent = _parent;
  }

  check() {
    console.log(this.board.checkStatus());
  }

}
