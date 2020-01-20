import { Component, OnInit } from '@angular/core';
import {Profesional} from 'src/app/models/profesional';
import{Opinion} from 'src/app/models/opinion'
import {Route,Params} from '@angular/router'

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.scss']
})
export class OpinionesComponent implements OnInit {
  public myProfesional:Profesional;
  public opinionesProfesional:Array<Opinion>;

  constructor() { }

  ngOnInit() {
  }

  getProfesional(id:number){
  }
}
