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
  selector: 'app-fabricante',
  templateUrl: './fabricante.component.html',
  styleUrls: ['./fabricante.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class FabricanteComponent implements OnInit {

  constructor(private loteService: LoteService,
    private notificationsService: NotificationsService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public lote
  ) { this.populateFormGroupFabricante(lote) }

  status = [
    { id: 'Em Confeccao', value: 'Em Confeccao' },
    { id: 'Concluido', value: 'Concluido' }];

  ngOnInit() {
  }

  onClear() {
    this.form_fabricante.reset();
    this.initializeFormGroupFabricante();
  }
// NOTA: adicionar id quando acabar os forms
  onSubmit() {
    if (this.form_fabricante.valid) {
      this.loteService.updateLote(this.lote.id, this.form_fabricante.value).subscribe(result => {
        this.notificationsService.success('Registro interido!');
        this.form_fabricante.reset();
        this.initializeFormGroupFabricante();
        this.onClose();
      })
    }
  }

  onClose() {
    this.form_fabricante.reset();
    this.initializeFormGroupFabricante();
    this.matDialog.closeAll();
  }

  initializeFormGroupFabricante() {
    this.form_fabricante.setValue({
      lote_id: null,
      status_fabricante: '',
      valida_quantidade_fabricante: false,
      data_inicio_fabricante: '',
      data_fim_fabricante: '',
      qualidade_fabricante: '',
      data_estimada_fabricante: '',
      asset_owner: 'Fabricante',
    })
  }
// NOTA: resolver problema do date em ingles

  populateFormGroupFabricante(lote) {
    this.initializeFormGroupFabricante();
    this.form_fabricante.get('lote_id').setValue(lote.lote_id)
    this.form_fabricante.get('status_fabricante').setValue(lote.status_fabricante)
    this.form_fabricante.get('valida_quantidade_fabricante').setValue(lote.valida_quantidade_fabricante)
    this.form_fabricante.get('qualidade_fabricante').setValue(lote.qualidade_fabricante)
    this.form_fabricante.get('data_inicio_fabricante').setValue(new Date(lote.data_inicio_fabricante))
    this.form_fabricante.get('data_estimada_fabricante').setValue(new Date(lote.data_estimada_fabricante))
    this.form_fabricante.get('data_fim_fabricante').setValue(new Date(lote.data_fim_fabricante))
  }

  form_fabricante: FormGroup = new FormGroup({
    lote_id: new FormControl(''),
    status_fabricante: new FormControl('', Validators.required),
    valida_quantidade_fabricante: new FormControl(false, Validators.required),
    qualidade_fabricante: new FormControl('', Validators.required),
    data_inicio_fabricante: new FormControl('', Validators.required),
    data_estimada_fabricante: new FormControl(''),
    data_fim_fabricante: new FormControl(''),
    asset_owner: new FormControl('Fabricante'),
  });
}
