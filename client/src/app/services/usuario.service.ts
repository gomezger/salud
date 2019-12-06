import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
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
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'usuarios/login', params, {'headers': headers});
  }
}
