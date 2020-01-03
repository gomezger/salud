import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { TipoProfesional } from '../models/tipo-profesional';

@Injectable({
  providedIn: 'root'
})
export class TipoProfesionalService {
  private url: string;

  constructor(
    public _http: HttpClient
  ) { 
    this.url = GLOBAL.url_api;
  }
  
  public getTipo(id: number): Observable<any> {         
    const headers = new HttpHeaders();
    return this._http.get(this.url + 'profesionales/tipos/'+id,{ 'headers' : headers });
  }

  public getTipos(): Observable<any> {         
    const headers = new HttpHeaders();
    return this._http.get(this.url + 'profesionales/tipos',{ 'headers' : headers });
  }

  
  public insert(tipo: TipoProfesional, token: string): Observable<any> {          
        
    //creo formulario para recibir datos en backend
    const params = new FormData();
    params.append('Authorization', token);
    params.append('json',JSON.stringify(tipo));

    //creo headers
    const headers = new HttpHeaders().set('authorization', token);

    return this._http.post(this.url + 'profesionales/tipos/insert', params, { 'headers' : headers });
  }

  public delete(tipo: TipoProfesional, token: string): Observable<any> {          
        
    //creo headers
    const headers = new HttpHeaders().set('Authorization', token);

    return this._http.delete(this.url + 'profesionales/tipos/eliminar/'+tipo.id, { 'headers' : headers });
  }

  public update(tipo: TipoProfesional, token: string): Observable<any>{    
        
    //creo formulario para recibir datos en backend
    let params = new FormData();
    params.append('json',JSON.stringify(tipo));

    //creo headers
    const headers = new HttpHeaders().set('Authorization', token);

    return this._http.post(this.url + 'profesionales/tipos/editar/'+tipo.id, params, { 'headers' : headers });
  }


  
}
