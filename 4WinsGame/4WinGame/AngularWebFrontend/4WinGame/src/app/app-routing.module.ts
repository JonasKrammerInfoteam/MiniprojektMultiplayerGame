import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinGameComponent } from './join-game/join-game.component';
import { LoginComponent } from './login/login.component';
import { PlayGameComponent } from './play-game/play-game.component';

const routes: Routes = [ 
  { path:"login", component: LoginComponent },
  { path:"lobby", component: JoinGameComponent},
  { path:"play", component: PlayGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
