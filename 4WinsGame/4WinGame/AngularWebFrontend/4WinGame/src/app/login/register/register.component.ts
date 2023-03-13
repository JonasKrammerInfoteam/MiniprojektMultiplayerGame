import { Component, OnInit } from '@angular/core';
import { RegisterPlayerResponse } from 'src/app/RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from 'src/app/RestAPIClient/FourWinsGameAPIInterface';
import { GlobalConstants } from 'src/app/Services/global.constants';
import { LoginHolder } from 'src/app/Services/loginHolder.service';
import { snackBar } from 'src/app/Services/snackBar.service';
import { SignalRService } from 'src/app/SignalRClient/signal-r.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  headLine : string = "Registrieren";
  username : string = "Name";
  playContent : string = "play now!";
  
  constructor(private fourWinGameApiInterface:FourWinsGameAPIInterface, private signalRService:SignalRService, private snackBarService: snackBar, private loginHolder: LoginHolder) {}

  ngOnInit(): void {
    GlobalConstants.SetGameStateToLogin();
  }

  public RegisterName: string = "";

  public animationsEnabled() : boolean {
    return GlobalConstants.EnableAnimations;
  }

  ClickPlayNowText() : void{
    this.snackBarService.openSnackBar("Gib deinen Nutzernamen ein und klicke auf Register");
  }

  RegisterPlayer(){
    this.fourWinGameApiInterface.RegisterPlayer(this.RegisterName, this.signalRService.connectionId).subscribe({
      next: (response: any) => {
        console.log(response);
        let res: RegisterPlayerResponse = response as RegisterPlayerResponse;
        this.snackBarService.openSnackBar("Welcome:" + res.registeredPlayer.playerName);
        this.loginHolder.Login(res.registeredPlayer);        
      },
      error: (error: any) => {
        console.error(error);
        this.snackBarService.openSnackBar(error.message, );
      },
      complete: () => {

      }
    });
  }
  
}

