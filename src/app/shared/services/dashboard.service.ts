import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { };

  bigChart() {
    return [{
      name: 'Fabricante',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
    }, {
      name: 'Compras',
      data: [106, 107, 111, 133, 221, 767, 1766]
    }, {
      name: 'CD',
      data: [163, 203, 276, 408, 547, 729, 628]
    }, {
      name: 'Transportadora',
      data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
      name: 'Fornecedor',
      data: [2, 2, 2, 6, 13, 30, 46]
    }]
  }
  cards() {
    return [{ data: [71, 78, 39, 66] }]
  }
  pieChart() {
    return [
      {
        name: 'Ativos',
        y: 50,
        sliced: true,
        selected: true
      },
      {
        name: 'Descartados',
        y: 15
      },
      {
        name: 'Retornados',
        y: 30
      },
      {
        name: 'Sem Identificar',
        y: 5
      }
    ]
  }
}