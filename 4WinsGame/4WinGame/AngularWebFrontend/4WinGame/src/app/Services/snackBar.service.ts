import { Injectable } from "@angular/core";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class snackBar {
    constructor(private _snackBar: MatSnackBar) {}
    
    public openSnackBar(message: string) {
        this._snackBar.open(message, "Close", {
        duration: 3000
        });
    }
}
  
  