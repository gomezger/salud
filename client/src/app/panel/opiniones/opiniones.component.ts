import { Component, OnInit } from '@angular/core';
import { OpinionService } from 'src/app/services/opinion.service';
import { Opinion } from 'src/app/models/opinion';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.scss'],
  providers: [ OpinionService, UsuarioService]
})
export class OpinionesComponent implements OnInit {
  public opiniones: Array<Opinion>;
  public errores: Array<string>;

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
