import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UniformeService {

  readonly rootURL = "http://167.71.249.87:8000/uniformes";

  constructor(private http: HttpClient) { }

  createUniforme(id, lote_id, uniforme): Observable<any> {
    return this.http.post<any>(this.rootURL + '/createUniforme' , { id, lote_id, uniforme: uniforme })
      .pipe(
        tap(console.log)
      )
  }

  updateUniforme(id, lote_id, uniforme): Observable<any> {
    console.log("dentro del service updateUniforme", id, lote_id, uniforme)
    return this.http.post<any>(this.rootURL + '/updateUniforme', { id, lote_id, uniforme: uniforme })
      .pipe(
        tap(console.log)
      )
  }
}
