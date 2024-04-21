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
  content: number[][] = [[0,0,0],[0,0,0],[0,0,0]];

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
    this.content[y][x] = 1;
  }

}
