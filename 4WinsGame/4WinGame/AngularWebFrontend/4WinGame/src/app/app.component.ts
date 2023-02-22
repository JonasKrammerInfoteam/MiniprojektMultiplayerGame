import { Component, OnInit } from '@angular/core';
import { SignalRService } from './SignalRClient/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private hubService:SignalRService){}
  ngOnInit(): void {
    this.hubService.startConnection();
  }
  title = '4WinGame';
}
