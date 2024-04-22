import { GameValidations } from "./GameValidations";
export default class ArtificialPlayer extends GameValidations {

  constructor(value: number[][] = [], size: number = 0) {
    super(value, size);
  }

  steps: Step[] = [];
  bestSnapshots: Step[] = [];
  lastFailedStep: Step | undefined;

  play(): Play {
    const deep = this.getDeep();
    const next = this.nextAvailableCell({x: 0, y: 0});
    this.findPlay(deep, next.x, next.y, Players.AI);
    console.log('Solucao', this.bestSnapshots);
    return {x: 0, y: 0};
  }

  findPlay(deep: number, x: number, y: number, player: Players): Result {
    const next = this.nextAvailableCell({x: x, y: y});
    while (next && this.virtualContent[y][x] === 0) {
      const result = this.makePlay(deep, x, y, player);
      return result;
    }
  }

  makePlay(deep: number, x: number, y: number, player: Players): Result {
    this.virtualContent[y][x] = player;
    this.steps.push({player, deep, x, y});
    if (this.didWon()) {
      this.bestSnapshots = Array.from(this.steps);
      return Result.WIN;
    } else if (this.didLoose()) {
      this.lastFailedStep = this.steps.pop();
      return Result.LOOSE;
    // } else if (deep > 0) {
    //   const lastStep: Play = (this.lastFailedStep?.deep === (deep - 1)) ? {x: this.lastFailedStep.x, y: this.lastFailedStep.y } : {x: 0, y: 0};
    //   const next = this.nextAvailableCell(lastStep);
    //   return this.findPlay(deep - 1, next.x, next.y, player === Players.AI ? Players.HUMAN : Players.AI);
    } else {
      this.bestSnapshots = Array.from(this.steps);
      return Result.DRAW;
    }
  }
}

export interface Play {
  x: number;
  y: number;
}

interface Step extends Play {
  player: number;
  deep: number;
}

enum Result {
  WIN = 1,
  LOOSE = 2,
  DRAW = 3
}

enum Players {
  AI = 2,
  HUMAN = 1
}
