import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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

  private board: Board = new Board();
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
    this.worker?.postMessage('hello');
  }

}

class Board {
  value: number[] = [];
  constructor(value: number = 0, width: number = 0, height: number = 0) {
    for (let i = 0; i < width * height; i++) {
      this.value[i] = value;
    }
  }

  get(x: number, y: number): number {
    return this.value[x + y];
  }
}
