import { Component, OnInit } from "@angular/core";
import { GlobalConstants } from "../Services/globalVariables";

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent implements OnInit { 

  ngOnInit(): void {
    GlobalConstants.SetGameStateToIngame();
  }

}
