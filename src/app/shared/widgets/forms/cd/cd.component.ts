import { Component, OnInit, Inject } from '@angular/core';
import { LoteService } from 'src/app/shared/services/lote.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { DatePipe } from '@angular/common';
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
  selector: 'app-cd',
  templateUrl: './cd.component.html',
  styleUrls: ['./cd.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CdComponent implements OnInit {

  constructor(private loteService: LoteService,
    private notificationsService: NotificationsService,
    private datePipe: DatePipe,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public lote
  ) { this.populateFormGroupCd(lote) }

  status = [
    { id: 'Recebido', value: 'Recebido' },
    { id: 'Concluido', value: 'Concluido' }];

  ngOnInit() {
  }

  onClear() {
    this.form_cd.reset();
    this.initializeFormGroupCd();
  }

  onSubmit() {
    if (this.form_cd.valid) {
      this.loteService.updateLote(this.lote.id, this.form_cd.value).subscribe(result => {
        this.notificationsService.success('Registro interido!');
        this.form_cd.reset();
        this.initializeFormGroupCd();
        this.matDialog.closeAll();
      })
    }
  }

  transformDate(date) {
    date = this.datePipe.transform(date, 'dd/MM/yyyy');
    return date
  }

  onClose() {
    this.form_cd.reset();
    this.initializeFormGroupCd();
    this.matDialog.closeAll();
  }

  initializeFormGroupCd() {
    this.form_cd.setValue({
      lote_id: null,
      status_cd: '',
      valida_qualidade_cd: false,
      data_inicio_cd: '',
      data_fim_cd: '',
      data_estimada_cd: '',
      asset_owner: 'CD',
    })
  }

  populateFormGroupCd(lote) {
    this.initializeFormGroupCd();
    this.form_cd.get('lote_id').setValue(lote.lote_id)
    this.form_cd.get('status_cd').setValue(lote.status_cd)
    this.form_cd.get('valida_qualidade_cd').setValue(lote.valida_qualidade_cd)
    this.form_cd.get('data_inicio_cd').setValue(new Date(lote.data_inicio_cd))
    this.form_cd.get('data_estimada_cd').setValue(new Date(lote.data_estimada_cd))
    this.form_cd.get('data_fim_cd').setValue(new Date(lote.data_fim_cd))
  }

  form_cd: FormGroup = new FormGroup({
    lote_id: new FormControl(''),
    status_cd: new FormControl('', Validators.required),
    valida_qualidade_cd: new FormControl(false),
    data_inicio_cd: new FormControl('', Validators.required),
    data_fim_cd: new FormControl(''),
    data_estimada_cd: new FormControl('', Validators.required),
    asset_owner: new FormControl('CD'),
  });
}
