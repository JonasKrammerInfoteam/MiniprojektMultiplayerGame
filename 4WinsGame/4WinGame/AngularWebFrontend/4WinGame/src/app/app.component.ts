import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginHolder } from './Services/loginHolder';
import { SignalRService } from './SignalRClient/signal-r.service';
import { GlobalConstants } from './common/globalconstants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private hubService:SignalRService, public loginHolder:LoginHolder, private router: Router) { }
  ngOnInit(): void {
    this.hubService.startConnection();
    if(this.loginHolder.isLoggedIn) {
      this.router.navigate(['/lobby']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  title = GlobalConstants.PageTitle;
}
