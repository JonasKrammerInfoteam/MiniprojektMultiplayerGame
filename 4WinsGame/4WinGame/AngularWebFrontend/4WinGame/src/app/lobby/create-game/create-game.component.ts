import { AfterViewInit, Component, OnInit, } from '@angular/core';
import { LoginHolder } from 'src/app/Services/loginHolder';
import { SignalRService } from 'src/app/SignalRClient/signal-r.service';
import { snackBarComponent } from '../../Services/snackBar';
import { FourWinsGameAPIInterface } from 'src/app/RestAPIClient/FourWinsGameAPIInterface';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/globalconstants';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})

export class CreateGameComponent implements OnInit, AfterViewInit{
  
  private hasAlreadyWaitingGame = false;

  constructor(private fourWinGameAPIInterface: FourWinsGameAPIInterface, private snackBar: snackBarComponent, public loginHolder : LoginHolder, private signalRService: SignalRService, private router: Router) {}

  ngAfterViewInit(): void {
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
  }

  ngOnInit(): void {
    if(!this.loginHolder.isLoggedIn) {
      this.snackBar.openSnackBar("You are not logged in!");
      return;
    }

    
  }

  public animationsEnabled() : boolean {
    return GlobalConstants.EnableAnimations;
  }


  PlayerHasAlreadyWaitingGame()  {
    if(this.loginHolder.loggedInPlayer!=undefined) {
      this.fourWinGameAPIInterface.PlayerHasAlreadyWaitingGame(this.loginHolder.loggedInPlayer).subscribe({
        next: (response: any) => {
          let res: boolean = response as boolean
          this.hasAlreadyWaitingGame = response;
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

  ClickCreateGameNow() : void {
    this.snackBar.openSnackBar("Klicke auf den grünen Button, um ein Spiel zu erstellen");
  }

  CreateGame(): void {
    if(this.loginHolder.loggedInPlayer!=undefined) {
      if(this.hasAlreadyWaitingGame==false) {
        this.fourWinGameAPIInterface.CreateGame(this.loginHolder.loggedInPlayer).subscribe({
          next: (response: any) => {
            this.snackBar.openSnackBar("Game was created successfully!");  
            this.hasAlreadyWaitingGame = true;   
            this.fourWinGameAPIInterface.GetWaitingGames().subscribe({
              next: () => {            
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
      } else {
        console.error("Player created already waiting game!");
        this.snackBar.openSnackBar("You have already created a game and you are now in waiting queue");
      }
    }
  }
}
