import { Component, OnInit } from '@angular/core';
import { Boton } from 'src/app/models/boton';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.scss']
})
export class ProfesionalesComponent implements OnInit {
  public botones: Array<Boton> = [];

  constructor() { }

  ngOnInit() {
  }


}
