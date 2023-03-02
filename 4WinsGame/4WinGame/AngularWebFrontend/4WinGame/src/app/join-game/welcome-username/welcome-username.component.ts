import { Component, OnInit } from '@angular/core';
import { LoginHolder } from 'src/app/Services/loginHolder';
import { snackBarComponent } from 'src/app/Services/snackBar';

@Component({
  selector: 'app-welcome-username',
  templateUrl: './welcome-username.component.html',
  styleUrls: ['./welcome-username.component.css']
})
export class WelcomeUsernameComponent implements OnInit{

  constructor(public loginHolder : LoginHolder, private snackBar: snackBarComponent) {}

  ngOnInit(): void {
    if(!this.loginHolder.isLoggedIn) {
      this.snackBar.openSnackBar("You are not logged in!");
      return;
    }

    
  }
}
