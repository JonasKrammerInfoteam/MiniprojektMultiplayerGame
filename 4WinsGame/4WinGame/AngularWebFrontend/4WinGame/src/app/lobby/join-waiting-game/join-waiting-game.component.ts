import { AfterViewInit, Component, OnInit, Output } from '@angular/core';
import { JoinGameResponse, WaitingGame, WaitingGamesResponse } from '../../RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from '../../RestAPIClient/FourWinsGameAPIInterface';
import { LoginHolder } from '../../Services/loginHolder.service';
import { snackBar } from '../../Services/snackBar.service';
import { SignalRService } from '../../SignalRClient/signal-r.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AnimationService } from 'src/app/Services/animation.service';

@Component({
  selector: 'app-join-waiting-game',
  templateUrl: './join-waiting-game.component.html',
  styleUrls: ['./join-waiting-game.component.css']
})
export class JoinWaitingGameComponent implements OnInit, AfterViewInit{
  headLine : string = "Vorhandenem Spiel beitreten";
  buttonContent : string = "Spiel joinen";
  playerWaiting : string = "Wartende Spieler:";
  displayedColumns: string[] = ["PlayerName"];
  data: WaitingGame[] = [];
  animationsEnabled : boolean | undefined;
  private destroy$ : Subject<boolean> = new Subject();


  ngOnDestroy(): void {
    this.destroy$.next(true);
  }


  constructor(private animationService : AnimationService, private fourWinGameAPIInterface: FourWinsGameAPIInterface, private snackBar: snackBar, public loginHolder : LoginHolder, private signalRService: SignalRService, private router: Router) { }
  ngAfterViewInit(): void {
    this.LoadWaitingGames();
    this.signalRService.notifyGameStart.subscribe({
      next: (resgameId: string) => {
        console.log("GameID: " + resgameId);
        this.router.navigate(
          ['/play'],
          { queryParams: { gameid: resgameId } }
        );
      },
      error: (error: any) => {
        console.error(error);
        this.snackBar.openSnackBar(error.message);
      },
      complete: () => {}
    });

    this.signalRService.notifyWaitingListUpdated.subscribe(() => { console.log("LoadWaitingList..."); this.LoadWaitingGames()});
  }

  ngOnInit(): void {
    this.animationService.getAnimationsEnabled$().pipe(takeUntil(this.destroy$)).subscribe((value : boolean) => {
      this.animationsEnabled = value;
     });
    if(!this.loginHolder.isLoggedIn) {
      this.snackBar.openSnackBar("You are not logged in!");
      return;
    }

    
  }

  LoadWaitingGames(){
    this.fourWinGameAPIInterface.GetWaitingGames().subscribe({
      next: (response: any) => {
        let res: WaitingGamesResponse = response as WaitingGamesResponse;
        this.data = res.waitingGames;
        console.log("Loaded list");
      },
      error: (error: any) => {
        console.error(error);
        this.snackBar.openSnackBar(error.message);
      },
      complete: () => {

      }
    });
  }

  private playAudio(source : string): void{
    let audio = new Audio();
    audio.src = source;
    audio.load();
    audio.play();
  }

  JoinGame(index : number): void {
    console.log("loginHolder.loggedInPlayer" + this.loginHolder.loggedInPlayer);
    if(this.loginHolder.loggedInPlayer == undefined) return;
    if(this.loginHolder.loggedInPlayer.playerID) {

    }
    this.fourWinGameAPIInterface.JoinGame(this.loginHolder.loggedInPlayer, index).subscribe({
      next: (response: any) => {
        let res: JoinGameResponse = response as JoinGameResponse
        console.log(res.gameID);
      
        if(this.animationsEnabled) {
          this.playAudio("../../../assets/sounds/gamestart.mp3");
        }
      },
      error: (error: any) => {
        if (error.status == 500)
        {
          this.snackBar.openSnackBar("It is not possible to play a game against yourself");
          return;
        }
        console.error(error);
        this.snackBar.openSnackBar(error.message);
      },
      complete: () => {

      }
    });
    
  }
}
