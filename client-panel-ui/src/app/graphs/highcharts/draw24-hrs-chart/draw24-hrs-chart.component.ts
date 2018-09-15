import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {chart, IndividualSeriesOptions} from 'highcharts';
import * as Highcharts from 'highcharts';
import {ChartSeriesData} from "../../../_models/reports";
import {formatDate} from "ngx-bootstrap/chronos";

@Component({
  selector: 'app-draw24-hrs-chart',
  templateUrl: './draw24-hrs-chart.component.html',
  styleUrls: ['./draw24-hrs-chart.component.scss']
})
export class Draw24HrsChartComponent implements OnInit {

  @Input() name: string = 'Users Data';
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string = '# of users';
  @Input() timeStepInMins: number = 5;
  @Input() dataSeries: Array<ChartSeriesData>;
  @Input() chartType: string = 'line';

  @ViewChild('chartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;

  constructor() {
  }

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
        type: this.chartType
      },
      tooltip: {
        headerFormat: '',
        formatter: function () {
          var timeX = new Date(this.x);
          var s = '<b>At ' + formatDate(timeX, 'hh:MM')+' hours</b>';

          $.each(this.points, function () {
            s += '<br/>On ' + this.series.name + ': ' +
              this.y + ' users';
          });

          return s;
        },
        shared: true
      },
      title: {text: this.name},
      credits: {
        enabled: false
      },
      xAxis: {
        // title: this.xAxisTitle,
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%H:%M'
        }
      },
      yAxis: {
        title: {
          text: this.yAxisTitle
        }
      },
      plotOptions: {
        series: {
          pointStart: Date.UTC((new Date()).getUTCFullYear(),(new Date()).getMonth(),(new Date()).getDay()),
          pointInterval: 300 * 1000 // 10 minutes
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
