import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  readonly rootURL = "http://167.71.249.87:8000/uniformes";

  constructor(private http: HttpClient) { }

  createLote(id, lote): Observable<any> {
    lote = _.omit(lote, 'id')
    return this.http.post<any>(this.rootURL + '/createLote' , { id, data: lote })
      .pipe(
        tap(console.log)
      )
  }
  updateLote(id, lote): Observable<any> {
    return this.http.post<any>(this.rootURL + '/updateLote', { id, data: lote })
      .pipe(
        tap(console.log)
      )
  }
}
