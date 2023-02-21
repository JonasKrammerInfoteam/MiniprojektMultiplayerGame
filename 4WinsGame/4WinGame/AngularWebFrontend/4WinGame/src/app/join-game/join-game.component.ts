import { Component, OnInit } from '@angular/core';
import { WaitingGame, WaitingGamesResponse } from '../RestAPIClient/Contracts/RestAPI.Contracts';
import { FourWinsGameAPIInterface } from '../RestAPIClient/FourWinsGameAPIInterface';
import { snackBarComponent } from '../Services/snackBar';

const data: WaitingGame[] = [];

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit{
  displayedColumns: string[] = ["PlayerName"];
  dataSource = data;
  constructor(private fourWinGameAPIInterface: FourWinsGameAPIInterface, private snackBar: snackBarComponent) { }

  ngOnInit(): void {
    this.fourWinGameAPIInterface.GetWaitingGames().subscribe({
      next: (response: any) => {
        let res: WaitingGamesResponse = response as WaitingGamesResponse;
        this.dataSource = res.WaitingGames;
      },
      error: (error: any) => {
        console.error(error);
        this.snackBar.openSnackBar(error.message, "Close");
      },
      complete: () => {

      }
    });
  }

}
