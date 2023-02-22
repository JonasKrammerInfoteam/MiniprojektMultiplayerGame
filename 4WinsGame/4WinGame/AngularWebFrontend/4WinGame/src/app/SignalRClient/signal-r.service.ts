import { EventEmitter, Injectable, Output } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Player } from '../RestAPIClient/Contracts/RestAPI.Contracts';

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
    this.hubProxy.on("GameStart ", (gameID: any) => {
      console.log("GameStarted: "+ gameID)
      this.notifyGameStart.emit(gameID);
    });
    this.hubProxy.on("WaitingListUpdated ", () => {
      console.log("WaitingListUpdated")
      //this.notifyGameStart.emit(gameID);
    });
    this.hubProxy.on("GameUpdated ", (gameid: string) => {
      console.log("GameUpdated: " + gameid)
      //this.notifyGameStart.emit(gameID);
    });
    this.hubProxy.on("GameFinished ", (winner: Player) => {
      console.log("GameFinished: " + winner.playerName)
      //this.notifyGameStart.emit(gameID);
    });
  }

  ngOnDestroy() {
    if (this.hubProxy) {
      this.hubProxy.stop();
      console.log("SignalR disconnected")
    }
  }

  
}

