import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  students: any;


  constructor(http: HttpClient)
  {
    const STUDENT_URL = 'assets/students_2023.json';

    http.get(STUDENT_URL).subscribe(
      {
        next: json => 
        {
          this.students = json;
        }, 
        complete: () => 
        {
          console.log("Completed!");
        }, 
        error: e => 
        {
          console.error(`Error: ${e.message}`);
        }
      });
  }

}
