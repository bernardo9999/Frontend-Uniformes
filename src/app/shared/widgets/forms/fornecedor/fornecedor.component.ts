import { Component, OnInit, Inject } from '@angular/core';
import { LoteService } from 'src/app/shared/services/lote.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
export class FornecedorComponent implements OnInit {

  constructor(private loteService: LoteService,
    private notificationsService: NotificationsService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public lote
  ) { this.populateFormGroupFornecedor(lote) }

  ngOnInit() {
  }

  onClear() {
    this.form_fornecedor.reset();
    this.initializeFormGroupFornecedor();
  }

  onSubmit() {
    if (this.form_fornecedor.valid) {
      this.loteService.updateLote(this.lote.id, this.form_fornecedor.value).subscribe(result => {
        this.notificationsService.success('Registro interido!');
        this.form_fornecedor.reset();
        this.initializeFormGroupFornecedor();
        this.onClose();
      })
    }
  }

  onClose() {
    this.form_fornecedor.reset();
    this.initializeFormGroupFornecedor();
    this.matDialog.closeAll();
  }

  initializeFormGroupFornecedor() {
    this.form_fornecedor.setValue({
      lote_id: null,
      status_fornecedor: 'Em Fornecedor',
      data_inicio_fornecedor: '',
      asset_owner: 'Fornecedor',
    })
  }

  populateFormGroupFornecedor(lote) {
    this.initializeFormGroupFornecedor();
    this.form_fornecedor.get('lote_id').setValue(lote.lote_id)
    this.form_fornecedor.get('status_fornecedor').setValue(lote.status_fornecedor)
    this.form_fornecedor.get('data_inicio_fornecedor').setValue(new Date(lote.data_inicio_fornecedor))
  }

  form_fornecedor: FormGroup = new FormGroup({
    lote_id: new FormControl(''),
    status_fornecedor: new FormControl('Em Fornecedor'),
    data_inicio_fornecedor: new FormControl('', Validators.required),
    asset_owner: new FormControl('Fornecedor'),
  });
}
