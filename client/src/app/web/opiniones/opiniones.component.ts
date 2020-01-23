import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {Profesional} from 'src/app/models/profesional';
import{Opinion} from 'src/app/models/opinion';
import {Route,Params,ActivatedRoute,Router} from '@angular/router';
import{OpinionService}from '../../services/opinion.service';
import{ProfesionalService}from '../../services/profesional.service';
import { GLOBAL } from 'src/app/services/global';


@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.scss']
})
export class OpinionesComponent implements OnInit {
  public myProfesional:Profesional;
  public opinionesProfesional:Array<Opinion>;
  public url_storage:String;
  public errores:Array<String>;
  
  @ViewChild('mimodal',{static: false}) modal:ElementRef;

  constructor(
    private profesionalService:ProfesionalService,
    private opinionService:OpinionService,
    private _router: Router,
    private _route: ActivatedRoute
    ){ 
      this.url_storage=GLOBAL.url_storage;
    }

  ngOnInit() {
    this._route.params.subscribe(
      params=>{
        let id = params.id;
        this.getProfesional(id);
      }
    );
  }

  getProfesional(id:number){
    this.profesionalService.getProfesional(id).subscribe(
      response=>{
        if(response.status==='success'){
          this.myProfesional= response.profesional;
          //console.log(this.myProfesional);
          this.getOpiniones(this.myProfesional.id);
        }else{
          this.errores = response.errores;
        }
      },
      error=>{
        this.errores = [error.message,"Error al cargar el profesional, recargue la pantalla y verifique su conexión a internet"];
      });
  }

  getOpiniones(id:number){
    this.opinionService.getOpinionesByProfesional(id).subscribe(
      response=>{
        if(response.status==='success'){
          this.opinionesProfesional=response.opinion;
          //console.log(this.opinionesProfesional);
        }else{
          this.errores = response.errores;
        }
      },
      error=>{
        this.errores = [error.message,"Error al cargar las opiniones, recargue la pantalla y verifique su conexión a internet"];
      }
    );  
  }

  enviar(){
    let element  = <HTMLInputElement> document.getElementById('texto');
    const descripcion=element.value; 
    element = <HTMLInputElement> document.getElementById('inputNombre');
    const nombre=element.value;
    element = <HTMLInputElement> document.getElementById('inputEmail');
    const email = element.value;
    element = <HTMLInputElement> document.getElementById('inputTelefono');
    const telefono = element.value;
    //console.log({descripcion,nombre,email,telefono});
    
    let op = new Opinion(this.myProfesional.id,this.myProfesional,null,nombre,email,telefono,descripcion,true,null,null);
    this.opinionService.insert(op).subscribe(
      response=>
      {
        this.getOpiniones(this.myProfesional.id);
        element  = <HTMLInputElement> document.getElementById('texto');
        element.value="";
        /* const modal = document.getElementById('exampleModalLong');
        modal. */
        this.modal.nativeElement.click();
      });
    
    
  }

}
