import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private currentTurn: number;

  private boardGame: Array<Array<number>> = new Array<Array<number>>();

  constructor() {
    this.currentTurn = Math.round(Math.random()) === 0 ? -1 : 1;

    let ct = 0;
    for (let x = 0; x < 3; x++) {
      this.boardGame[x] = [];
      for (let y = 0; y < 3; y++) {
        this.boardGame[x][y] = ct;
        ct++;
      }
    }
  }

  ngOnInit() { }

  markerParse(value: number): string {
    if (value === -1) {
      return 'O';
    } else if (value === 1) {
      return 'X';
    }
  }

}
