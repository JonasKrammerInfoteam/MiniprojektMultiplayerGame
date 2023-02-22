import { Observable } from "rxjs";
import { LoginModel } from "src/app/Models/LoginModel";
import { UserReturnModel } from "src/app/Models/UserReturnModel";
import { GameInfoResponse, JoinGameResponse, MyPlayer, RegisterPlayerResponse, WaitingGamesResponse } from "../Contracts/RestAPI.Contracts";

export interface IFourWinsGameAPIInterface{

    RegisterPlayer(name: string, rtpConnectionID: string): Observable<RegisterPlayerResponse>;
    
    CreateGame(p: MyPlayer): Observable<any>;

    JoinGame(p1: MyPlayer, waitingGameListIndex: number): Observable<JoinGameResponse>;

    DoMove(column: number, gameID: string, p: MyPlayer): Observable<any>;
   
    LeaveGame(p: MyPlayer, gameID: string): Observable<any>;

    GetWaitingGames(): Observable<WaitingGamesResponse>;
  
    GetGameInfo(gameID: string, playerID: string): Observable<GameInfoResponse>;
  


}