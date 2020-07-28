import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule, MatTableModule, MatSortModule } from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { PostsService } from 'src/app/shared/services/posts.service';
import { LoteService } from 'src/app/shared/services/lote.service';
import { UniformeService } from 'src/app/shared/services/uniforme.service';
import { HttpClientModule } from '@angular/common/http';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { ContratoService } from 'src/app/shared/services/contrato.service';
import { ComprasComponent } from 'src/app/shared/widgets/forms/compras/compras.component';
import { FabricanteComponent } from 'src/app/shared/widgets/forms/fabricante/fabricante.component';
import { FornecedorComponent } from 'src/app/shared/widgets/forms/fornecedor/fornecedor.component';
import { CdComponent } from 'src/app/shared/widgets/forms/cd/cd.component';
import { TransportadoraComponent } from 'src/app/shared/widgets/forms/transportadora/transportadora.component';
import { SubjectService } from 'src/app/shared/services/subject.service'
import { FormUniformeComponent } from 'src/app/shared/widgets/forms/uniforme/uniforme.component';
import { HistoryService } from 'src/app/shared/services/history.service'

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule, 
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule
  ],
  providers:[
    DashboardService,
    PostsService,
    LoteService,
    NotificationsService,
    ContratoService,
    ComprasComponent,
    FabricanteComponent,
    FornecedorComponent,
    CdComponent,
    TransportadoraComponent,
    FormUniformeComponent,
    UniformeService,
    SubjectService,
    HistoryService,
  ]
})
export class DefaultModule { }
