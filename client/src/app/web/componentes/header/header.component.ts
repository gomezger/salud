import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Informacion } from 'src/app/models/informacion';
import { InformacionService } from 'src/app/services/informacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ InformacionService ]
})
export class HeaderComponent implements OnInit {
  public informacion: Informacion;

  constructor(
    public _informacionService: InformacionService
  ) { }

  ngOnInit() {
    this.getInformacion();
  }

  ocultarMenu(){
    $('.navbar-toggler').addClass('collapsed');
    $('.navbar-toggler').removeClass('active');
    $(".navbar-toggler").attr("aria-expanded","false");
    $('.navbar-collapse').addClass('collapsing');
    $('.navbar-collapse').removeClass('show');
    $('.navbar-collapse').removeClass('collapsing');
  }

  
  /**
   * Obtiene info del backend
   */
  getInformacion(){

    //busco en localSotrage
    const cont = localStorage.getItem('informacion');
    if(cont!==null)
      this.informacion = JSON.parse(cont);

    //busco una actualizacion en la base de datos
    this._informacionService.informacion().subscribe(
      response => {
          if (response.status === 'success') {            
            this.informacion = response.informacion;
            localStorage.setItem('informacion',JSON.stringify(this.informacion));
          }
      },
      error => {}
    );
  }

}
