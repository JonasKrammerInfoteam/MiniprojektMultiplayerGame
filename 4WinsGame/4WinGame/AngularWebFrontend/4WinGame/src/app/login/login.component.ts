import { Component } from '@angular/core';
import { snackBarComponent } from '../Services/snackBar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private snackBarService: snackBarComponent) {}
  
  SnackBar()
  {
    this.snackBarService.openSnackBar('This name is already taken.', 'Close');
  }
  
}

