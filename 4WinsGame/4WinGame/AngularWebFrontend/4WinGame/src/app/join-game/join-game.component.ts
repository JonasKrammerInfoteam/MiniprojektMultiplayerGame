import { Component, OnInit } from '@angular/core';
import { WaitingGame, WaitingGamesResponse } from '../RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from '../RestAPIClient/FourWinsGameAPIInterface';
import { LoginHolder } from '../Services/loginHolder';
import { snackBarComponent } from '../Services/snackBar';
import { SignalRService } from '../SignalRClient/signal-r.service';

const data: WaitingGame[] = [];

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit{
  displayedColumns: string[] = ["PlayerName"];
  dataSource = data;
  constructor(private fourWinGameAPIInterface: FourWinsGameAPIInterface, private snackBar: snackBarComponent, public loginHolder : LoginHolder, private signalRService: SignalRService) { }

  ngOnInit(): void {
    if(!this.loginHolder.isLoggedIn) {
      this.snackBar.openSnackBar("You are not logged in!");
      return;
    }
    this.signalRService.notifyGameStart.subscribe({
      next: (gameid: string) => {
        console.log("GameID: " + gameid);
        
      },
      error: (error: any) => {
        console.error(error);
        this.snackBar.openSnackBar(error.message);
      },
      complete: () => {

      }
    });

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
  }

  CreateGame(): void {

  }

}
