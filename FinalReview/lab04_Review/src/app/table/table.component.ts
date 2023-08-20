import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() arrStudents: any;

  sortName: string = "lastName";
  displaySort = "Last Name";
  sortOrder = ['lastName', 'firstName'];
  displayOrder = ['Last Name', 'Full Name'];

  sortFirstName()
  {
    this.sortName = "firstName";
    this.displaySort = "First Name";

    this.sortOrder = ["firstName", "lastName"];
    this.displayOrder = ["First Name", "Last Name"];
    this.sortArrStudents();
  }

  sortLastName()
  {
    this.sortName = "lastName";
    this.displaySort = "Last Name";

    this.sortOrder = ["lastName", "firstName"];
    this.displayOrder = ["Last Name", "First Name"];

    this.sortArrStudents();
  }

  sortArrStudents()
  {
    console.dir(this.arrStudents);
    this.arrStudents.sort(this.compareStudents.bind(this));
  }

  compareStudents(studentOne: any, studentTwo: any)
  {
    return studentOne[this.sortName]?.localeCompare(studentTwo[this.sortName]);
  }
}
