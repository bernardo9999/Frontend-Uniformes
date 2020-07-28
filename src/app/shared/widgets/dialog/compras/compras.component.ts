import { Component, OnInit, Inject } from '@angular/core';
import { HistoryService } from 'src/app/shared/services/history.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class DialogBlockchainComprasComponent implements OnInit {

  id = '';
  lote_id = '';
  asset_owner = '';
  timestamp = '';
  txId = '';
  fingerprint = '';

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
    this.initializeVariableGroupCompras();
    this.matDialog.closeAll();
  }

  initializeVariableGroupCompras() {
    this.id = '';
    this.lote_id = '';
    this.asset_owner = 'Compras';
    this.timestamp = '';
    this.txId = '';
    this.fingerprint = ''
    }

}
