import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RegisterPlayerResponse } from 'src/app/RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from 'src/app/RestAPIClient/FourWinsGameAPIInterface';
import { AnimationService } from 'src/app/Services/animation.service';
import { GlobalConstants } from 'src/app/Services/global.constants';
import { LoginHolder } from 'src/app/Services/loginHolder.service';
import { snackBar } from 'src/app/Services/snackBar.service';
import { SignalRService } from 'src/app/SignalRClient/signal-r.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  headLine : string = "Registrieren";
  username : string = "Name";
  playContent : string = "play now!";
  yourname : string = "Dein Name";
  public animationsEnabled : boolean | undefined;
  private destroy$ : Subject<boolean> = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
  
  
  constructor(private router: Router, private animationService: AnimationService, private fourWinGameApiInterface: FourWinsGameAPIInterface, private signalRService: SignalRService, private snackBarService: snackBar, private loginHolder: LoginHolder) {}

  ngOnInit(): void {
    GlobalConstants.SetGameStateToLogin();
    this.animationService.getAnimationsEnabled$().pipe(takeUntil(this.destroy$)).subscribe((value : boolean) => {
      this.animationsEnabled = value;
     });
  }

  public RegisterName: string = "";

  ClickPlayNowText() : void{
    this.snackBarService.openSnackBar("Gib deinen Nutzernamen ein und klicke auf Register");
  }

  RegisterPlayerOnEnter(event: { keyCode: number; })
  {
    if (event.keyCode == 13)
    {
      this.RegisterPlayer();
    }
  }

  RegisterPlayer() {
    this.fourWinGameApiInterface.RegisterPlayer(this.RegisterName, this.signalRService.connectionId).subscribe({
      next: (response: any) => {
        let res: RegisterPlayerResponse = response as RegisterPlayerResponse;
        this.loginHolder.Login(res.registeredPlayer);
      },
      error: (error: any) => {
        console.error(error);
        this.snackBarService.openSnackBar(error.message, );
      },
      complete: () => {

      }
    });
    this.router.navigate(['/lobby']);
  }
  
}

