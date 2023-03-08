import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameInfo, GameInfoResponse, MyPlayer, Player } from 'src/app/RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from 'src/app/RestAPIClient/FourWinsGameAPIInterface';
import { LoginHolder } from 'src/app//Services/loginHolder';
import { snackBarComponent } from 'src/app/Services/snackBar';
import { SignalRService } from 'src/app/SignalRClient/signal-r.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})

export class GameinfoComponent implements OnInit, AfterViewInit {
  
  constructor(private fourWinGameAPIInterface: FourWinsGameAPIInterface, private snackBar: snackBarComponent, private route: ActivatedRoute, private loginHolder: LoginHolder, private router: Router, private signalRService:SignalRService, private ref: ChangeDetectorRef) {
    console.log("Constructor");
  }
  
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
  myPlayer: MyPlayer = this.loginHolder.loggedInPlayer as MyPlayer;
  isGameOver: boolean = false;
  winnerName: string | undefined;
  playerIndexOfList : number = 0;

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
        this.playerIndexOfList = this.gameData.playerNumber;
        this.ref.detectChanges();
        console.log("GetGameInfo() was called");

        console.log("opponent: " + this.opponent);
        console.log("yourMove: " + this.yourMove);
        console.log("playerNumber: " + this.playerIndexOfList);
        console.log("playerNumber: " + this.gameData.playerNumber);

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
