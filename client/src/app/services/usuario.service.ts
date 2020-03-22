import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = GLOBAL.url_api;
  }

  /**
     * Retorna un token de logueo o retorna los datos del usuario
     * @param usuario: datos del usuario, como usuario y pass.
     * @param getToken: si es true, pide el token; si es false, pide datos del usuario.
     */
    public login(usuario: Usuario): Observable<any> {
        
      //hago la peticion
      const json = JSON.stringify(usuario);
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._http.post(this.url + '/usuarios/login', json, {'headers': headers});
  }

  /**
   * Retornar el objeto del usuario logueado, nulo si no esta logueado
   */
  public getIdentity(usuario: Usuario) {
      //hago la peticion
      const json = JSON.stringify(usuario);
      const params = 'json=' + json;
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.post(this.url + '/usuarios/login/info', params, {'headers': headers});
  }


  public getToken(){
    return localStorage.getItem('token-panel');
  }
}
