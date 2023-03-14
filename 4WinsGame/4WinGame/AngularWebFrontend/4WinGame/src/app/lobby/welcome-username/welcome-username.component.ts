import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginHolder } from 'src/app/Services/loginHolder.service';
import { snackBar } from 'src/app/Services/snackBar.service';

@Component({
  selector: 'app-welcome-username',
  templateUrl: './welcome-username.component.html',
  styleUrls: ['./welcome-username.component.css']
})
export class WelcomeUsernameComponent implements OnInit{

  headLine : string = "Herzlich Willkommen";
  buttonContent : string = "Logout";

  constructor(public loginHolder : LoginHolder, private snackBar: snackBar, private router : Router) {}

  ngOnInit(): void {
    if(!this.loginHolder.isLoggedIn) {
      this.snackBar.openSnackBar("You are not logged in!");
      return;
    }
  }

  Logout() : void{
    if(confirm("Möchtest du dich wirklich abmelden?")) {
      this.router.navigate(['/login']);
      this.snackBar.openSnackBar("You are logged out now!");
      window.location.reload();
    }
  }

}
