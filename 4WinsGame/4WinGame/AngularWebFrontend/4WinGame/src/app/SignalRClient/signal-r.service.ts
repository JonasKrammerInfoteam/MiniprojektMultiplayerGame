import { Injectable } from '@angular/core';
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
    this.hubProxy.on("GameStart ", (gameID: String) => {
      console.log("GameStarted: "+ gameID)

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

