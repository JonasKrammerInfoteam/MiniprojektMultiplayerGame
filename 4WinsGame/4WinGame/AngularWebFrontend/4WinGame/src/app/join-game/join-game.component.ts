import { Component, OnInit } from '@angular/core';
import { WaitingGame, WaitingGamesResponse } from '../RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from '../RestAPIClient/FourWinsGameAPIInterface';
import { LoginHolder } from '../Services/loginHolder';
import { snackBarComponent } from '../Services/snackBar';

const data: WaitingGame[] = [];

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit{
  displayedColumns: string[] = ["PlayerName"];
  dataSource = data;
  constructor(private fourWinGameAPIInterface: FourWinsGameAPIInterface, private snackBar: snackBarComponent, public loginHolder : LoginHolder) { }

  ngOnInit(): void {
    if(!this.loginHolder.isLoggedIn) {
      this.snackBar.openSnackBar("You are not logged in!");
      return;
    }
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
      this.fourWinGameAPIInterface.JoinGame(this.loginHolder.loggedInPlayer, index);
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
