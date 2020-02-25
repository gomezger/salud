import { Component, OnInit } from '@angular/core';
import { TipoProfesionalService } from 'src/app/services/tipo-profesional.service';
import { TipoProfesional } from 'src/app/models/tipo-profesional';
import * as $ from 'jquery';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tipo-profesionales',
  templateUrl: './tipo-profesionales.component.html',
  styleUrls: ['./tipo-profesionales.component.scss'],
  providers: [ TipoProfesionalService, UsuarioService ]
})
export class TipoProfesionalesComponent implements OnInit {
  public tipos: Array<TipoProfesional>;
  public errores: Array<String>;
  public filter:string = "";
  public p: any;

  constructor(
    public _tipoProfesionalService: TipoProfesionalService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.getTiposProfesionales();
  }
  

  filtrar() {
    let tipo = [];
    this.tipos.forEach((element) => {
      if (
        element.nombre.toLowerCase().search(this.filter.toLowerCase()) !== -1
      ) {
        tipo.push(element);
      }
    });

    this.tipos = tipo;

    if(this.filter=='')
      this.getTiposProfesionales();

  }


  eliminar(tipo: TipoProfesional){

    // recupero el token
    const token:string = this._usuarioService.getToken();

    this._tipoProfesionalService.delete(tipo, token).subscribe(
      response => {
          if (response.status === 'success') {
            $('.preguntar-eliminar-'+tipo.id).addClass('d-none');
            $('.mensaje-eliminar-'+tipo.id).removeClass('d-none');

            // sacar pedido del inicio en 6 segundos
            setTimeout(() => {
              this.getTiposProfesionales();
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

  getTiposProfesionales(){
    //verifico si hay una en cache
    const tipos = localStorage.getItem('tipos_profesionales'); 
    if (tipos !== null)
      this.tipos = JSON.parse(tipos);

    //busco una actualizacion en la base de datos
    this._tipoProfesionalService.getTipos().subscribe(
      response => {
          if (response.status === 'success') {
            //guardamos resultado
            this.tipos = response.tipos_profesionales;

            //guardamos resultado en cache
            localStorage.setItem('tipos_profesionales',JSON.stringify(this.tipos));

            //borramso errores
            this.errores = null;
          } else {
            this.errores = response.errores;  
          }
      },
      error => {
        this.errores = [error.message,"Error al cargar los tipos, recargue la pantalla y verifique su conexión a internet"];
      }
    );
  }
}
