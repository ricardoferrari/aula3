import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Board } from './models/Board';
import { PlayersEnum } from './enums/players.enum';
import { Move } from './interfaces/Move';
import { ResultEnum } from './enums/result.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aula3';
  move: Move = {x: 0, y: 0};
  message: string = '';
  isProcessing = false;
  isEnd = false;

  readonly resultEnum = ResultEnum;
  result: ResultEnum = ResultEnum.DRAW;

  content: Board = new Board([
    [PlayersEnum.AI, PlayersEnum.NONE, PlayersEnum.HUMAN],
    [PlayersEnum.HUMAN, PlayersEnum.NONE, PlayersEnum.NONE],
    [PlayersEnum.NONE, PlayersEnum.NONE, PlayersEnum.NONE]
  ]);

  painted: boolean[][] = [[false, false, false], [false, false, false], [false, false, false]];

  private worker: Worker | undefined;
  constructor() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.worker = new Worker(new URL('./app.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        this.isProcessing = false;
        this.move = data;
        this.content.addMove(PlayersEnum.AI, this.move);

        this.checkStatus();

        console.log(`page got message: ${data.x}, ${data.y} from worker`);
      };
    }
  }

  runWorker() {
    if (this.content.availableCells() > 0) {
      this.isProcessing = true;
      this.worker?.postMessage(this.content);
    }
  }

  resetBoard() {
    this.content.reset(3);
    this.painted = [[false, false, false], [false, false, false], [false, false, false]];
    this.message = '';
    this.isEnd = false;
  }

  setCell(x: number,y: number) {
    if (this.isEnd || this.isProcessing) return;
    this.content.addMove(PlayersEnum.HUMAN, {x, y});
    this.checkStatus();
    // NOTE: Write after the human plays then run the worker
    this.runWorker();
  }

  checkStatus() {
    this.result = this.content.checkStatus();

    switch (this.result) {
      case ResultEnum.WIN:
        this.message = 'Você perdeu!';
        this.painted = this.content.cellsPaintedWhenSomeoneWin();
        this.isEnd = true;
        break;
      case ResultEnum.LOOSE:
        this.message = 'Você ganhou!';
        this.painted = this.content.cellsPaintedWhenSomeoneWin();
        this.isEnd = true;
        break;
      case ResultEnum.DRAW:
        if (this.content.availableCells() === 0) {
          this.message = 'Empate!';
          this.isEnd = true;
        }
        break;
    }
  }

  paintedCell(x: number, y: number): boolean {
    return this.painted[y][x];
  }

}
