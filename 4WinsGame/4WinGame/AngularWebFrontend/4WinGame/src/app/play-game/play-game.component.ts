import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameInfo, GameInfoResponse, MyPlayer, WaitingGamesResponse } from '../RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from '../RestAPIClient/FourWinsGameAPIInterface';
import { LoginHolder } from '../Services/loginHolder';
import { snackBarComponent } from '../Services/snackBar';



@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent implements OnInit {
  gameData: GameInfo | undefined;
  gameID: string = "";

  constructor(private fourWinGameAPIInterface: FourWinsGameAPIInterface, private snackBar: snackBarComponent, private route: ActivatedRoute, private loginHolder: LoginHolder) { }

  public floorDivision(n: number, divider: number): number
  {
    return (n - n % divider) / divider as number;
  }

  board: Number[][] = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,2,2,1,2,0,0],
    [1,1,2,1,1,0,0]
  ];

  public DoMove(column: number): void {
    console.log("Placed in column: " + column);
    // get saved Player p
    this.fourWinGameAPIInterface.DoMove(column, this.gameID, this.loginHolder.loggedInPlayer as MyPlayer);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.gameID = params["gameid"];
        console.log(this.gameID);
      }
    );
  
    // this.fourWinGameAPIInterface.GetGameInfo(this.gameID, (this.loginHolder.loggedInPlayer as MyPlayer).playerID).subscribe({
    //   next: (response: any) => {
    //     let res: GameInfoResponse = response as GameInfoResponse;
    //     this.dataSource = res.GameInfo;
        
    //   },
    //   error: (error: any) => {
    //     console.error(error);
    //     this.snackBar.openSnackBar(error.message);
    //   },
    //   complete: () => {

    //   }
    // });
    
  }
}
