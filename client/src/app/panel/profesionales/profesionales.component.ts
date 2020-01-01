import { Component, OnInit } from '@angular/core';
import { Boton } from 'src/app/models/boton';
import { Profesional } from 'src/app/models/profesional';
import { TipoProfesional } from 'src/app/models/tipo-profesional';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { GLOBAL } from 'src/app/services/global';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.scss'],
  providers: [ProfesionalService, UsuarioService]
})
export class ProfesionalesComponent implements OnInit {
  public profesionales: Array<Profesional>;
  public errores: Array<String>;
  public url_storage: string;
	public filter: string = '';

  constructor(
    public _profesionalService: ProfesionalService,
    public _usuarioService: UsuarioService
  ) { 
    this.url_storage = GLOBAL.url_storage;
  }

  ngOnInit() {
    this.getProfesionales();
  }

  // filtrar productos por nombre o codigo
  filtrar() {
    let prof = [];
    this.profesionales.forEach((element) => {
      if (
        element.nombre.toLowerCase().search(this.filter.toLowerCase()) !== -1 ||
        element.email.toLowerCase().search(this.filter.toLowerCase()) !== -1
      ) {
        prof.push(element);
      }
    });

    this.profesionales = prof;

    if(this.filter=='')
      this.getProfesionales();

  }


  eliminar(profesional: Profesional){

    // recupero el token
    const token:string = this._usuarioService.getToken();

    this._profesionalService.delete(profesional, token).subscribe(
      response => {
          if (response.status === 'success') {
            $('.preguntar-eliminar-'+profesional.id).addClass('d-none');
            $('.mensaje-eliminar-'+profesional.id).removeClass('d-none');

            // sacar pedido del inicio en 6 segundos
            setTimeout(() => {
              this.getProfesionales();
            }, 3000);

          } else {
            this.errores = response.errores;  
          }
      },
      error => {
        this.errores = [error.message, "Error al eliminar el profesional, recargue la pantalla y verifique su conexión a internet"];
      }
    );
  }

  getProfesionales(){
    //verifico si hay una en cache
    const profesionales = localStorage.getItem('profesionales'); 
    if (profesionales !== null)
      this.profesionales = JSON.parse(profesionales);

    //busco una actualizacion en la base de datos
    this._profesionalService.getProfesionales().subscribe(
      response => {
          if (response.status === 'success') {
            //guardamos resultado
            this.profesionales = response.profesionales;

            //guardamos resultado en cache
            localStorage.setItem('profesionales',JSON.stringify(this.profesionales));
          } else {
            this.errores = response.errores;  
          }
      },
      error => {
        this.errores = [error.message,"Error al cargar los profesionales, recargue la pantalla y verifique su conexión a internet"];
      }
    );
  }

}
