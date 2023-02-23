import { EventEmitter, Injectable, Output } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Player } from '../RestAPIClient/Contracts/RestAPI.Contracts';

@Injectable({
  providedIn: 'root'
})

//npm install @microsoft/signalr

export class SignalRService {
  public connected: boolean = false
  public hubProxy: any;
  public hubUrl: string;
  public connectionId : string;
  public notifyGameStart: EventEmitter<string> = new EventEmitter();
  public notifyGameUpdated: EventEmitter<string> = new EventEmitter();
  public notifyWaitingListUpdated: EventEmitter<any> = new EventEmitter();
  public notifyGameFinished: EventEmitter<Player> = new EventEmitter();

  constructor() {
    this.hubUrl = "http://192.168.2.20:90";
    this.connectionId = "";
    console.log(['hub url: ', this.hubUrl]);
    this.hubProxy = new signalR.HubConnectionBuilder()
    .withUrl(this.hubUrl + "/fourwingamehub")
    .withAutomaticReconnect()
    .build();

  }

  public startConnection = () => {
    console.log("Hier ist startConnection.");

    this.hubProxy.on("GameStart", (gameID: any) => {
      console.log("GameStarted: "+ gameID);
      this.notifyGameStart.emit(gameID);
    });
    this.hubProxy.on("WaitingListUpdated", () => {
      console.log("WaitingListUpdated");
      this.notifyWaitingListUpdated.emit();
    });
    this.hubProxy.on("GameUpdated", (gameid: any) => {
      console.log("GameUpdated: " + gameid);
      this.notifyGameUpdated.emit(gameid);
    });
    this.hubProxy.on("GameFinished", (winner: any) => {
      console.log("GameFinished: " + winner.playerName);
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

