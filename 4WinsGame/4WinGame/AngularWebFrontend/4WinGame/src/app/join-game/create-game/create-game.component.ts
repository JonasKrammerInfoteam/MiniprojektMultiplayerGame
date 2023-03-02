import { AfterViewInit, Component, OnInit, } from '@angular/core';
import { LoginHolder } from 'src/app/Services/loginHolder';
import { SignalRService } from 'src/app/SignalRClient/signal-r.service';
import {  WaitingGame, WaitingGamesResponse } from '../../RestAPIClient/Contracts/RestAPI.Contracts';
import { snackBarComponent } from '../../Services/snackBar';
import { FourWinsGameAPIInterface } from 'src/app/RestAPIClient/FourWinsGameAPIInterface';
import { Router } from '@angular/router';

const data: WaitingGame[] = [];

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})

export class CreateGameComponent implements OnInit, AfterViewInit{
  
  dataSource = data;

  constructor(private fourWinGameAPIInterface: FourWinsGameAPIInterface, private snackBar: snackBarComponent, public loginHolder : LoginHolder, private signalRService: SignalRService, private router: Router) {}

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
