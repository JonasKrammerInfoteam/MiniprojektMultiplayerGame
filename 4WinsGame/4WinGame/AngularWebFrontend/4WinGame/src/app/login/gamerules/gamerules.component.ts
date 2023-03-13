import { Component } from '@angular/core';

@Component({
  selector: 'app-gamerules',
  templateUrl: './gamerules.component.html',
  styleUrls: ['./gamerules.component.css']
})
export class GamerulesComponent {
  headLine : string = "Spielregeln";
  subHeadLine : string = "Vier Gewinnt - DAS bekannte Spiel - Jetzt auch endlich Online spielbar";
  summaryContentOne : string = "Login";
  summaryContentTwo : string = "Wartelobby";
  summaryContentThree : string = "Spielfeld";
}
