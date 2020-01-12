import { Component, OnInit } from '@angular/core';
import {ProfesionalService} from 'src/app/services/profesional.service';
import {TipoProfesionalService}from 'src/app/services/tipo-profesional.service';
import {TipoProfesional}from 'src/app/models/tipo-profesional';
import {Profesional} from 'src/app/models/profesional';
import { GLOBAL } from 'src/app/services/global';


@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.scss']
})
export class ProfesionalesComponent implements OnInit {
  public tipoProfesionales: Array<TipoProfesional>;
  public ListaProfesionales: Array<Profesional>;
  public url_storage:String;
  public errores:Array<String>;

  constructor(
    private _profesionalService:ProfesionalService,
    private _tipoProfesionalService:TipoProfesionalService
  ) { 
    this.url_storage=GLOBAL.url_storage;
  }

  ngOnInit() {
    this.getTiposProfesionales();
    this.getProfesionales();
  }

  getTiposProfesionales(){
    //Busco en el local storage 
    const tipoProfesionales = localStorage.getItem('tipo_profesionales');
    if (tipoProfesionales!=null){
      this.tipoProfesionales= JSON.parse(tipoProfesionales);
    }
    //Verifico si hay actualizaciones
    this._tipoProfesionalService.getTipos().subscribe(
      response=>{
        if (response.status==='success'){
          this.tipoProfesionales=response.tipos_profesionales;
          //guardo los tipos en el storage
          localStorage.setItem('tipo_profesionales',JSON.stringify(this.tipoProfesionales));
        }else{
          this.errores = response.errores;
        }

      },error=>{
        this.errores = [error.message,"Error al cargar los tipos de profesionales, recargue la pantalla y verifique su conexión a internet"];
      }
    );
  }

  getProfesionales(){
    //verifico si hay una en cache
    const profesionales = localStorage.getItem('profesionales'); 
    if (profesionales !== null)
      this.ListaProfesionales = JSON.parse(profesionales);

    //busco una actualizacion en la base de datos
    this._profesionalService.getProfesionales().subscribe(
      response => {
          if (response.status === 'success') {
            //guardamos resultado
            this.ListaProfesionales = response.profesionales;
            this.ListaProfesionales=this.ListaProfesionales.sort(function(){return Math.random()-0.5});
            //guardamos resultado en cache
            localStorage.setItem('profesionales',JSON.stringify(this.ListaProfesionales));
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
