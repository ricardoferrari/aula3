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

  content: Board = new Board([
    [PlayersEnum.AI, PlayersEnum.NONE, PlayersEnum.HUMAN],
    [PlayersEnum.HUMAN, PlayersEnum.NONE, PlayersEnum.NONE],
    [PlayersEnum.NONE, PlayersEnum.NONE, PlayersEnum.NONE]
  ]);

  private worker: Worker | undefined;
  constructor() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.worker = new Worker(new URL('./app.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        this.move = data;
        this.content.addMove(PlayersEnum.AI, this.move);
        let result = this.content.checkStatus();

        switch (result) {
          case ResultEnum.WIN:
            this.message = 'Você perdeu!';
            break;
          case ResultEnum.LOOSE:
            this.message = 'Você ganhou!';
            break;
          case ResultEnum.DRAW:
            this.message = 'Empate!';
            break;
        }
        console.log(`page got message: ${data.x}, ${data.y} from worker`);
      };
    }
  }

  runWorker() {
    this.worker?.postMessage(this.content);
  }

  resetBoard() {
    this.content.reset(3);
  }

  setCell(x: number,y: number) {
    this.content.addMove(PlayersEnum.HUMAN, {x, y});
  }

}
