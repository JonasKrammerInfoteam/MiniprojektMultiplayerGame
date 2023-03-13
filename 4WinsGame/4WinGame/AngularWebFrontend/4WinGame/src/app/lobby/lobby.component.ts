import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../Services/globalVariables';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  ngOnInit(): void {
    GlobalConstants.SetGameStateToLobby();
  }
}
