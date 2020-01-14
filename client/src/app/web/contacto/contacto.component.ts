import { Component, OnInit } from '@angular/core';
import { AvisosService } from 'src/app/services/avisos.service';
import { Contacto } from 'src/app/models/contacto';
import { Informacion } from 'src/app/models/informacion';
import { InformacionService } from 'src/app/services/informacion.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
  providers: [ AvisosService, InformacionService ]
})
export class ContactoComponent implements OnInit {
  public contacto: Contacto;
  public informacion: Informacion;
  public errores: Array<String>;
  public success: String;
  public enviando: boolean = false;

  constructor(
    public _avisosService: AvisosService,
    public _informacionService: InformacionService
  ) { }

  ngOnInit() {
    this.contacto = new Contacto("","","","");
    this.getInformacion();
  }

  onSubmitContacto(){

    this.enviando = true;
    this.errores = null;

    //busco una actualizacion en la base de datos
    this._avisosService.agregarAviso(this.contacto).subscribe(
      response => {
          if (response.status === 'success') {            
            this.success = response.mensaje;

            //borramso errores
            this.errores = null;
          } else {
            this.errores = response.errores;  
          }
          //saco el cartel de enviando
          this.enviando = false;
      },
      error => {
        //saco el cartel de enviando
        this.enviando = false;
        
        this.errores = ["Error al enviar el mensaje", "Intente nuevamente, o recargue la pantalla y verifique su conexión a internet"];
      }
    );
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
