import { AfterViewInit, Component, OnInit, Output } from '@angular/core';
import { JoinGameResponse, WaitingGame, WaitingGamesResponse } from '../../RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from '../../RestAPIClient/FourWinsGameAPIInterface';
import { LoginHolder } from '../../Services/loginHolder.service';
import { snackBar } from '../../Services/snackBar.service';
import { SignalRService } from '../../SignalRClient/signal-r.service';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/Services/global.constants';

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
  constructor(private fourWinGameAPIInterface: FourWinsGameAPIInterface, private snackBar: snackBar, public loginHolder : LoginHolder, private signalRService: SignalRService, private router: Router) { }
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
    if(!this.loginHolder.isLoggedIn) {
      this.snackBar.openSnackBar("You are not logged in!");
      return;
    }

    
  }

  animationsEnabled() : boolean {
    return GlobalConstants.EnableAnimations;
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

  JoinGame(index : number): void {
    if(this.loginHolder.loggedInPlayer!=undefined) {
      
      this.fourWinGameAPIInterface.JoinGame(this.loginHolder.loggedInPlayer, index).subscribe({
        next: (response: any) => {
          let res: JoinGameResponse = response as JoinGameResponse
          console.log(res.gameID);
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
}
