import { ResultEnum } from './enums/result.enum';
import { PlayersEnum } from "./enums/players.enum";
import { Move } from './interfaces/Move';
import { BoardSnapshot } from './models/BoardSnapshot';

export class DecisionNode {

  identifier: number = 0;
  player: PlayersEnum;
  result: ResultEnum = ResultEnum.DRAW;
  score: number = 0;
  move: Move;
  board: BoardSnapshot;

  parent: DecisionNode | undefined;
  childs: Map<number, DecisionNode> = new Map<number, DecisionNode>();

  status: ResultEnum = ResultEnum.DRAW;

  constructor(_player: PlayersEnum, _move: Move, _board: PlayersEnum[][], _parent?: DecisionNode, _identifier?: number) {
    this.player = _player;
    this.board = new BoardSnapshot(_board);
    this.move = _move;
    this.board.addMove(this.player, this.move);
    this.parent = _parent;
    this.identifier = _identifier ?? 0;
  }

  addParent(parent: DecisionNode) {
    this.parent = parent;
  }

  addChild(child: DecisionNode) {
    this.childs.set(child.identifier, child);
  }

  getCurrentResults(): ResultEnum {
    const status = this.board.checkStatus();
    if (status === ResultEnum.WIN) {
      this.score = 1;
    } else if (status === ResultEnum.LOOSE) {
      this.score = -1;
    } else {
      this.score = 0;
    }
    return status;
  }

  getCurrentScore(): number {
    const status = this.board.checkStatus();
    if (status === ResultEnum.WIN) {
      return 1;
    } else if (status === ResultEnum.LOOSE) {
      return -1;
    }
    return 0;
  }

  check() {
    this.status = this.getCurrentResults();
    this.score = this.getCurrentScore();
    if (this.status === ResultEnum.DRAW && this.board.availableCells() > 0) {
      this.drillDownScore();
    }
  }

  drillDownScore() {
    let nextMove = this.board.nextAvailableCell();
    let identifierIterator = this.identifier + 1;
    while (nextMove) {
      this.board.lockCell(nextMove);

      const cells = this.board.cloneCells();

      const nextPlayer = this.player === PlayersEnum.AI ? PlayersEnum.HUMAN : PlayersEnum.AI;
      const nextNode = new DecisionNode(nextPlayer, nextMove, cells, this, identifierIterator);
      nextNode.addParent(this);
      this.addChild(nextNode);

      nextMove = this.board.nextAvailableCell();
      identifierIterator++;
    }
  }

  updateScore() {
    this.check();
    if (this.childs.size === 0) {
      return this.score;
    }
    let sum = 0;
    for (const child of this.childs.values()) {
      const score = child.updateScore();
      if ((score === -1) && (this.player === PlayersEnum.AI)) {
        this.score -= 1;
        return -1;
      }
      sum += score;
    }
    this.score = sum / this.childs.size;
    return this.score;
  }

}
