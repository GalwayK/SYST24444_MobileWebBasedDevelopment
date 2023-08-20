import { Component } from '@angular/core';

const FACTOR = .45359237;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab02_Review';
  lb = 1;
  kg = this.lb * FACTOR;

  convertToKilogram()
  {
    this.lb = this.roundNumber(this.kg / FACTOR);
  }

  convertToPound()
  {
    this.kg = this.roundNumber(this.lb * FACTOR);  
  }

  roundNumber(num: number)
  {
    return Math.round(num * 100) / 100; 
  }
}
