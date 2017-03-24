import { AppService, PlayerOptions } from './../app.service';
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

  private boardSum = [[0, 0, 0], [0, 0, 0]];

  private nPlayers: number;
  private playerMarker: number;

  constructor(private service: AppService) {
    this.currentTurn = Math.round(Math.random()) === 0 ? -1 : 1;

    this.boardGame = this.initAndClearBoard();
  }

  initAndClearBoard(): Array<Array<number>> {
    const boardGame: Array<Array<number>> = new Array<Array<number>>();

    for (let x = 0; x < 3; x++) {
      boardGame[x] = [];
      for (let y = 0; y < 3; y++) {
        boardGame[x][y] = 0;
      }
    }
    return boardGame;
  }

  ngOnInit() {
    this.nPlayers = this.service.getOptions().players;
    this.playerMarker = this.service.getOptions().marker;

    if (this.nPlayers === 1 && this.currentTurn !== this.playerMarker) {
      this.botAi(this.currentTurn);
    }
  }

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

      this.boardSum[0][x] += this.currentTurn;
      this.boardSum[1][y] += this.currentTurn;

      this.checkForWinCondition(x, y, this.currentTurn);

      this.currentTurn *= -1;
    }
  }

  checkForWinCondition(x: number, y: number, currentPlayer: number) {
    if (this.boardSum[0][x] === currentPlayer * 3 || this.boardSum[1][y] === currentPlayer * 3) {
      this.winner = currentPlayer;
    }

    let rightDiagonal = 0;
    let leftDiagonal = 0;
    for (let i = 0; i < 3; i++) {
      rightDiagonal += this.boardGame[i][i];
      leftDiagonal += this.boardGame[i][2 - i];
    }
    if (rightDiagonal === currentPlayer * 3 || leftDiagonal === currentPlayer * 3) {
      this.winner = currentPlayer;
    }
  }

  reset() {
    this.boardGame = [];
    this.boardGame = this.initAndClearBoard();

    this.boardSum = [[0, 0, 0], [0, 0, 0]];

    this.winner = 0;
  }

  botAi(currentTurn: number) {
    // if (this.winner === 0 ) {
    //   while (currentTurn === this.currentTurn) {
    //     this.placeMarker(Math.round(Math.random()) * 2, Math.round(Math.random()) * 2);
    //   }
    // }
    // if (this.nPlayers === 1) {
    //     setTimeout(() => {
    //       this.botAi(this.currentTurn);
    //     }, 2000);
    //   }
  }


}
