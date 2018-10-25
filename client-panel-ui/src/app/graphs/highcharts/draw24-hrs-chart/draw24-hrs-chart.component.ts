import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {chart, IndividualSeriesOptions} from 'highcharts';
import * as Highcharts from 'highcharts';
import {ChartSeriesData} from "../../../_models/reports";
import {formatDate} from "ngx-bootstrap/chronos";

@Component({
  selector: 'app-draw24-hrs-chart',
  templateUrl: './draw24-hrs-chart.component.html',
  styleUrls: ['./draw24-hrs-chart.component.scss']
})
export class Draw24HrsChartComponent implements OnInit,OnChanges {

  @Input() title: string;
  @Input() subtitle:string;
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string ;
  @Input() timeStepInMins: number = 5;
  @Input() dataSeries: Array<ChartSeriesData>;
  @Input() chartType: string ;

  today = new Date();
  tomorrow =  new Date(this.today.getTime() + 24*60*60*1000);

  @ViewChild('chartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;

  constructor() {
  }

  onreflow(event){
    console.log(event.target.value);
    this.dataSeries=event.target.value;
    this.chart.reflow();
    // this.load();
  }
  ngOnInit() {
    // this.load();
  }

  ngOnChanges(){
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
          var s = '<b>At ' + formatDate(timeX, 'HH:mm', '',true)+' hours</b>';

          $.each(this.points, function () {
            s += '<br/>On ' + this.series.name + ': ' +
              this.y + ' users';
          });

          return s;
        },
        shared: true
      },
      title: {text: this.title},
      subtitle: {text: this.subtitle },
      credits: {
        enabled: false
      },
      xAxis: {
        title: {
          text: "Time of the day"
        },
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%H:%M'
        },
        tickInterval: this.timeStepInMins * 60 * 1000,
        min: Date.UTC(this.today.getUTCFullYear(),this.today.getMonth(),this.today.getDay()),
        // max: Date.UTC(this.tomorrow.getUTCFullYear(),this.tomorrow.getMonth(),this.tomorrow.getDay())
      },
      yAxis: {
        title: {
          text: this.yAxisTitle
        }
      },
      plotOptions: {
        series: {
          pointStart: Date.UTC((new Date()).getUTCFullYear(),(new Date()).getMonth(),(new Date()).getDay()),
          pointInterval: this.timeStepInMins * 60 * 1000 // timeStepInMins minutes
        }
      },
      // series: [{name: "ABC", data: [20, 21, 22, 23, 20, 21, 22, 23, 20, 21, 22, 23, 20, 21, 22, 23, 20, 21, 22, 23, 20, 21, 22, 23, 20, 21, 22, 23, 20, 21, 22, 23]}]
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
    console.log(response);
    return response;
  }

}
