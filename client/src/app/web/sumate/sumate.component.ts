import { Component, OnInit } from '@angular/core';
import { TipoProfesionalService } from 'src/app/services/tipo-profesional.service';
import { TipoProfesional } from 'src/app/models/tipo-profesional';
import { Sumate } from 'src/app/models/sumate';
import { AvisosService } from 'src/app/services/avisos.service';
import * as $ from 'jquery';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sumate',
  templateUrl: './sumate.component.html',
  styleUrls: ['./sumate.component.scss'],
  providers: [TipoProfesionalService, AvisosService]
})
export class SumateComponent implements OnInit {
  public errores: Array<string>;
  public tipos: Array<TipoProfesional>;
  public sumate: Sumate;
  public success: String;
  public enviando: boolean;

  constructor(
    public _tipoProfesionalService: TipoProfesionalService,
    public _avisosService: AvisosService,
    private _titleService: Title
  ) { }

  ngOnInit() {
    this.enviando = false;
    this.getTipos();
    this.sumate = new Sumate("","","","","",null,null);
    this._titleService.setTitle('Sumate | Cuidar Salud - Bahía Blanca');
  }

  
  getTipos(){
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

  
  onSubmit(){
    this.errores = null;
    this.enviando = true;

    //busco una actualizacion en la base de datos
    this._avisosService.sumate(this.sumate).subscribe(
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

  /**
   * Agregar la imagen al objeto profesional
   * @param e evento en el cual cambia la imagen
   */
	imagenChanged(e) {
    this.sumate.imagen = e.target.files[0] !== undefined ? e.target.files[0] : undefined;
    if(this.sumate.imagen !== undefined)
      $('.imagen-label').text(this.sumate.imagen.name);
    else
      $('.imagen-label').text("");
  }

  /**
   * Agregar la imagen al objeto profesional
   * @param e evento en el cual cambia la imagen
   */
	cvChanged(e) {
    this.sumate.cv = e.target.files[0] !== undefined ? e.target.files[0] : undefined;
    if(this.sumate.cv !== undefined)
      $('.cv-label').text(this.sumate.cv.name);
    else
      $('.cv-label').text("E");
  }

}
