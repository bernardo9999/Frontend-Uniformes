import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
//import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PostsService } from '../../shared/services/posts.service'
import { Observable, of as observableOf, merge } from 'rxjs';
import { Contrato } from '../../shared/models/contrato.model'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit, AfterViewInit {
  contrato: Contrato[];
  dataSource = new TableDataSource(this.postService)
  displayedColumns = ['contrato', '_lote', 'compras', 'quantidade', 'fabricante', 'validaquantidade', 'qualidade', 'transportadora', 'CD', 'validaqualidade', 'fornecedor'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private postService: PostsService) { };
  
  ngOnInit() {
   }

  ngAfterViewInit(){
  //this.dataSource.paginator = this.paginator;
  }

}

export class TableDataSource extends DataSource<Contrato> {
  constructor(private postsService: PostsService) {
    super();
  }
  connect(): Observable<Contrato[]> {
    return this.postsService.getAllContrato();
  }
  disconnect() { }
}

