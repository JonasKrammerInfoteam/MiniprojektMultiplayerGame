import { EventEmitter, Injectable, Output } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})

//npm install @microsoft/signalr

export class SignalRService {
  public connected: boolean = false
  private hubProxy: any;
  public hubUrl: string;
  public connectionId : string;
  @Output() public notifyGameStart: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.hubUrl = "https://localhost:44362";
    this.connectionId = "";
    console.log(['hub url: ', this.hubUrl]);
    this.hubProxy = new signalR.HubConnectionBuilder()
    .withUrl(this.hubUrl + "/fourwingamehub")
    .withAutomaticReconnect()
    .build();

  }

  public startConnection = () => {
    console.log("Hier ist startConnection.")
    this.hubProxy.on("GameStart ", (gameID: string) => {
      console.log("GameStarted: "+ gameID)
      this.notifyGameStart.emit(gameID);
    });

    try {
      this.hubProxy
        .start()
        .then(() => {
          console.log('Now connected, connection ID=' + this.hubProxy.connection.connectionId);
          this.connected = true;
          this.connectionId = this.hubProxy.connection.connectionId;
        })
    } catch (err) {
      console.error('Could not connect');
    }
  }

  ngOnDestroy() {
    if (this.hubProxy) {
      this.hubProxy.stop();
    }
  }

  
}

