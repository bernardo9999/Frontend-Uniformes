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
  selector: 'app-transportadora',
  templateUrl: './transportadora.component.html',
  styleUrls: ['./transportadora.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class TransportadoraComponent implements OnInit {
  constructor(private loteService: LoteService,
    private notificationsService: NotificationsService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public lote
  ) { this.populateFormGroupTransportadora(lote) }

  status = [
    { id: 'Em Transporte', value: 'Em Transporte' },
    { id: 'Concluido', value: 'Concluido' }];

  ngOnInit() {
  }

  onClear() {
    this.form_transportadora.reset();
    this.initializeFormGroupTransportadora();
  }

  onSubmit() {
    if (this.form_transportadora.valid) {
      this.loteService.updateLote(this.lote.id, this.form_transportadora.value).subscribe(result => {
        this.notificationsService.success('Registro interido!');
        this.form_transportadora.reset();
        this.initializeFormGroupTransportadora();
        this.onClose();
      })
    }
  }

  onClose() {
    this.form_transportadora.reset();
    this.initializeFormGroupTransportadora();
    this.matDialog.closeAll();
  }

  initializeFormGroupTransportadora() {
    this.form_transportadora.setValue({
      lote_id: null,
      status_transportadora: '',
      data_inicio_transportadora: '',
      data_fim_transportadora: '',
      data_estimada_transportadora: '',
      asset_owner: 'Transportadora',
    })
  }

  populateFormGroupTransportadora(lote) {
    this.initializeFormGroupTransportadora();
    this.form_transportadora.get('lote_id').setValue(lote.lote_id)
    this.form_transportadora.get('status_transportadora').setValue(lote.status_transportadora)
    this.form_transportadora.get('data_inicio_transportadora').setValue(new Date(lote.data_inicio_transportadora))
    this.form_transportadora.get('data_estimada_transportadora').setValue(new Date(lote.data_estimada_transportadora))
    this.form_transportadora.get('data_fim_transportadora').setValue(new Date(lote.data_fim_transportadora))
  }

  form_transportadora: FormGroup = new FormGroup({
    lote_id: new FormControl(''),
    status_transportadora: new FormControl('', Validators.required),
    data_inicio_transportadora: new FormControl('', Validators.required),
    data_fim_transportadora: new FormControl(''),
    data_estimada_transportadora: new FormControl('', Validators.required),
    asset_owner: new FormControl('Transportadora'),
  });
}
