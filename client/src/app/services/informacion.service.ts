import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  private url: string;

  constructor(
    public _http: HttpClient
  ) { 
    this.url = GLOBAL.url_api;
  }

  public informacion(): Observable<any>{    
    return this._http.get(this.url + 'informacion',{ 'headers' : new HttpHeaders() });
  }

}
