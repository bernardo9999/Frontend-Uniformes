import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatDividerModule, MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, MatMenuModule, MatListModule, MatGridListModule, MatInputModule, MatRadioModule, MatNativeDateModule, MatSnackBarModule, MatSelectModule, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout'
import { RouterModule } from '@angular/router';
import { AreaComponent } from './widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CardComponent } from './widgets/card/card.component';
import { PieComponent } from './widgets/pie/pie.component';
import { TableComponent } from './widgets/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ParticipantComponent } from './widgets/card/participant/participant.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ComprasComponent } from './widgets/forms/compras/compras.component';
import { TransportadoraComponent } from './widgets/forms/transportadora/transportadora.component';
import { CdComponent } from './widgets/forms/cd/cd.component';
import { FabricanteComponent } from './widgets/forms/fabricante/fabricante.component';
import { FornecedorComponent } from './widgets/forms/fornecedor/fornecedor.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DialogBlockchainComprasComponent } from './widgets/dialog/compras/compras.component';
import { DialogBlockchainFabricanteComponent } from './widgets/dialog/fabricante/fabricante.component';
import { DialogBlockchainTransportadoraComponent } from './widgets/dialog/transportadora/transportadora.component';
import { DialogBlockchainCdComponent } from './widgets/dialog/cd/cd.component';
import { DialogBlockchainFornecedorComponent } from './widgets/dialog/fornecedor/fornecedor.component';
import { TableUniformeComponent } from './widgets/table/uniforme/uniforme.component';
import { FormUniformeComponent } from './widgets/forms/uniforme/uniforme.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    TableComponent,
    ParticipantComponent,
    ComprasComponent,
    TransportadoraComponent,
    CdComponent,
    FabricanteComponent,
    FormUniformeComponent,
    FornecedorComponent,
    DialogBlockchainComprasComponent,
    DialogBlockchainFabricanteComponent,
    DialogBlockchainTransportadoraComponent,
    DialogBlockchainCdComponent,
    DialogBlockchainFornecedorComponent,
    TableUniformeComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    ParticipantComponent,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatSnackBarModule,
    ComprasComponent,
    TransportadoraComponent,
    CdComponent,
    FabricanteComponent,
    FornecedorComponent,
    FormUniformeComponent,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    DialogBlockchainComprasComponent,
    DialogBlockchainFabricanteComponent,
    DialogBlockchainTransportadoraComponent,
    DialogBlockchainCdComponent,
    DialogBlockchainFornecedorComponent,
    TableUniformeComponent,
    ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    DatePipe,
    { provide: MAT_DIALOG_DATA, useValue: [] }
  ],
  entryComponents:[
    ComprasComponent,
    FabricanteComponent,
    FornecedorComponent,
    CdComponent,
    TransportadoraComponent,
    FormUniformeComponent,
    DialogBlockchainComprasComponent,
    DialogBlockchainFabricanteComponent,
    DialogBlockchainTransportadoraComponent,
    DialogBlockchainCdComponent,
    DialogBlockchainFornecedorComponent,
  ]
})
export class SharedModule { }
