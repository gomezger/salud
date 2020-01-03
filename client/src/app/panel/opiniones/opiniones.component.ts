import { Component, OnInit } from '@angular/core';
import { OpinionService } from 'src/app/services/opinion.service';
import { Opinion } from 'src/app/models/opinion';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.scss'],
  providers: [ OpinionService, UsuarioService]
})
export class OpinionesComponent implements OnInit {
  public opiniones: Array<Opinion>;
  public errores: Array<string>;
	public filter: string = '';

  constructor(
    public _opinionService: OpinionService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.getOpiniones();
  }

  cambiarEstado(opinion: Opinion){
    opinion.aprobado = !opinion.aprobado;
    this.update(opinion);
  }

  
  // filtrar productos por nombre o codigo
  filtrar() {
    let opi = [];
    this.opiniones.forEach((element) => {
      if (
        element.nombre.toLowerCase().search(this.filter.toLowerCase()) !== -1 ||
        element.profesional.nombre.toLowerCase().search(this.filter.toLowerCase()) !== -1
      ) {
        opi.push(element);
      }
    });

    this.opiniones = opi;

    if(this.filter=='')
      this.getOpiniones();

  }

  eliminar(opinion: Opinion){

    // recupero el token
    const token:string = this._usuarioService.getToken();

    this._opinionService.delete(opinion, token).subscribe(
      response => {
          if (response.status === 'success') {
            $('.preguntar-eliminar-'+opinion.id).addClass('d-none');
            $('.mensaje-eliminar-'+opinion.id).removeClass('d-none');

            // sacar pedido del inicio en 6 segundos
            setTimeout(() => {
              this.getOpiniones();
            }, 3000);

          } else {
            this.errores = response.errores;  
          }
      },
      error => {
        this.errores = [error.message, "Error al eliminar la opinión, recargue la pantalla y verifique su conexión a internet"];
      }
    );
  }


  getOpiniones(){
    //verifico si hay una en cache
    let opiniones = localStorage.getItem('opiniones'); 
    if (opiniones !== null)
      this.opiniones = JSON.parse(opiniones);

    //busco una actualizacion en la base de datos
    this._opinionService.getOpiniones().subscribe(
      response => {
          if (response.status === 'success') {
            //guardamos resultado
            this.opiniones = response.opiniones;

            //guardamos resultado en cache
            localStorage.setItem('opiniones',JSON.stringify(this.opiniones));
          } else {
            this.errores = response.errores;  
          }
      },
      error => {
        this.errores = [error.message,"Error al cargar las opiniones, recargue la pantalla y verifique su conexión a internet"];
      }
    );
  }

  update(opinion: Opinion){

    // recupero el token
    const token:string = this._usuarioService.getToken();

    this._opinionService.update(opinion, token).subscribe(
      response => {
          if (response.status === 'success') {
            this.errores = null;
          } else {
            this.errores = response.errores;  
            opinion.aprobado = !opinion.aprobado;
          }
      },
      error => {
        this.errores = [error.message, "Error al editar la opinión, recargue la pantalla y verifique su conexión a internet"];
        opinion.aprobado = !opinion.aprobado;
      }
    );

  }


}
