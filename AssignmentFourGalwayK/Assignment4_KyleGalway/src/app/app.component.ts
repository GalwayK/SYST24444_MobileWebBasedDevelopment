import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryDialogComponent } from './country-dialog/country-dialog.component';
import { AboutComponent } from './about/about.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  arrCountries: any; 
  arrDisplay: any;
  arrColumns = ["Name", "Continent", "Surface Area (km2)", "Population"];
  arrFields = ["Name", "Continent", "SurfaceArea", "Population"];

  @ViewChild(MatSort)
  sort: any;

  dataSource: any;

  strFilter: string = "";
  startIndex: number = 0; 
  endIndex: number = 5;

  assignDisplayCountries()
  {
    this.arrDisplay = this.arrCountries.slice(this.startIndex, this.endIndex);
    this.dataSource = new MatTableDataSource(this.arrDisplay);
    console.dir(this.dataSource);
  }

  getFlagImage(code: string)
  {
    return `${this.strFlagSrc}${code.toLowerCase()}.jpg`;
  }

  getMapImage(code: string)
  {
    return `${this.strMapSrc}${code.toLowerCase()}.gif`;
  }

  handleSortChange(event: any)
  {
    this.dataSource.sort = this.sort;
  }

  handleFilterEvent(event: any)
  {
    this.dataSource.filter = this.strFilter;
    console.dir(this.dataSource);
  }

  handlePageEvent(event: any)
  {
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = (event.pageIndex + 1) * event.pageSize;
    
    this.assignDisplayCountries();
  }

  showCredits(arg: any)
  {
    console.dir(arg);
    let config = new MatDialogConfig();

    config.width = "400px";
    config.data = [this.studentName, this.studentNumber];

    let ref = this.dialog.open(AboutComponent, config);

    ref.afterClosed().subscribe(result => 
      {
        console.log("Dialog closed");
      });
  }

  openDialog(country: any)
  {
    let dialogCountry = {"country": country, "imgSrc": this.getMapImage(country.Code)};
    
    let config = new MatDialogConfig();

    config.width = "500px";
    config.data = dialogCountry;

    let ref = this.dialog.open(CountryDialogComponent, config);

    ref.afterClosed().subscribe(result => 
      {
        console.log("Dialog closed");
      });
  }

  constructor(http: HttpClient, public dialog: MatDialog)
  {
    const JSON_URL = this.strUrlJSON;

    http.get(JSON_URL).subscribe({
      next: (data) => 
      {
        this.arrCountries = data;
        this.arrCountries = this.arrCountries.Country;

        this.assignDisplayCountries();
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

  strUrlJSON = "http://ejd.songho.ca/syst24444/world";
  strFlagSrc = "http://ejd.songho.ca/syst24444/flags/";
  strMapSrc = "http://ejd.songho.ca/syst24444/maps/";
  strTitle = "World Countries Information List";
  studentName: string = "Kyle Galway";
  studentNumber: string = "991418738";
}
