import { Component, OnInit } from '@angular/core';
import { TipoProfesional } from 'src/app/models/tipo-profesional';
import { TipoProfesionalService } from 'src/app/services/tipo-profesional.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Form } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-crear-editar-tipo',
  templateUrl: './crear-editar-tipo.component.html',
  styleUrls: ['./crear-editar-tipo.component.scss'],
  providers: [TipoProfesionalService,UsuarioService]
})
export class CrearEditarTipoComponent implements OnInit {
  public tipo: TipoProfesional;
  public errores: Array<String>;
  public success: string;
  public titulo: string;
  public editar: boolean;

  constructor(
    public _tipoProfesionalService: TipoProfesionalService,
    public _usuarioService: UsuarioService,
		private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.editar = false;
    this.verificarDestino();
  }

  
  private verificarDestino(){
    // busco el id de la noticia que esta en la url
		this._route.params.subscribe(params => {
			// agarro el parametro de la url
      const id = params['id'];
      
      if(id!==undefined){
        this.getTipo(id);
        this.titulo = "Editar Tipo de Profesional";
        this.editar = true;
      }else{
        this.tipo = new TipoProfesional(0,"",null,null);
        this.titulo = "Crear Tipo de Profesional";
      }

		},
		error => {
      this.errores = [error.message,"Error al cargar los datos, recargue la pantalla y verifique su conexión a internet"];
		});
  }

  getTipo(id: number){

    //busco una actualizacion en la base de datos
    this._tipoProfesionalService.getTipo(id).subscribe(
      response => {
          if (response.status === 'success') {
            //guardamos resultado
            this.tipo = response.tipo_profesional;

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

  
  onSubmitTipo(tipoForm: Form){
    if(this.editar){
      this.update(tipoForm);
    }else{
      this.create(tipoForm);
    }
  }

  create(tipoForm: Form){

    // recupero el token
    const token:string = this._usuarioService.getToken();

    this._tipoProfesionalService.insert(this.tipo, token).subscribe(
      response => {
          if (response.status === 'success') {
            this.success = response.message;
            this.errores = null;
          } else {
            this.errores = response.errores;  
          }
      },
      error => {
        this.errores = [error.message, "Error al subir el tipo de profesional, recargue la pantalla y verifique su conexión a internet"];
      }
    );

  }

  update(tipoForm: Form){

    // recupero el token
    const token:string = this._usuarioService.getToken();

    this._tipoProfesionalService.update(this.tipo, token).subscribe(
      response => {
          if (response.status === 'success') {
            this.success = response.message;
            this.errores = null;
          } else {
            this.errores = response.errores;  
          }
      },
      error => {
        this.errores = [error.message, "Error al editar el tipo de profesional, recargue la pantalla y verifique su conexión a internet"];
      }
    );

  }


}
