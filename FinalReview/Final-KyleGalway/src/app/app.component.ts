import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'City Populations in British Columbia';
  arrCities: any;
  studentName = "Kyle Galway";
  studentNumber = "991418738";

  filterCityPopulation(city: any)
  {
    return city.Population > 5000;
  }

  compareCityPopulation(cityOne: any, cityTwo: any)
  {
    return cityTwo.Population - cityOne.Population;
  }

  processCityData()
  {
    this.arrCities = this.arrCities
      .filter(this.filterCityPopulation.bind(this))
      .sort(this.compareCityPopulation.bind(this));

      console.dir(this.arrCities);
  }
  
  constructor(http: HttpClient)
  {
    const JSON_URL = "http://ejd.songho.ca/syst24444/population.php?province=BC";

    http.get(JSON_URL).subscribe({
      next: (data) =>
      {
        this.arrCities = data;
        this.processCityData();
      },
      error: (error) => 
      {
        console.error(error.message)
      }, 
      complete: function()
      {
        console.log("City Data Retrieved!");
      }
      });

  }
}
