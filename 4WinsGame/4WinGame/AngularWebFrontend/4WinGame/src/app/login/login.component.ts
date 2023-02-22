import { Component } from '@angular/core';
import { RegisterPlayerResponse } from '../RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from '../RestAPIClient/FourWinsGameAPIInterface';
import { snackBarComponent } from '../Services/snackBar';
import { SignalRService } from '../SignalRClient/signal-r.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fourWinGameApiInterface:FourWinsGameAPIInterface, private signalRService:SignalRService, private snackBarService: snackBarComponent) {}
  
  public RegisterName: string = "";

  RegisterPlayer(){
    this.fourWinGameApiInterface.RegisterPlayer(this.RegisterName, this.signalRService.connectionId).subscribe({
      next: (response: any) => {
        console.log(response);
        let res: RegisterPlayerResponse = response as RegisterPlayerResponse;
        this.snackBarService.openSnackBar("Welcome:" + res.registeredPlayer.playerName);
        
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

