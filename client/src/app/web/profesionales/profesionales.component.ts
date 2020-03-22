import { Component, OnInit } from '@angular/core';
import {ProfesionalService} from 'src/app/services/profesional.service';
import {TipoProfesionalService}from 'src/app/services/tipo-profesional.service';
import {TipoProfesional}from 'src/app/models/tipo-profesional';
import {Profesional} from 'src/app/models/profesional';
import { GLOBAL } from 'src/app/services/global';
import { Title } from '@angular/platform-browser';
import {Router,ActivatedRoute} from '@angular/router'
import { Informacion } from 'src/app/models/informacion';
import { InformacionService } from 'src/app/services/informacion.service';

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
  public hayProfesionales:boolean;
  public informacion: Informacion;

  constructor(
    private _profesionalService:ProfesionalService,
    private _tipoProfesionalService:TipoProfesionalService,
    private _titleService: Title,
    private _informacionService: InformacionService,
    private _router : Router, 
    private _route:ActivatedRoute
  ) { 
    this.url_storage=GLOBAL.url_storage;
    this.hayProfesionales=true;

  }

  ngOnInit() {
    this.getTiposProfesionales();
    this.getProfesionales();
    this._titleService.setTitle('Profesionales | Cuidar Salud - Bahía Blanca');    
    this.getInformacion();
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
            if(this.ListaProfesionales && this.ListaProfesionales.length===0){
              this.hayProfesionales=false;
            }else{
              this.hayProfesionales=true;
            }
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

  filtrar(id:number){
    this._profesionalService.getProfesionalesByTipo(id).subscribe(
      response=>{
        if (response.status === 'success') {
          this.ListaProfesionales = response.profesionales;
          if(this.ListaProfesionales.length===0){
            this.hayProfesionales=false;
          }else{
            this.hayProfesionales=true;
          }
        }else {
          this.errores = response.errores;
        } 
    },
    error=>{
      this.errores = [error.message,"Error al cargar los profesionales, recargue la pantalla y verifique su conexión a internet"];
    });
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
