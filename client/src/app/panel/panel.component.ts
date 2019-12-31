import { Component, OnInit, DoCheck } from '@angular/core';
import * as $ from 'jquery';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  providers : [UsuarioService]
})
export class PanelComponent implements OnInit,DoCheck {
  public nombre: string;

  constructor(
    private _route: Router,
    private _router: ActivatedRoute,
    private _usuarioService: UsuarioService,
    private _titleService: Title,
  ) { }

  ngOnInit() {
    this._titleService.setTitle('Panel de Control');
  }
  ngDoCheck() {
    this.chequearSesion();
  }

  private chequearSesion(){
    //ver si esta logueado
    const log = localStorage.getItem('isLoggedin-panel');
    const tok = localStorage.getItem('token-panel');
    const ide = localStorage.getItem('identity-panel');

    //si esta logueado, chequeamos que no haya expirado
    if(log!=null && tok!=null && ide!=null && log=='true'){
      
      //expira en
      const dato:any = JSON.parse(ide);
      const exp = dato.exp;
      const actual = Math.floor(new Date().getTime() / 1000); //es lo mismo que time() en php

      if(actual>exp){
        this._route.navigate(['/panel/login']);
      }else{
        this.nombre = dato.name;
        //la sesion esta ok
      }

    //redirigimos al login
    }else{      
      this._route.navigate(['/panel/login']);
    }
  }

  toggle() {
		$('#wrapper').toggleClass('toggled');
  }


  logout(){    
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('identity');

    this._route.navigate(['panel/login']);
  }
}
