import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-country-dialog',
  templateUrl: './country-dialog.component.html',
  styleUrls: ['./country-dialog.component.css']
})
export class CountryDialogComponent 
{
  arrCities: any;
  country: any;
  imgSrc: string;
  http: any; 
  strUrlJSON: string = "http://ejd.songho.ca/syst24444/city/";
  arrFields = ["Name", "District", "Population"];

  filterCities(city: any)
  {
    return city.CountryCode == this.country.Code;
  }

  constructor(@Inject(MAT_DIALOG_DATA) data: any, http: HttpClient)
  {
    this.country = data.country;
    this.imgSrc = data.imgSrc;
    this.http = http;

    const JSON_URL = this.strUrlJSON;

    http.get(JSON_URL).subscribe({
      next: (data) => 
      {
        let arrCities: any = data;
        this.arrCities = arrCities.City;
        this.arrCities = this.arrCities.filter(this.filterCities.bind(this));
        console.dir(this.arrCities);
      }, 
      error: (error) =>
      {
        console.error("An error occured obtaining data: " + error.message);
      }, 
      complete: function() 
      {
        console.log("Country Data Retrieved!");
      }
    });
  } 
}
