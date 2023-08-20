import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MyDialogComponent } from './my-dialog/my-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text = "";
  response = "";

  constructor(public dialog: MatDialog)
  {
  }

  openDialog()
  {
    let config = new MatDialogConfig();

    config.width = "300px";
    config.data = this.text;

    let ref = this.dialog.open(MyDialogComponent, config);

    ref.afterClosed().subscribe(result => 
      {
        this.response = result;
      });
  }
}
