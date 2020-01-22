import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { Opinion } from '../models/opinion';


@Injectable({
  providedIn: 'root'
})
export class OpinionService {
  private url: string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = GLOBAL.url_api;
  }

  public getOpiniones(): Observable<any> {         
    const headers = new HttpHeaders();
    return this._http.get(this.url + 'opiniones',{ 'headers' : headers });
  }


  public update(opinion: Opinion, token: string): Observable<any>{    
        
    //creo formulario para recibir datos en backend
    let params = new FormData();
    params.append('json',JSON.stringify(opinion));

    //creo headers
    const headers = new HttpHeaders().set('Authorization', token);

    return this._http.post(this.url + 'opiniones/editar/'+opinion.id, params, { 'headers' : headers });
  }


  public delete(opinion: Opinion, token: string): Observable<any> {          
        
    //creo headers
    const headers = new HttpHeaders().set('Authorization', token);

    return this._http.delete(this.url + 'opiniones/delete/'+opinion.id, { 'headers' : headers });
  }

  public getOpinionesByProfesional(id:number):Observable<any>{
    const headers= new HttpHeaders();
    return this._http.get(this.url+'opiniones/profesional/'+id,{'headers':headers});
  }

}
