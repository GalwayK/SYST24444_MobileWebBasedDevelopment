import { Component } from '@angular/core';

const FACTOR = 0.45359237;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{

  lb = 1;
  kg = this.lb * FACTOR;
  strLB = this.lb.toPrecision(3);
  strKG = this.kg.toPrecision(3);

  title = 'lab09-KyleGalway';

  private updateDisplayStrings()
  {
    this.strLB = Number.parseFloat(""+this.lb).toFixed(3);
    this.strKG = Number.parseFloat(""+this.kg).toFixed(3);
  };

  convertToKG()
  {
    this.kg = this.lb * FACTOR;
    this.updateDisplayStrings();
  };
  convertToLB()
  {
    this.lb = this.kg / FACTOR;
    this.updateDisplayStrings();
  };
}
