import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameInfo, GameInfoResponse, MyPlayer, Player } from 'src/app/RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from 'src/app/RestAPIClient/FourWinsGameAPIInterface';
import { LoginHolder } from 'src/app/Services/loginHolder.service';
import { snackBar } from 'src/app/Services/snackBar.service';
import { SignalRService } from 'src/app//SignalRClient/signal-r.service';
import { Subject, takeUntil } from 'rxjs';
import { AnimationService } from 'src/app/Services/animation.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})

export class GameboardComponent {

  headLine : string = "Spielfeld";
  buttonContent : string = "Stein legen";

  constructor(private animationService : AnimationService, private fourWinGameAPIInterface: FourWinsGameAPIInterface, private snackBar: snackBar, private route: ActivatedRoute, private loginHolder: LoginHolder, private router: Router, private signalRService:SignalRService, private ref: ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    this.GetGameInfo();
  }

  gameData: GameInfo | undefined;
  gameID: string = "";
  board: number[][] = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
  ];
  lastBoard: number[][] = this.board;

  opponent: Player | undefined;
  yourMove: Boolean = false;
  myPlayer: MyPlayer = this.loginHolder.loggedInPlayer as MyPlayer;
  isGameOver: boolean = false;
  winnerName: string | undefined;
  gameTokenAnimationRunning: Boolean = false;

  
  public animationsEnabled : boolean | undefined;
  private destroy$ : Subject<boolean> = new Subject();
  ANIMATION_TIME: number = 20;

  public GetEmptyFieldsOfColumn(column : number) : number {
    if(!(column >= 1 && column <= 7)) { return -1;
    }

    let result : number = 6;
    for(let row = 5; row > -1; row--) {
      if(this.board[row][column-1] != 0) {
        result--;
      } else {
        return result;
      }
    } 
    return result;
  }

  public FloorDivision(n: number, divider: number): number
  {
    return (n - n % divider) / divider as number;
  }

  private getLastMoveColumn(): number
  {
    for (let row = 0; row < 6; row++)
    {
      for (let column = 0; column < 7; column++)
      {
        if (this.board[row][column] != this.lastBoard[row][column])
        {
          return column+1 as number;
        }
      }
    }
    return -1;
  }

  private animateBoard(column: number): void
  {
    this.gameTokenAnimationRunning = true;
    for (let row = 0; row < 6; row++)
    {
      if(this.board[row][column-1] != 0)
      {
        this.board[row][column-1] = 0;
        break;
      }
    }
    var maxLength = this.GetEmptyFieldsOfColumn(column);
    for(let i = 0; i < maxLength; i++) {
      setTimeout(()=>{   
        if(i > 0) {
          this.board[i-1][column-1] = 0;
        }
        if(this.gameData?.playerNumber == undefined) return;

        if(this.yourMove)
        {
          this.board[i][column-1] = (this.gameData?.playerNumber-3) * -1;
        } else {
          this.board[i][column-1] = this.gameData?.playerNumber;
        }
        if(this.animationsEnabled) {
          this.playAudio("../../../assets/sounds/placedGameToken.mp3");
        }
      }, i*this.ANIMATION_TIME);
    }
    setTimeout(()=>{ this.gameTokenAnimationRunning = false; }, (maxLength-1)*this.ANIMATION_TIME);
    
  }

  public DoMove(column: number): void {
    this.yourMove = false;
    this.fourWinGameAPIInterface.DoMove(column, this.gameID, this.myPlayer).subscribe({
      next: (response: any) => {
      },
      error: (error: any) => {
        console.error(error);
        this.snackBar.openSnackBar(error.message);
      },
      complete: () => {

      }
    });
  }

  private playAudio(source: string): void{
    let audio = new Audio();
    audio.src = source;
    audio.load();
    audio.play();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.gameID = params["gameid"];
      }
    );
    this.signalRService.notifyGameFinished.subscribe({
      next: (winner: any) => {
        console.log("game finished");
        let res: Player = winner as Player
        this.winnerName = winner.playerName;
        this.snackBar.openSnackBar("Winner: " + winner.playerName);
        this.isGameOver = true;
        if(this.animationsEnabled) {
          if(this.winnerName == this.myPlayer.playerName) {
            this.playAudio("../../../assets/sounds/winner.mp3");
          } else {
            this.playAudio("../../../assets/sounds/loser.mp3");
          }
        }
      },
      error: (error: any) => {
        console.error(error);
        this.snackBar.openSnackBar(error.message);
      },
      complete: () => {}
    });

    this.signalRService.notifyGameUpdated.subscribe(() => { console.log("Game Updated..."); this.GetGameInfo(); });
    this.animationService.getAnimationsEnabled$().pipe(takeUntil(this.destroy$)).subscribe((value : boolean) => {
      this.animationsEnabled = value;
     });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  public LeaveGame(): void {
    console.log("\n\nisGameOver: " + this.isGameOver + " game-board\n\n");
    this.router.navigate(['/lobby']);
    if (this.isGameOver)
    {
      return;
    }
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

  GetGameInfo(): void {
    this.fourWinGameAPIInterface.GetGameInfo(this.gameID, this.myPlayer.playerID).subscribe({
      next: (response: any) => {
        let res: GameInfoResponse = response as GameInfoResponse;
        this.gameData = res.gameInfo;
        this.board = this.gameData.board;
        this.animateBoard(this.getLastMoveColumn());
        this.lastBoard = this.board;
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
