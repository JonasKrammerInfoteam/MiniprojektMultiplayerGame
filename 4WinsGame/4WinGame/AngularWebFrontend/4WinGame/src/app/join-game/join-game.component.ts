import { AfterViewInit, Component, OnInit, Output } from '@angular/core';
import { JoinGameResponse, WaitingGame, WaitingGamesResponse } from '../RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from '../RestAPIClient/FourWinsGameAPIInterface';
import { LoginHolder } from '../Services/loginHolder';
import { snackBarComponent } from '../Services/snackBar';
import { SignalRService } from '../SignalRClient/signal-r.service';
import { Router } from '@angular/router';

const data: WaitingGame[] = [];

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ["PlayerName"];
  dataSource = data;
  constructor(private fourWinGameAPIInterface: FourWinsGameAPIInterface, private snackBar: snackBarComponent, public loginHolder : LoginHolder, private signalRService: SignalRService, private router: Router) { }
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

  LoadWaitingGames(){
    this.fourWinGameAPIInterface.GetWaitingGames().subscribe({
      next: (response: any) => {
        let res: WaitingGamesResponse = response as WaitingGamesResponse;
        this.dataSource = res.waitingGames;
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

  PlayerHasAlreadyWaitingGame() {
    if(this.loginHolder.loggedInPlayer!=undefined) {
      this.fourWinGameAPIInterface.PlayerHasAlreadyWaitingGame(this.loginHolder.loggedInPlayer).subscribe({
        next: (response: any) => {
          let res: boolean = response as boolean
          console.log(res.valueOf());
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

  CreateGame(): void {
    if(this.loginHolder.loggedInPlayer!=undefined) {
    this.fourWinGameAPIInterface.CreateGame(this.loginHolder.loggedInPlayer).subscribe({
      next: (response: any) => {
        this.snackBar.openSnackBar("Game was created successfully!");     
        this.fourWinGameAPIInterface.GetWaitingGames().subscribe({
          next: (response: any) => {
            let res: WaitingGamesResponse = response as WaitingGamesResponse;
            this.dataSource = res.waitingGames;
            
          },
          error: (error: any) => {
            console.error(error);
            this.snackBar.openSnackBar(error.message);
          },
          complete: () => {
    
          }
        });
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
