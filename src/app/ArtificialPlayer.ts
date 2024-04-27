import { GameValidations } from "./GameValidations";
export default class ArtificialPlayer extends GameValidations {

  constructor(value: number[][] = [], size: number = 0) {
    super(value, size);
  }

  steps: Step[] = [];
  bestSnapshots: Step[] = [];
  lastFailedStep: Step | undefined;
  limiter: number;

  play(): Play {
    const deep = this.getDeep();
    this.limiter = 0;
    this.findPlay(deep, 0, 0, Players.AI);
    console.log('Solucao', this.bestSnapshots);
    return {x: 0, y: 0};
  }

  findPlay(deep: number, x: number, y: number, player: Players): Result {
    let next: Play | false = this.nextAvailableCell({x, y});
    while (next && this.virtualContent[next.y][next.x] === 0 && this.limiter < 40) {
      this.limiter++;
      const result = this.makePlay(deep, next.x, next.y, player);
      console.log('Next', next);
      console.log('Snapshot', this.bestSnapshots);
      console.log('Result', result);
      if (result === Result.WIN) {
        return Result.WIN;
      } else {
        const lastX = next.x;
        const lastY = next.y;
        this.virtualContent[lastY][lastX] = 0;
        const failedStep: Play | undefined = this.steps.pop();
        next = this.nextAvailableCell({ x: next.x, y: next.y});
        console.log('Failed', failedStep);
      }
    }
    return Result.DRAW;
  }

  makePlay(deep: number, _x: number, _y: number, player: Players): Result {
    this.virtualContent[_y][_x] = player;
    this.steps.push({player, deep, x: _x, y: _y});
    if (this.didWon()) {
      this.bestSnapshots = Array.from(this.steps);
      return Result.WIN;
    } else if (this.didLoose()) {
      this.lastFailedStep = this.steps.pop();
      return Result.LOOSE;
    } else if (deep > 0) {
      const next = this.nextAvailableCell({x: _x, y: _y});
      if (next) {
        return this.findPlay(deep - 1, 0, 0, player === Players.AI ? Players.HUMAN : Players.AI);
      }
      return Result.DRAW;
    } else {
      // Validar se realmente é melhor do que o anterior
      if (this.bestSnapshots.length > this.steps.length) this.bestSnapshots = Array.from(this.steps);
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
