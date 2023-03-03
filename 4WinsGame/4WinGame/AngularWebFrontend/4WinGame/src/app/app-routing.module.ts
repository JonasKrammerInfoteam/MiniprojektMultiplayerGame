import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import { LoginComponent } from './login/login.component';
import { PlayGameComponent } from './play-game/play-game.component';

const routes: Routes = [ 
  { path:"login", component: LoginComponent },
  { path:"lobby", component: LobbyComponent },
  { path:"play", component: PlayGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
