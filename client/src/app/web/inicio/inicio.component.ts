import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: [
    './inicio.component.scss',
    './carousel.scss'
  ]
})
export class InicioComponent implements OnInit {

  constructor(
    private _titleService: Title
    ) { }

  ngOnInit() {
    this._titleService.setTitle('Cuidar Salud - Bahía Blanca');
  }

}
