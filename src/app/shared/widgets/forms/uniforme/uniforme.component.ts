import { Component, OnInit, Inject } from '@angular/core';
import { UniformeService } from 'src/app/shared/services/uniforme.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

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
  selector: 'app-form-uniforme',
  templateUrl: './uniforme.component.html',
  styleUrls: ['./uniforme.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FormUniformeComponent implements OnInit {

  constructor(private uniformeService: UniformeService,
    private notificationsService: NotificationsService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public uniforme
  ) { this.populateFormGroupUniforme(uniforme) }

  id: string = ''
  lote_id: string = ''
  novo: boolean

  status = [
    { id: 'Ativo', value: 'Ativo' },
    { id: 'Descartado', value: 'Descartado' },
    { id: 'Retornado', value: 'Retornado' },
    { id: 'Sem Identificar', value: 'Sem Identificar' },
  ];

  area = [
    { id: 'Sinistros', value: 'Sinistros' },
    { id: 'Vistoria', value: 'Vistoria' },
  ];

  ngOnInit() {
  }

  onClear() {
    this.form_uniforme.reset();
    this.initializeFormGroupUniforme();
  }

  onSubmit() {
    console.log("dentro del onsubmit", this.uniforme.novo)
    if (this.form_uniforme.valid) {
      console.log("form_uniforme", this.form_uniforme.value)
      if (this.uniforme.novo === true) {
        console.log("detro del if", this.uniforme.novo)
        this.uniformeService.createUniforme(this.id, this.lote_id, this.form_uniforme.value).subscribe(result => {
          this.notificationsService.success('Registro interido!');
          this.form_uniforme.reset();
          this.initializeFormGroupUniforme();
          this.onClose();
        })
      } else{
      console.log("detro del else",this.uniforme.novo)
        this.uniformeService.updateUniforme(this.id, this.lote_id, this.form_uniforme.value).subscribe(result => {
          this.notificationsService.success('Registro Atualizado!');
          this.form_uniforme.reset();
          this.initializeFormGroupUniforme();
          this.onClose();
        })}
    }
  }

  onClose() {
    this.form_uniforme.reset();
    this.initializeFormGroupUniforme();
    this.matDialog.closeAll();
  }

  initializeFormGroupUniforme() {
    this.form_uniforme.setValue({
      rfid: '',
      status: '',
      funcionario: '',
      matricula: '',
      data: '',
      area: '',
      // asset_owner: 'Fornecedor',
    })
  }

  populateFormGroupUniforme(uniforme) {
    this.initializeFormGroupUniforme();
    this.id = uniforme.id
    this.lote_id = uniforme.lote_id
    //  this.novo = uniforme.novo
    this.form_uniforme.get('rfid').setValue(uniforme.rfid)
    this.form_uniforme.get('status').setValue(uniforme.status)
    this.form_uniforme.get('funcionario').setValue(uniforme.funcionario)
    this.form_uniforme.get('matricula').setValue(uniforme.matricula)
    this.form_uniforme.get('area').setValue(uniforme.area)
    this.form_uniforme.get('data').setValue(new Date(uniforme.data))
  }

  form_uniforme: FormGroup = new FormGroup({
    rfid: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    funcionario: new FormControl('', Validators.required),
    matricula: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    data: new FormControl('', Validators.required),
    // asset_owner: new FormControl('Fornecedor'),
  });

}
