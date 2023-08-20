import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab03_Review';
  item = "";
  items: string[] = [];
  numOne: number = 1; 
  numTwo: number = 2;

  addItem()
  {
    this.items.push(this.item);
  }
}
