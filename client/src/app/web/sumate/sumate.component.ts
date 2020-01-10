import { Component, OnInit } from '@angular/core';
import { TipoProfesionalService } from 'src/app/services/tipo-profesional.service';
import { TipoProfesional } from 'src/app/models/tipo-profesional';

@Component({
  selector: 'app-sumate',
  templateUrl: './sumate.component.html',
  styleUrls: ['./sumate.component.scss'],
  providers: [TipoProfesionalService]
})
export class SumateComponent implements OnInit {
  public errores: Array<string>;
  public tipos: Array<TipoProfesional>;

  constructor(
    public _tipoProfesionalService: TipoProfesionalService
  ) { }

  ngOnInit() {
    this.getTipos();
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

}
