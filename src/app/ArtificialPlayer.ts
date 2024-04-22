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
    this.findPlay(deep, 0, 0, Players.AI);
    console.log('Solucao', this.bestSnapshots);
    return {x: 0, y: 0};
  }

  findPlay(deep: number, x: number, y: number, player: Players): void {
    let limiter = 0;
    let next: Play | false = this.nextAvailableCell({x, y});
    while (next && this.virtualContent[next.y][next.x] === 0 && limiter < 20) {
      limiter++;
      const result = this.makePlay(deep, next.x, next.y, player);
      console.log('Next', next);
      console.log('Snapshot', this.bestSnapshots);
      console.log('Result', result);
      if (result === Result.WIN) {
        break;
      } else {
        const lastX = next.x;
        const lastY = next.y;
        next = this.nextAvailableCell({x: next.x, y: next.y});
        this.virtualContent[lastY][lastX] = 0;
        const failedStep: Play | undefined = this.steps.pop();
        console.log('Failed', failedStep);
      }
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
      // Validar se realmente é melhor do que o anterior
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
