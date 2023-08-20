import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  students: any; 
  columns = ["firstName", "lastName"];

  constructor(httpClient: HttpClient)
  {
    const URL = "assets/students_2023.json";
    httpClient.get(URL).subscribe(
      {
        next: data => this.students = data, 
        error: e => console.log(e.message)
      }
    );
  }

}
