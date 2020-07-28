import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  readonly rootURL = "http://167.71.249.87:8000/uniformes";
  
  constructor(private http: HttpClient) { }

  getHistoryTransaction(data): Observable<any> {
    return this.http.post<any>(this.rootURL + '/getHistoryTransaction', { data: data })
    .pipe(
        tap(console.log)
      )
  }
}
