import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { RegisterPlayerResponse } from '../RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from '../RestAPIClient/FourWinsGameAPIInterface';
import { snackBarComponent } from '../Services/snackBar';
import { SignalRService } from '../SignalRClient/signal-r.service';
import { LoginHolder } from '../Services/loginHolder';
import { GlobalConstants } from '../common/globalconstants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fourWinGameApiInterface:FourWinsGameAPIInterface, private signalRService:SignalRService, private snackBarService: snackBarComponent, private loginHolder: LoginHolder) {}
  
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

