import { Component, OnInit } from '@angular/core';
import { InformacionService } from 'src/app/services/informacion.service';
import { Informacion } from 'src/app/models/informacion';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [ InformacionService ]
})
export class FooterComponent implements OnInit {
  public informacion: Informacion;

  constructor(
    public _informacionService: InformacionService
  ) { }

  ngOnInit() {
    this.getInformacion();
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
