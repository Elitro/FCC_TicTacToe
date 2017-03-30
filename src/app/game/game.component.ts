import { AppService, PlayerOptions } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private currentTurn: number;

  private winner = 0;

  private boardGame: Array<Array<number>> = new Array<Array<number>>();

  private boardSum = [[0, 0, 0], [0, 0, 0], [0]];

  private nPlayers: number;
  private playerMarker: number;

  constructor(private service: AppService, private activatedRoute: ActivatedRoute) {
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

    this.activatedRoute.params.subscribe(params => {
      this.playerMarker = parseInt(params['marker']);
      this.nPlayers = parseInt(params['players']);
    }).unsubscribe();

    // TODO: Infinite loop bug?

    this.botAi(this.currentTurn, this.playerMarker);
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

  playerPlay(x: number, y: number) {
    this.placeMarker(x, y);

    this.botAi(this.currentTurn, this.playerMarker);


  }

  placeMarker(x: number, y: number) {
    if (this.boardGame[x][y] === 0 && this.winner === 0) {
      this.boardGame[x][y] = this.currentTurn;

      this.boardSum[0][x] += this.currentTurn;
      this.boardSum[1][y] += this.currentTurn;
      this.boardSum[2][0] += 1;

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

  botAi(currentTurn: number, playerMarker: number) {
    if (this.nPlayers === 1 && currentTurn !== playerMarker && this.winner === 0) {
      this.ensureBotCanPlaceMarker(this.boardSum, this.boardGame);
    }
    // if (this.nPlayers === 1) {
    //   setTimeout(() => {
    //     this.botAi(this.currentTurn);
    //   }, 2000);
    // }
  }

  ensureBotCanPlaceMarker(boardSum: Array<any>, boardGame: Array<any>) {
    if (boardSum[2][0] < 8) {
      let x: number, y: number;
      do {
        x = Math.round(Math.random()) * 2;
        y = Math.round(Math.random()) * 2;
      } while ((boardGame[x][y]) !== 0);

      this.placeMarker(x, y);
    }
  }


}
