import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Profesional } from 'src/app/models/profesional';
import * as $ from 'jquery';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TipoProfesional } from 'src/app/models/tipo-profesional';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-editar-profesional',
  templateUrl: './crear-editar-profesional.component.html',
  styleUrls: ['./crear-editar-profesional.component.scss'],
  providers: [
    ProfesionalService,
    UsuarioService
  ]
})
export class CrearEditarProfesionalComponent implements OnInit {
  //atributos
  public profesional: Profesional;
  public tipos: Array<TipoProfesional>;
  public errores: Array<string>;
  public success: string;
  public titulo: string;
  public editar: boolean;

  constructor(
    public _profesionalService: ProfesionalService,
    public _usuarioService: UsuarioService,
		private _route: ActivatedRoute

  ) { 
  }

  ngOnInit() {
    this.editar = false;
    this.verificarDestino();
    this.getTipos();
  }

  private getProfesional(id:number){

    //busco una actualizacion en la base de datos
    this._profesionalService.getProfesional(id).subscribe(
      response => {
          if (response.status === 'success') {
            //guardamos resultado
            this.profesional = response.profesional;
          } else {
            this.errores = response.errores;  
          }
      },
      error => {
        this.errores = [error.message,"Error al cargar el profesional, recargue la pantalla y verifique su conexión a internet"];
      }
    );
  }

  private verificarDestino(){
    // busco el id de la noticia que esta en la url
		this._route.params.subscribe(params => {
			// agarro el parametro de la url
      const id = params['id'];
      
      if(id!==undefined){
        this.getProfesional(id);
        this.titulo = "Editar Profesional";
        this.editar = true;
      }else{
        this.profesional = new Profesional(0,0,null,"","",null,"",null,"","",null,null);
        this.titulo = "Crear Profesional";
      }

		},
		error => {
      this.errores = [error.message,"Error al cargar los datos, recargue la pantalla y verifique su conexión a internet"];
		});
  }


  getTipos(){
    //verifico si hay una en cache
    const tipos = localStorage.getItem('tipos_profesionales'); 
    if (tipos !== null)
      this.tipos = JSON.parse(tipos);

    //busco una actualizacion en la base de datos
    this._profesionalService.getTipos().subscribe(
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

  /**
   * Sube el formulario usando la api
   * @param profesionalForm Formulario
   */
  onSubmitProfesional(profesionalForm: Form){
    if(this.editar){
      this.update(profesionalForm);
    }else{
      this.create(profesionalForm);
    }
  }

  create(profesionalForm: Form){

    // recupero el token
    const token:string = this._usuarioService.getToken();

    this._profesionalService.insert(this.profesional, token).subscribe(
      response => {
          if (response.status === 'success') {
            this.success = response.message;
            this.errores = null;
          } else {
            this.errores = response.errores;  
          }
      },
      error => {
        this.errores = [error.message, "Error al subir el profesional, recargue la pantalla y verifique su conexión a internet"];
      }
    );

  }

  update(profesionalForm: Form){

    // recupero el token
    const token:string = this._usuarioService.getToken();

    this._profesionalService.update(this.profesional, token).subscribe(
      response => {
          if (response.status === 'success') {
            this.success = response.message;
            this.errores = null;
          } else {
            this.errores = response.errores;  
          }
      },
      error => {
        this.errores = [error.message, "Error al editar el profesional, recargue la pantalla y verifique su conexión a internet"];
      }
    );

  }


  /**
   * Agregar la imagen al objeto profesional
   * @param e evento en el cual cambia la imagen
   */
	imagenChanged(e) {
    this.profesional.imagen_file = e.target.files[0] !== undefined ? e.target.files[0] : undefined;
    if(this.profesional.imagen_file !== undefined)
      $('.imagen-lavel').text(this.profesional.imagen_file.name);
    else
      $('.imagen-lavel').text("Elegir archivo");

  }
  /**
   * Agregar el cv al objeto profesional
   * @param e evento en el cual cambia la imagen
   */
	cvChanged(e) {
		this.profesional.cv_file = e.target.files[0] !== undefined ? e.target.files[0] : undefined;
    if(this.profesional.cv_file !== undefined)
      $('.cv-lavel').text(this.profesional.cv_file.name);
    else
      $('.cv-lavel').text("Elegir archivo");
	}

}
