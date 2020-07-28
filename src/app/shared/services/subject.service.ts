import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor() { }
  
  subject$ = new Subject<any>();
  broadcastOneLote(contrato){
    this.subject$.next(contrato)
    console.log(contrato)
  }

  uniforme$ = new Subject<any>()
  broadcastRefreshUniforme(uniforme){
    this.uniforme$.next(uniforme)
    console.log(uniforme)
  }

}
