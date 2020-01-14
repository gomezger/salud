import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ocultarMenu(){
    $('.navbar-toggler').addClass('collapsed');
    $('.navbar-toggler').removeClass('active');
    $(".navbar-toggler").attr("aria-expanded","false");
    $('.navbar-collapse').addClass('collapsing');
    $('.navbar-collapse').removeClass('show');
    $('.navbar-collapse').removeClass('collapsing');
  }

}
