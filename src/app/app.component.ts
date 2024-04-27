import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Board } from './models/Board';
import { PlayersEnum } from './enums/players.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aula3';
  workerStatus = '';

  content: Board = new Board([
    [PlayersEnum.AI, PlayersEnum.HUMAN, PlayersEnum.HUMAN],
    [PlayersEnum.NONE, PlayersEnum.AI, PlayersEnum.AI],
    [PlayersEnum.NONE, PlayersEnum.NONE, PlayersEnum.AI]
  ]);

  private worker: Worker | undefined;
  constructor() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.worker = new Worker(new URL('./app.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        this.workerStatus = data;
        console.log(`page got message: ${data}`);
      };
    }
  }

  runWorker() {
    this.worker?.postMessage(this.content);
  }

  setCell(x: number,y: number) {
    this.content.addMove(PlayersEnum.HUMAN, {x, y});
  }

}
