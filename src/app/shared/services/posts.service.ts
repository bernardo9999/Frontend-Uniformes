import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Contrato } from '../models/contrato.model'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  
  readonly rootURL = "http://167.71.249.87:8000/uniformes";

  constructor(private http: HttpClient) {}
  // getOneContrato(id: string): Observable<Contrato[]> {
    //   return this.http.get<Contrato[]>(this.rootURL + '/getOneContrato/' + id, {})
    // }
    getAllContrato(): Observable<Contrato[]> {
        return this.http.get<Contrato[]>(this.rootURL + '/getAllContrato/')
        .pipe(
          tap(console.log)
        )
    }
}
    