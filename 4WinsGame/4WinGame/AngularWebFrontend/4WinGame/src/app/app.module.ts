import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatGridListModule} from '@angular/material/grid-list';
import { HeaderComponent } from './basic-layout/header/header.component';
import { FooterComponent } from './basic-layout/footer/footer.component';
import { GamerulesComponent } from './login/gamerules/gamerules.component';
import { AboutusComponent } from './login/aboutus/aboutus.component';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { WelcomeUsernameComponent } from './lobby/welcome-username/welcome-username.component';
import { CreateGameComponent } from './lobby/create-game/create-game.component';
import { JoinWaitingGameComponent } from './lobby/join-waiting-game/join-waiting-game.component';
import { LobbyComponent } from './lobby/lobby.component';
import { GameinfoComponent } from './play-game/game-info/game-info.component';
import { GameboardComponent } from './play-game/game-board/game-board.component';
import { GameRulesComponent } from './play-game/game-rules/game-rules.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlayGameComponent,
    HeaderComponent,
    FooterComponent,
    GamerulesComponent,
    AboutusComponent,
    BasicLayoutComponent,
    WelcomeUsernameComponent,
    CreateGameComponent,
    JoinWaitingGameComponent,
    LobbyComponent,
    GameinfoComponent,
    GameboardComponent,
    GameRulesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatGridListModule
  ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
