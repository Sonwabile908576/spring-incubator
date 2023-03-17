import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MoloAirSite';

  constructor(private router: Router, private dialog: MatDialog) { }

  login(){
    let dialogRef = this.dialog.open(LoginDialogComponent, { data: { flightId: 0 }});
  }
}
