import { Component, Inject, Injector } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent 
{
  studentName: string;
  studentNumber: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any)
  {
    this.studentName = data[0];
    this.studentNumber = data[1];
  }

}
