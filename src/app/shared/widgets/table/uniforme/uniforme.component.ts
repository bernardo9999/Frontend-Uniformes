import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, } from '@angular/material';
import { UniformeService } from '../../../services/uniforme.service';
import { SubjectService } from '../../../services/subject.service';
import { Uniforme } from '../../../models/uniforme.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NotificationsService } from '../../../services/notifications.service';
import { FormUniformeComponent } from '../../forms/uniforme/uniforme.component';
import { ContratoService } from '../../../services/contrato.service';
import { switchMap } from 'rxjs/operators';
import { PieComponent } from '../../pie/pie.component'
import * as _ from 'lodash';

@Component({
  selector: 'app-table-uniforme',
  templateUrl: './uniforme.component.html',
  styleUrls: ['./uniforme.component.scss'],
  providers: [PieComponent]
})
export class TableUniformeComponent implements OnInit {

  id: string
  lote_id: string
  searchKey: string
  uniforme: Uniforme[] = []

  displayedColumns = ['rfid', 'status', 'funcionario', 'matricula', 'area', 'data', 'acoes'];
  dataSource: MatTableDataSource<Uniforme>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort:MatSort;

  constructor(private uniformeService: UniformeService,
    private dialog: MatDialog,
    private formUniformeComponent: FormUniformeComponent,
    private subjectService: SubjectService,
    private notificationsService: NotificationsService,
    private contratoService: ContratoService,
    private pieComponent: PieComponent,
  ) { }

  ngOnInit() {

    this.id = ''
    this.lote_id = ''

    this.subjectService.subject$.subscribe(contrato => {
        this.uniforme = contrato.lote.uniforme
        this.id = contrato.id
        this.lote_id = contrato.lote.lote_id
        this.dataSource = new MatTableDataSource(this.uniforme);
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator;
        this.pieComponent.pieData(this.uniforme)
      })
  }

  onSearchClear(){
    this.searchKey = ""
    this.applyFilter()
  }

  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase()
  }

  onNewUniforme(){
    this.formUniformeComponent.initializeFormGroupUniforme();
    let novo: boolean = true
    console.log("dentro do onNew" ,novo)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      novo: novo,
      id: this.id,
      lote_id: this.lote_id,
      data: new Date(),
    }
    const dialogRef = this.dialog.open(FormUniformeComponent, dialogConfig)
    .afterClosed()
    .pipe(switchMap(
      () => this.contratoService.getOneLote({ id: this.id, lote_id: this.lote_id })
    ))
    .subscribe(result => {
      this.lote_id = result.lote_id
      this.refresh(result.uniforme)
      this.notificationsService.success('Registro inserido!');
    })
  }

  onUpdateUniforme(uniforme) {
    this.formUniformeComponent.initializeFormGroupUniforme();
    let novo: boolean = false
    console.log("dentro do update" ,novo)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      novo: novo,
      id: this.id,
      lote_id: this.lote_id,
      rfid: uniforme["rfid"],
      status: uniforme["status"],
      funcionario: uniforme["funcionario"],
      matricula: uniforme["matricula"],
      area: uniforme["area"],
      data: new Date(),
    }
    const dialogRef = this.dialog.open(FormUniformeComponent, dialogConfig)
      .afterClosed()
      .pipe(switchMap(
        () => this.contratoService.getOneLote({ id: this.id, lote_id: this.lote_id })
      ))
      .subscribe(result => {
        this.lote_id = result.lote_id
        this.refresh(result.uniforme)
        this.notificationsService.success('Tablela Atualizada!');
      })
  }

  refresh(uniforme) {
          this.dataSource.data = uniforme
          this.subjectService.broadcastRefreshUniforme(uniforme)
          this.pieComponent.pieData(uniforme)
    }
  
}   
