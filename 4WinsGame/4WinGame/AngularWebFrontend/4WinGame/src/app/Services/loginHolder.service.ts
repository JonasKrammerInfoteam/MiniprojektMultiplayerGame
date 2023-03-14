import { Injectable } from "@angular/core";
import { MyPlayer } from "../RestAPIClient/Contracts/RestAPI.Contracts";

@Injectable({
    providedIn: 'root'
})

export class LoginHolder {
    constructor() {}
    public isLoggedIn : boolean = false;    
    public loggedInPlayer : MyPlayer|undefined;

    public Login(myplayer : MyPlayer): void {
        this.isLoggedIn = true;
        this.loggedInPlayer = myplayer;
        console.log(myplayer);
    }
}