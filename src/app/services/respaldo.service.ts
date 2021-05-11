import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RespaldoService {

  public url;

  constructor(
    private _http : HttpClient
  ) { 
    this.url = GLOBAL.url;
  }
  respaldar():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'respaldo/respaldar',{headers:headers});
  }

  listar():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'respaldo/listar',{headers:headers});
  }

  restaurar(backup):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'respaldo/restaurar/'+backup, {headers:headers});
  }

  eliminar(backup):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'respaldo/eliminar/'+backup, {headers:headers});
  }
}
