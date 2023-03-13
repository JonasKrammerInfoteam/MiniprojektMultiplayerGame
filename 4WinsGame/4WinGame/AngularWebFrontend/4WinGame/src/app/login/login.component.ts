import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { RegisterPlayerResponse } from '../RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from '../RestAPIClient/FourWinsGameAPIInterface';
import { snackBar } from '../Services/snackBar.service';
import { SignalRService } from '../SignalRClient/signal-r.service';
import { LoginHolder } from '../Services/loginHolder.service';
import { GlobalConstants } from '../Services/global.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    GlobalConstants.SetGameStateToLogin();
  }
}

