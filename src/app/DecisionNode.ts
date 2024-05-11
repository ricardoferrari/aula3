import { ResultEnum } from './enums/result.enum';
import { PlayersEnum } from "./enums/players.enum";
import { Move } from './interfaces/Move';
import { BoardSnapshot } from './models/BoardSnapshot';

export class DecisionNode {

  identifier: string = 'UNDEFINED';
  player: PlayersEnum;
  result: ResultEnum = ResultEnum.DRAW;
  score: number = 0;
  move: Move;
  board: BoardSnapshot;

  parent: DecisionNode | undefined;
  childs: Map<string, DecisionNode> = new Map<string, DecisionNode>();
  deepness: number = 0;

  status: ResultEnum = ResultEnum.DRAW;

  constructor(_player: PlayersEnum, _move: Move, _board: PlayersEnum[][], _parent?: DecisionNode, _identifier?: string) {
    this.player = _player;
    this.board = new BoardSnapshot(_board);
    this.move = _move;
    this.board.addMove(this.player, this.move);
    this.parent = _parent;
    this.identifier = _identifier ?? 'UNDEFINED';
    this.deepness = _parent ? _parent.deepness + 1 : 0;
  }

  addParent(parent: DecisionNode) {
    this.parent = parent;
  }

  addChild(child: DecisionNode) {
    this.childs.set(child.identifier, child);
  }

  getCurrentResults(): ResultEnum {
    return this.board.checkStatus();
  }

  getCurrentScore(result: ResultEnum): number {
    if (result === ResultEnum.WIN) {
      return 1;
    } else if (result === ResultEnum.LOOSE) {
      // NOTE: If the AI looses, it will try to avoid this move when it is its turn
      const loosingCost = 9 - this.deepness;
      return -loosingCost;
    }
    return 0;
  }

  didIAWon(): boolean {
    return this.status === ResultEnum.WIN;
  }

  check() {
    this.status = this.getCurrentResults();
    this.score = this.getCurrentScore(this.status);
    if ((this.status === ResultEnum.DRAW) && (this.board.availableUnlockedCells() > 0)) {
      this.drillDownScore();
    }
  }

  drillDownScore() {
    let nextMove = this.board.nextAvailableCell();
    while (nextMove) {
      let identifierIterator = 'move' + (nextMove ? nextMove.x + '_' + nextMove.y : 'INITIAL' + this.move.x + '_' + this.move.y);
      this.board.lockCell(nextMove);

      const cells = this.board.cloneCells();

      const nextPlayer = this.player === PlayersEnum.AI ? PlayersEnum.HUMAN : PlayersEnum.AI;
      const nextNode = new DecisionNode(nextPlayer, nextMove, cells, this, identifierIterator);
      nextNode.addParent(this);
      this.addChild(nextNode);

      nextMove = this.board.nextAvailableCell();
    }
  }

  updateScore() {
    this.check();
    if (this.childs.size === 0) {
      return this.score;
    }
    let sum = 0;
    // NOTE Firstly, we check if the AI has lost in any of the next possible moves
    if (this.player === PlayersEnum.AI) {
      let lowestScore = 0;
      for (const child of this.childs.values()) {
        const score = child.updateScore();
        if (score < lowestScore) {
          lowestScore = score;
        }
      }
      return lowestScore;
    }
    // NOTE: If the AI has not lost, we calculate the average of the scores
    for (const child of this.childs.values()) {
      const score: number = child.updateScore();
      if (score < 0) {
        this.score -= score;
        return score;
      }

      sum += score;
    }
    this.score = sum / this.childs.size;
    return this.score;
  }

}
