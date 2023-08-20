import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.css']
})
export class PopulationComponent 
{
  @Input() arrCities : any;
  displayOrder: any = ["Name", "Population", "PopulationDensity", "Type"];
}
