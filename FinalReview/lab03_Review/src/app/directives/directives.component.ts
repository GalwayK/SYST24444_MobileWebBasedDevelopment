import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css']
})
export class DirectivesComponent 
{
  @Input() numberOne: number = 0; 
  @Input() numberTwo: number = 0; 
  @Input() title: string = "";

  arrNumbers: Array<number> = [1, 2, 3, 4, 5, 6, 7];
}
