import { Component, OnInit } from '@angular/core';
import { LoginHolder } from './Services/loginHolder';
import { SignalRService } from './SignalRClient/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private hubService:SignalRService, public loginHolder:LoginHolder){}
  ngOnInit(): void {
    this.hubService.startConnection();
  }
  title = '4WinGame';
}
