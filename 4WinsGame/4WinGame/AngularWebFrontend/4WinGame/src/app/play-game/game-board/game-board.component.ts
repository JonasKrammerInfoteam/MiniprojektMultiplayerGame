import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { GameInfo, GameInfoResponse, MyPlayer, Player, WaitingGamesResponse } from 'src/app//RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from 'src/app/RestAPIClient/FourWinsGameAPIInterface';
import { LoginHolder } from 'src/app//Services/loginHolder';
import { snackBarComponent } from 'src/app//Services/snackBar';
import { SignalRService } from 'src/app//SignalRClient/signal-r.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})

export class GameboardComponent {
  constructor(private fourWinGameAPIInterface: FourWinsGameAPIInterface, private snackBar: snackBarComponent, private route: ActivatedRoute, private loginHolder: LoginHolder, private router: Router, private signalRService:SignalRService, private ref: ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    this.GetGameInfo();
  }

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
  isGameOver: boolean = false;
  winnerName: string | undefined;

  public FloorDivision(n: number, divider: number): number
  {
    return (n - n % divider) / divider as number;
  }

  public DoMove(column: number): void {
   
    if (!this.isGameOver)
    {
      this.fourWinGameAPIInterface.DoMove(column, this.gameID, this.myPlayer).subscribe({
        next: (response: any) => {
          console.log("Placed in column: " + column);
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

  public LeaveGame(): void {
    console.log("LeaveGame() called");
    this.router.navigate(['/lobby']);
    if (!this.isGameOver)
    {
      this.fourWinGameAPIInterface.LeaveGame(this.myPlayer, this.gameID).subscribe({
        next: (response: any) => {
          console.log("Game leave");
        },
        error: (error: any) => {
          console.error(error);
          this.snackBar.openSnackBar(error.message);
        },
        complete: () => { }
      });
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.gameID = params["gameid"];
        console.log(this.gameID);
      }
    );
    this.signalRService.notifyGameFinished.subscribe({
      next: (winner: any) => {
        let res: Player = winner as Player
        this.winnerName = winner.playerName;
        this.snackBar.openSnackBar("Winner: " + winner.playerName);
        this.isGameOver = true;
      },
      error: (error: any) => {
        console.error(error);
        this.snackBar.openSnackBar(error.message);
      },
      complete: () => {}
    });

    this.signalRService.notifyGameUpdated.subscribe(() => { console.log("Game Updated..."); this.GetGameInfo(); });

  }

  GetGameInfo():void{
    this.fourWinGameAPIInterface.GetGameInfo(this.gameID, this.myPlayer.playerID).subscribe({
      next: (response: any) => {
        let res: GameInfoResponse = response as GameInfoResponse;
        this.gameData = res.gameInfo;
        this.board = this.gameData.board;
        this.opponent = this.gameData.opponent;
        this.yourMove = this.gameData.yourMove;
        this.ref.detectChanges();    
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
