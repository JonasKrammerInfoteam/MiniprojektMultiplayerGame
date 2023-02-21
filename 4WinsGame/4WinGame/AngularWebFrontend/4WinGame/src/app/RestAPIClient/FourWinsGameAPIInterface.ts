import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginModel } from "../Models/LoginModel";
import { UserReturnModel } from "../Models/UserReturnModel";
import { APIUriBuilder } from "./Services/APIUriBuilder";
import { APIHttpRequest } from "./Services/HttpRequest";
import { IFourWinsGameAPIInterface } from "./Interfaces/IFourWinsGameAPIInterface";
import { GameInfoResponse, JoinGameResponse, MyPlayer, RegisterPlayerResponse, WaitingGamesResponse } from "./Contracts/RestAPI.Contracts";

@Injectable({
	providedIn: 'root'
  })
export class FourWinsGameAPIInterface implements IFourWinsGameAPIInterface {

    constructor(private apiHttpRequest:APIHttpRequest) {
        this._apiUriBuilder = new APIUriBuilder("FourWinGame");
    }

    private _apiUriBuilder:APIUriBuilder;


    public RegisterPlayer(name: string, rtpConnectionID: string): Observable<RegisterPlayerResponse>{
        return this.apiHttpRequest.Post("", this._apiUriBuilder.GetAPIUri("RegisterPlayer",
         new Map()
         .set("name", name)
         .set("rtpconnectionid", rtpConnectionID)));
    }

    public CreateGame(p: MyPlayer): Observable<any>
    {
        return this.apiHttpRequest.Post(p, this._apiUriBuilder.GetAPIUri("CreatePlayer",
        new Map()));
    }

    public JoinGame(p1: MyPlayer, waitingGameListIndex: number): Observable<JoinGameResponse>
    {
        return this.apiHttpRequest.Post(p1, this._apiUriBuilder.GetAPIUri("JoinGame",
        new Map()
        .set("waitinggamelistindex", waitingGameListIndex)
        ));
    }

    public DoMove(column: number, gameID: string, p: MyPlayer): Observable<any>
    {
        return this.apiHttpRequest.Post(p, this._apiUriBuilder.GetAPIUri("DoMove",
        new Map()
        .set("column", column)
        .set("gameid", gameID)
        .set("playerid", p.PlayerID)
        ));
    }

    public LeaveGame(p: MyPlayer, gameID: string): Observable<any>
    {
        return this.apiHttpRequest.Post(p, this._apiUriBuilder.GetAPIUri("LeaveGame",
        new Map()
        .set("gameid", gameID)
        ));
    }

    public GetWaitingGames(): Observable<WaitingGamesResponse>
    {
        return this.apiHttpRequest.Get(this._apiUriBuilder.GetAPIUri("GetWaitingGames", new Map()));
    }

    public GetGameInfo(gameID: string, playerID: string): Observable<GameInfoResponse>
    {
        return this.apiHttpRequest.Get(this._apiUriBuilder.GetAPIUri("GetGameInfo", new Map()
        .set("gameid", gameID)
        .set("playerid", playerID)
        ));
    }

}