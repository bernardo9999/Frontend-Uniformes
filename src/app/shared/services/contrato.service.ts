import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  
  readonly rootURL = "http://167.71.249.87:8000/uniformes";
  
  constructor(private http: HttpClient) { }
  
  createContrato(contrato): Observable<any> {

    return this.http.post<any>(this.rootURL + '/createContrato', { contrato: contrato })
    .pipe(
        tap(console.log)
      )
  }

  getOneContrato(contrato): Observable<any> {
    return this.http.get<any>(this.rootURL + '/getOneContrato/' + contrato)
      .pipe(
        tap(console.log)
      )
  }

  
  getOneLote(data): Observable<any> {
    return this.http.post<any>(this.rootURL + '/getOneLote', { data: data })
    .pipe(
      tap(console.log)
      )
    }

}