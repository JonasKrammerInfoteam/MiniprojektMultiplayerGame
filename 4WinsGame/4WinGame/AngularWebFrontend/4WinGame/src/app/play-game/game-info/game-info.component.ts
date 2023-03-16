import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GameInfo, GameInfoResponse, MyPlayer, Player } from 'src/app/RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from 'src/app/RestAPIClient/FourWinsGameAPIInterface';
import { AnimationService } from 'src/app/Services/animation.service';
import { LoginHolder } from 'src/app/Services/loginHolder.service';
import { snackBar } from 'src/app/Services/snackBar.service';
import { SignalRService } from 'src/app/SignalRClient/signal-r.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})

export class GameinfoComponent implements OnInit, AfterViewInit, OnDestroy {
  
  buttonContent : string = "Leave game";
  headLine : string = "Informationen zum aktuellen Spiel";
  playerOne : string = "Spieler 1: ";
  playerZero : string = "Spieler 2: ";
  playerUnknown : string = "Unbekannt";
  currentMove : string = "Aktueller Zug: ";
  yourGameToken : string = "Dein Spielstein: ";
  noGameToken : string = "- / -";
  winner : string = "Gewinner: ";
  gameState : string = "Spielstatus: ";
  gameIsRunning : string = "Spiel läuft ...";
  yourNickname : string = "Dein Nickname: ";
  public animationsEnabled : boolean | undefined;
  private destroy$ : Subject<boolean> = new Subject();

  constructor(private animationService : AnimationService, private fourWinGameAPIInterface: FourWinsGameAPIInterface, private snackBar: snackBar, private route: ActivatedRoute, private loginHolder: LoginHolder, private router: Router, private signalRService:SignalRService, private ref: ChangeDetectorRef) {
    
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
    if (!this.isGameOver)
    {
      if (!confirm("Möchtest du wirklich das Spiel verlassen und zur Lobby zurückkehren?"))
        return;
    }
    this.router.navigate(['/lobby']);
    if (this.isGameOver) return;

    this.fourWinGameAPIInterface.LeaveGame(this.myPlayer, this.gameID).subscribe({
      next: (response: any) => {
      },
      error: (error: any) => {
        console.error(error);
        this.snackBar.openSnackBar(error.message);
      },
      complete: () => { }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.gameID = params["gameid"];
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

    this.animationService.getAnimationsEnabled$().pipe(takeUntil(this.destroy$)).subscribe((value : boolean) => {
      this.animationsEnabled = value;
     });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
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
