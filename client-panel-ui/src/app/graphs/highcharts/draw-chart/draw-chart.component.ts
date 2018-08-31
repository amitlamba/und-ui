import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {chart} from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-draw-chart',
  templateUrl: './draw-chart.component.html',
  styleUrls: ['./draw-chart.component.scss']
})
export class DrawChartComponent implements OnInit {

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
      title: {text: 'simple chart'},
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%H:%M'
        }
      },
      plotOptions: {
        series: {
          pointStart: Date.UTC((new Date()).getUTCFullYear(),(new Date()).getMonth(),(new Date()).getDay()),
          pointInterval: 600 * 1000 // 10 minutes
        }
      },
      series: [
        {
          name: 'Yesterday',
          data: [29.9,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2,29.9,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2,29.9,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2,29.9,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2],

        },
        {
          name: 'Week Ago',
          data: [129.2,29.9,71.5,106.4,129.2,71.5,106.4,129.2,71.5,71.5,106.4,129.2,106.4,129.2,71.5,106.4,129.2,29.9,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2,29.9,71.5,106.4,129.2,71.5,106.4,129.2,71.5,129.2,71.5,71.5,106.4,129.2,106.4,129.2,71.5,106.4,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4,129.2,71.5,106.4],
        }
      ]
    });
  }

}
