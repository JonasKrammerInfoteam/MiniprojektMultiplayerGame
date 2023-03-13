import { Component, ViewChild } from '@angular/core';
import { GlobalConstants } from 'src/app/Services/globalVariables';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  gameState : string = GlobalConstants.gameState.toString();

}
