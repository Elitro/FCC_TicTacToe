import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private currentTurn: number;

  private winner = 0;

  private boardGame: Array<Array<number>> = new Array<Array<number>>();

  constructor() {
    this.currentTurn = Math.round(Math.random()) === 0 ? -1 : 1;

    for (let x = 0; x < 3; x++) {
      this.boardGame[x] = [];
      for (let y = 0; y < 3; y++) {
        this.boardGame[x][y] = 0;
      }
    }
  }

  ngOnInit() { }

  markerParse(value: number): string {
    switch (value) {
      case -1:
        return 'O';
      case 1:
        return 'X';
      default:
        return '';
    }
  }

  placeMarker(x: number, y: number) {

    if (this.boardGame[x][y] === 0 && this.winner === 0) {
      this.boardGame[x][y] = this.currentTurn;
      this.currentTurn *= -1;
      this.checkForWinCondition(x);
    }

  }

  checkForWinCondition(row: number) {
    if (this.checkRow(this.boardGame[row])) {
      this.winner = this.boardGame[row][0];
      return;
    }
  }

  checkRow(row: Array<number>) {
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] !== row[i + 1]) {
        return false;
      }
    }
    return true;
  }


}
