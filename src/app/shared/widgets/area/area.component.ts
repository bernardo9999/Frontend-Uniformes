import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
    selector: 'app-widget-area',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

    chartOptions: {};
    @Input() data: any = [];
    Highcharts = Highcharts;

    constructor() { }

    ngOnInit() {
        this.chartOptions = {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Previsão de Budget por Pedido'
            },
            subtitle: {
                text: 'Fonte: Blockchain Uniformes'
            },
            tooltip: {
                split: true,
                valueSuffix: ' K'
            },
            credits:{
                enabled: false
            },
            exporting: {
                enabled: true,

            },
            series: this.data
        }
        setTimeout(()=>{
            window.dispatchEvent(
            new Event('resize')
            );
        }, 300);
        HC_exporting(Highcharts);
    }

}
