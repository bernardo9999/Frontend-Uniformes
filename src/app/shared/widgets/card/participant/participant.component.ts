import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/shared/services/contrato.service';
import { LoteService } from 'src/app/shared/services/lote.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ComprasComponent } from '../../forms/compras/compras.component';
import { FabricanteComponent } from '../../forms/fabricante/fabricante.component';
import { CdComponent } from '../../forms/cd/cd.component';
import { FornecedorComponent } from '../../forms/fornecedor/fornecedor.component';
import { TransportadoraComponent } from '../../forms/transportadora/transportadora.component';
import { DialogBlockchainComprasComponent } from '../../dialog/compras/compras.component';
import { DialogBlockchainFabricanteComponent } from '../../dialog/fabricante/fabricante.component';
import { DialogBlockchainTransportadoraComponent } from '../../dialog/transportadora/transportadora.component';
import { DialogBlockchainCdComponent } from '../../dialog/cd/cd.component';
import { DialogBlockchainFornecedorComponent } from '../../dialog/fornecedor/fornecedor.component';
import { switchMap } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss'],
})

export class ParticipantComponent implements OnInit {

  id = ''
  lote = [];
  result = {};

  constructor(private contratoService: ContratoService,
    private loteService: LoteService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private comprasComponent: ComprasComponent,
    private fabricanteComponent: FabricanteComponent,
    private cdComponent: CdComponent,
    private fornecedorComponent: FornecedorComponent,
    private transportadoraComponent: TransportadoraComponent,
    private subjectService: SubjectService,
  ) { }
  ngOnInit() {
    this.initializeFormGroupContrato()
    this.initializeFormGroupLote()
  }

  onSubmitCreateContrato() {
    this.lote = [];
    if (this.form_contrato.valid) {
      this.contratoService.createContrato(this.form_contrato.value)
        .subscribe(result => {
          this.id = result;
          this.notificationsService.success('Contrato interido!');
          this.form_contrato.reset();
          this.initializeFormGroupContrato();
        })
    }
  }

  onSubmitSearchContrato() {
    if (this.form_contrato.valid) {
      this.id = this.form_contrato.value.id
      this.contratoService.getOneContrato(this.id)
        .subscribe(result => {
          this.id = result;
          this.notificationsService.success('Registro Encontrado!');
          this.form_contrato.reset();
          this.initializeFormGroupContrato();
        })
    }
  }

  onCreateLote() {
    this.lote = [];
    this.id = '';
    console.log(this.lote, this.id)
    this.id = this.form_lote.value.id,
      this.loteService.createLote(this.id, this.form_lote.value).subscribe(result => {
        this.lote = result;
        this.notificationsService.success('Lote interido!');
        this.form_lote.reset();
        this.initializeFormGroupLote();
      })
  }

  onSubmitSearchContratoLote() {
    if (this.form_lote.valid) {
      this.id = this.form_lote.value.id
      this.contratoService.getOneLote(this.form_lote.value)
        .subscribe(result => {
          this.lote = result;
          const contrato = { lote: this.lote, id: this.id }
          this.subjectService.broadcastOneLote(contrato)
          this.notificationsService.success('Registro Encontrado!');
          this.form_lote.reset();
          this.initializeFormGroupLote();
        })
    }
  }

  form_contrato: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    lote: new FormControl([])
  });

  form_lote: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    lote_id: new FormControl('', Validators.required),
    status_compras: new FormControl(''),
    quantidade_compras: new FormControl(null),
    data_inicio_compras: new FormControl(''),
    asset_owner: new FormControl(''),
  });

  initializeFormGroupContrato() {
    this.form_contrato.setValue({
      id: null,
      lote: []
    })
  }

  initializeFormGroupLote() {
    this.form_lote.setValue({
      id: "",
      lote_id: "",
      status_compras: "",
      quantidade_compras: 0,
      data_inicio_compras: "",
      asset_owner: "",
    })
  }

  // Forms

  onUpdateCompras(lote) {
    this.comprasComponent.initializeFormGroupCompras();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      id: this.id,
      lote_id: lote.lote_id,
      status_compras: 'Pedido',
      data_inicio_compras: new Date(),
      quantidade_compras: lote.quantidade_compras,
    }
    const dialogRef = this.dialog.open(ComprasComponent, dialogConfig)
      .afterClosed()
      .pipe(switchMap(
        () => this.contratoService.getOneLote({ id: this.id, lote_id: this.lote["lote_id"] })
      ))
      .subscribe(result => {
        this.lote = result
        console.log(this.lote, result)
        this.notificationsService.success('Dashboard Atualizado!');
      })
  }

  onUpdateFabricante(lote) {
    this.fabricanteComponent.initializeFormGroupFabricante();
    const data_fim_fabricante_SLA = new Date(lote.data_inicio_compras); data_fim_fabricante_SLA.setDate(data_fim_fabricante_SLA.getDate() + 7)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      id: this.id,
      lote_id: lote.lote_id,
      status_fabricante: lote.status_fabricante,
      data_inicio_fabricante: new Date(lote.data_inicio_compras),
      data_estimada_fabricante: new Date(lote.data_estimada_fabricante),
      data_fim_fabricante: new Date(lote.data_fim_fabricante || data_fim_fabricante_SLA),
      qualidade_fabricante: lote.qualidade_fabricante,
      valida_quantidade_fabricante: lote.valida_quantidade_fabricante
    }
    const dialogRef = this.dialog.open(FabricanteComponent, dialogConfig)
      .afterClosed()
      .pipe(switchMap(
        () => this.contratoService.getOneLote({ id: this.id, lote_id: this.lote["lote_id"] })
      ))
      .subscribe(result => {
        this.lote = result
        this.notificationsService.success('Dashboard Atualizado!');
      })
  }

  onUpdateTransportadora(lote) {
    this.transportadoraComponent.initializeFormGroupTransportadora();
    const data_fim_transportadora_SLA = new Date(lote.data_fim_fabricante); data_fim_transportadora_SLA.setDate(data_fim_transportadora_SLA.getDate() + 2)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      id: this.id,
      lote_id: lote.lote_id,
      status_transportadora: lote.status_transportadora,
      data_inicio_transportadora: new Date(lote.data_fim_fabricante),
      data_estimada_transportadora: new Date(lote.data_estimada_transportadora),
      data_fim_transportadora: new Date(lote.data_fim_transportadora || data_fim_transportadora_SLA)
    }
    const dialogRef = this.dialog.open(TransportadoraComponent, dialogConfig)
      .afterClosed()
      .pipe(switchMap(
        () => this.contratoService.getOneLote({ id: this.id, lote_id: this.lote["lote_id"] })
      ))
      .subscribe(result => {
        this.lote = result
        this.notificationsService.success('Dashboard Atualizado!');
      })
  }

  onUpdateCd(lote) {
    this.cdComponent.initializeFormGroupCd();
    const data_fim_cd_SLA = new Date(lote.data_fim_transportadora); data_fim_cd_SLA.setDate(data_fim_cd_SLA.getDate() + 15)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      id: this.id,
      lote_id: lote.lote_id,
      status_cd: lote.status_cd,
      valida_qualidade_cd: lote.valida_qualidade_cd,
      data_inicio_cd: new Date(lote.data_fim_transportadora),
      data_estimada_cd: new Date(lote.data_estimada_cd),
      data_fim_cd: new Date(lote.data_fim_cd || data_fim_cd_SLA),
    }
    const dialogRef = this.dialog.open(CdComponent, dialogConfig)
      .afterClosed()
      .pipe(switchMap(
        () => this.contratoService.getOneLote({ id: this.id, lote_id: this.lote["lote_id"] })
      ))
      .subscribe(result => {
        this.lote = result
        this.notificationsService.success('Dashboard Atualizado!');
      })
  }

  onUpdateFornecedor(lote) {
    this.fornecedorComponent.initializeFormGroupFornecedor();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      id: this.id,
      lote_id: lote.lote_id,
      status_fornecedor: 'Em Fornecedor',
      data_inicio_fornecedor: new Date(lote.data_fim_cd),
    }
    const dialogRef = this.dialog.open(FornecedorComponent, dialogConfig)
      .afterClosed()
      .pipe(switchMap(
        () => this.contratoService.getOneLote({ id: this.id, lote_id: this.lote["lote_id"] })
      ))
      .subscribe(result => {
        this.lote = result
        this.notificationsService.success('Dashboard Atualizado!');
      })
  }

  // Dialogs

  onDialogBlockchainCompras() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      id: this.id,
      "value": {
        "lote": {
          lote_id: this.lote['lote_id'],
          asset_owner: 'Compras'
        }
      }
    }
    const dialogRef = this.dialog.open(DialogBlockchainComprasComponent, dialogConfig)
      .afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`)
      })
  }

  onDialogBlockchainFabricante() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      id: this.id,
      "value": {
        "lote": {
          lote_id: this.lote['lote_id'],
          asset_owner: 'Fabricante'
        }
      }
    }
    const dialogRef = this.dialog.open(DialogBlockchainFabricanteComponent, dialogConfig)
      .afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`)
      })
  }

  onDialogBlockchainTransportadora() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      id: this.id,
      "value": {
        "lote": {
          lote_id: this.lote['lote_id'],
          asset_owner: 'Transportadora'
        }
      }
    }
    const dialogRef = this.dialog.open(DialogBlockchainTransportadoraComponent, dialogConfig)
      .afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`)
      })
  }

  onDialogBlockchainCd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      id: this.id,
      "value": {
        "lote": {
          lote_id: this.lote['lote_id'],
          asset_owner: 'CD'
        }
      }
    }
    const dialogRef = this.dialog.open(DialogBlockchainCdComponent, dialogConfig)
      .afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`)
      })
  }

  onDialogBlockchainFornecedor() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      id: this.id,
      "value": {
        "lote": {
          lote_id: this.lote['lote_id'],
          asset_owner: 'Fornecedor'
        }
      }
    }
    const dialogRef = this.dialog.open(DialogBlockchainFornecedorComponent, dialogConfig)
      .afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`)
      })
  }
}