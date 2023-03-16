import { EventEmitter, Injectable, Output } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Player } from '../RestAPIClient/Contracts/RestAPI.Contracts';

@Injectable({
  providedIn: 'root'
})

//npm install @microsoft/signalr

export class SignalRService {
  public connected: boolean = false;
  public hubProxy: any;
  public hubUrl: string;
  public connectionId : string;
  public notifyGameStart: EventEmitter<string> = new EventEmitter();
  public notifyGameUpdated: EventEmitter<string> = new EventEmitter();
  public notifyWaitingListUpdated: EventEmitter<any> = new EventEmitter();
  public notifyGameFinished: EventEmitter<Player> = new EventEmitter();

  constructor() {
    this.hubUrl = "https://localhost:44320";
    this.connectionId = "";
    this.hubProxy = new signalR.HubConnectionBuilder()
    .withUrl(this.hubUrl + "/fourwingamehub")
    .withAutomaticReconnect()
    .build();
  }

  public startConnection = () => {
    this.hubProxy.on("GameStart", (gameID: any) => {
      this.notifyGameStart.emit(gameID);
    });
    this.hubProxy.on("WaitingListUpdated", () => {
      this.notifyWaitingListUpdated.emit();
    });
    this.hubProxy.on("GameUpdated", (gameID: any) => {
      this.notifyGameUpdated.emit(gameID);
    });
    this.hubProxy.on("GameFinished", (winner: any) => {
      this.notifyGameFinished.emit(winner);
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
      console.log("SignalR disconnected")
    }
  }

  
}

