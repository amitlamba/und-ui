import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {chart, IndividualSeriesOptions} from 'highcharts';
import * as Highcharts from 'highcharts';
import {ChartSeriesData} from "../../../_models/reports";

@Component({
  selector: 'app-draw-simple-chart',
  templateUrl: './draw-simple-chart.component.html',
  styleUrls: ['./draw-simple-chart.component.scss']
})
export class DrawSimpleChartComponent implements OnInit {
  @Input() title: string = "Dummy Title";
  @Input() subtitle: string = "";
  @Input() charttype: string = "column";
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;
  @Input() categories: string[];
  @Input() dataSeries: Array<ChartSeriesData>;

  @ViewChild('chartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;

  constructor() { }

  ngOnInit() {
    Highcharts.setOptions({
      colors: ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      },
      tooltip: {
        shared: true,
        crosshairs: true
      }
    });
    this.chart = chart(this.chartTarget.nativeElement, {
      chart: {
        type: this.charttype
      },
      title: {
        text: this.title
      },
      subtitle: {
        text: this.subtitle
      },
      xAxis: {
        categories: this.categories,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: this.yAxisTitle
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: this.series()
    });
  }

  series(): IndividualSeriesOptions[] {
    let response = new Array<IndividualSeriesOptions>();

    this.dataSeries.forEach((v,i,a) => {
      response.push({
        name: v.seriesName,
        data: v.data
      })
    })

    return response;
  }

}
