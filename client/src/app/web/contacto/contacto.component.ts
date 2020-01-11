import { Component, OnInit } from '@angular/core';
import { AvisosService } from 'src/app/services/avisos.service';
import { Contacto } from 'src/app/models/contacto';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
  providers: [ AvisosService ]
})
export class ContactoComponent implements OnInit {
  public contacto: Contacto;
  public errores: Array<String>;
  public success: String;
  public enviando: boolean = false;

  constructor(
    public _avisosService: AvisosService
  ) { }

  ngOnInit() {
    this.contacto = new Contacto("","","","");
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
}
