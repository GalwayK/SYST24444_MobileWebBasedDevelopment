import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent 
{
  name = "Kyle Galway";

  constructor(@Inject(MAT_DIALOG_DATA) data: any)
  {
    this.name = data;
  }
}
