import { Component, OnInit, Inject } from '@angular/core';
import { HistoryService } from 'src/app/shared/services/history.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import * as _moment from 'moment';
import { default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DialogBlockchainFornecedorComponent implements OnInit {

  id:string = '';
  lote_id:string = '';
  asset_owner:string = '';
  // timestamp:string = '';
  timestamp;
  txId:string = '';
  fingerprint:string = '';

  constructor(private historyService: HistoryService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { this.historyService.getHistoryTransaction(data)
    .subscribe(result => {
      this.asset_owner = result.asset_owner,
      this.timestamp = new Date(result.timestamp).toLocaleString(),
      this.txId = result.txId
      this.fingerprint = result.fingerprint
    })
  }

  ngOnInit() {
  }

  onClose() {
    this.initializeVariableGroupFornecedor();
    this.matDialog.closeAll();
  }

  initializeVariableGroupFornecedor() {
    this.id = '';
    this.lote_id = '';
    this.asset_owner = 'Fornecedor';
    // this.timestamp = '';
    this.txId = '';
    this.fingerprint = ''
    }
  
}
