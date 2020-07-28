import { Component, OnInit, Inject } from '@angular/core';
import { LoteService } from 'src/app/shared/services/lote.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import * as _moment from 'moment';
import { default as _rollupMoment} from 'moment';
// import { RefreshComponent } from '../../card/participant/participant.component'

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
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    // RefreshComponent
  ],
})

export class ComprasComponent implements OnInit {
  resetLote: { id: string, lote_id: string }

  constructor(private loteService: LoteService,
    private notificationsService: NotificationsService,
    private matDialog: MatDialog,
    // private refreshComponent: RefreshComponent,
    @Inject(MAT_DIALOG_DATA) public lote
  ) { this.populateFormGroupCompras(lote) }

  ngOnInit() {
  }

  onClear() {
    this.form_compras.reset();
    this.initializeFormGroupCompras();
  }

  onSubmit() {
    if (this.form_compras.valid) {
      const buffer = this.form_compras.value
      this.loteService.updateLote(this.lote.id, this.form_compras.value).subscribe(result => {
        this.notificationsService.success('Registro atualizado!');
        this.form_compras.reset();
        this.initializeFormGroupCompras();
        this.onClose();
      })
    }
  }

  onClose() {
    this.form_compras.reset();
    this.initializeFormGroupCompras();
    this.matDialog.closeAll();
  }

  initializeFormGroupCompras() {
    this.form_compras.setValue({
      lote_id: null,
      status_compras: 'Pedido',
      quantidade_compras: null,
      data_inicio_compras: '',
      asset_owner: 'Compras',
    })
  }

  populateFormGroupCompras(lote) {
    this.initializeFormGroupCompras();
    this.form_compras.get('lote_id').setValue(lote.lote_id)
    this.form_compras.get('quantidade_compras').setValue(lote.quantidade_compras)
    this.form_compras.get('data_inicio_compras').setValue(new Date(lote.data_inicio_compras))
    this.form_compras.get('status_compras').setValue(lote.status_compras)
  }

  form_compras: FormGroup = new FormGroup({
    lote_id: new FormControl(''),
    status_compras: new FormControl('Pedido'),
    quantidade_compras: new FormControl(null),
    data_inicio_compras: new FormControl('', Validators.required),
    asset_owner: new FormControl('Compras'),
  });
}

