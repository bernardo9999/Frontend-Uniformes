import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-widget-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  Highcharts = Highcharts
  chartOptions = {};
  uniforme: any[] = [];
  ativos: number;
  retornados: number;
  descartados: number;
  sem_identificar: number;
  data:any[] = [
    {
      name: 'Ativos',
      y: this.ativos,
      sliced: true,
      selected: true
    },
    {
      name: 'Descartados',
      y: this.descartados
    },
    {
      name: 'Retornados',
      y: this.retornados
    },
    {
      name: 'Sem Identificar',
      y: this.sem_identificar
    }
  ]

  constructor(private subjectService: SubjectService,) {}

  ngOnInit() {
     this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Uniformes'
      },
      exporting: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Status',
        colorByPoint: true,
        data: this.data
      }]
    }
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
    HC_exporting(Highcharts);
  
  }
  

pieData(uniforme){
  this.ativos=0;
  this.retornados=0;
  this.descartados=0;
  this.sem_identificar=0;

  console.log("teste desde pie", uniforme)
  let count_ativos: number = 0;
  let count_retornados: number = 0;
  let count_descartados: number = 0;
  let count_sem_identificar: number = 0;

  let total: number = 0
  
    this.uniforme = uniforme
    total = this.uniforme.length
    for (let i in this.uniforme) {
      if (this.uniforme[i].status === "Ativo") {
        count_ativos = count_ativos + 1
      }
      if (this.uniforme[i].status === "Retornado") {
        count_retornados = count_retornados + 1
      }
      if (this.uniforme[i].status === "Descartado") {
        count_descartados = count_descartados + 1
      }
      if (this.uniforme[i].status === "Sem Identificar") {
        count_sem_identificar = count_sem_identificar + 1
      }
    }
    this.ativos =  Math.round((count_ativos*100) / total)
    this.retornados = Math.round((count_retornados * 100) / total)
    this.descartados = Math.round((count_descartados * 100) / total)
    this.sem_identificar = Math.round((count_sem_identificar * 100) / total)
    console.log("Total", total, "al", count_ativos, "rl", count_retornados, "dl", count_descartados, "sil", count_sem_identificar)
    console.log("a", this.ativos, "r", this.retornados, "d", this.descartados, "si", this.sem_identificar)
    this.pieRefresh()
  }



  pieRefresh(){
    // this.Highcharts.chart({
    //   name: 'Status',
    //   colorByPoint: true,
    //   data: this.data
    // })
  }
 
}
