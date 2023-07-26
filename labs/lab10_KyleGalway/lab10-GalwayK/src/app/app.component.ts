import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  item = "";
  items: string[] = [];

  addItem()
  {
    this.items.push(this.item);
    this.item = "";
  }
}
