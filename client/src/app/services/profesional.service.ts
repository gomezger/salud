import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { Profesional } from '../models/profesional';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalService {
  private url: string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = GLOBAL.url_api;
  }

  public insert(profesional: Profesional, token: string): Observable<any> {          
        
    //creo formulario para recibir datos en backend
    const params = new FormData();
    params.append('Authorization', token);
    params.append('json',JSON.stringify(profesional));
    params.append('imagen',profesional.imagen_file);
    params.append('cv',profesional.cv_file);

    //creo headers
    let headers = new HttpHeaders()/*.set('authorization', token)/*.set('Content-Type','multipart/form-data')*/;

    return this._http.post(this.url + 'profesionales/insert', params, { 'headers' : headers });
  }

}
