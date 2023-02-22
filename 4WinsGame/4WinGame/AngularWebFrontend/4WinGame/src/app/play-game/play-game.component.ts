import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { GameInfo, GameInfoResponse, MyPlayer, Player, WaitingGamesResponse } from '../RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from '../RestAPIClient/FourWinsGameAPIInterface';
import { LoginHolder } from '../Services/loginHolder';
import { snackBarComponent } from '../Services/snackBar';



@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent implements OnInit {
  constructor(private fourWinGameAPIInterface: FourWinsGameAPIInterface, private snackBar: snackBarComponent, private route: ActivatedRoute, private loginHolder: LoginHolder, private router: Router) { }

  gameData: GameInfo | undefined;
  gameID: string = "";
  board: Number[][] = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
  ];
  opponent: Player | undefined;
  yourMove: Boolean = false;
  opponentTest: string = "Gegner";
  myPlayerTest: string = "Spieler";

  myPlayer: MyPlayer = this.loginHolder.loggedInPlayer as MyPlayer;

  public FloorDivision(n: number, divider: number): number
  {
    return (n - n % divider) / divider as number;
  }  

  public DoMove(column: number): void {
    console.log("Placed in column: " + column);
    this.fourWinGameAPIInterface.DoMove(column, this.gameID, this.myPlayer);
  }

  public LeaveGame(): void {
    console.log("LeaveGame() called");
    this.router.navigate(['/lobby']);
    this.fourWinGameAPIInterface.LeaveGame(this.myPlayer, this.gameID);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.gameID = params["gameid"];
        console.log(this.gameID);
      }
    );
  
    this.fourWinGameAPIInterface.GetGameInfo(this.gameID, this.myPlayer.playerID).subscribe({
      next: (response: any) => {
        let res: GameInfoResponse = response as GameInfoResponse;
        this.gameData = res.gameInfo;
        this.board = this.gameData.board;
        this.opponent = this.gameData.opponent;
        this.yourMove = this.gameData.yourMove;        
      },
      error: (error: any) => {
        console.error(error);
        this.snackBar.openSnackBar(error.message);
      },
      complete: () => {

      }
    });
    
  }
}
