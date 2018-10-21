import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';
import {chart, DataPoint, IndividualSeriesOptions, Options} from 'highcharts';

@Component({
  selector: 'app-draw-semidonut-chart',
  templateUrl: './draw-semidonut-chart.component.html',
  styleUrls: ['./draw-semidonut-chart.component.scss']
})
export class DrawSemidonutChartComponent implements OnInit, OnChanges {

  @Input() name: string;
  @Input() dataSeries: Array<number | [number, number] | [string, number] | DataPoint>;

  @ViewChild('chartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(this.chart) {
      this.chart.options = this.options();
      this.chart = chart(this.chartTarget.nativeElement, this.options());
      this.chart.redraw();
    }
  }

  ngOnInit() {
    Highcharts.setOptions({
      credits: {
        enabled: false
      },
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
    this.chart = chart(this.chartTarget.nativeElement, this.options());
  }

  options(): Options {
    return {
      chart: {
        plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
      },
      title: {
        text: this.name,
          align: 'center',
          verticalAlign: 'middle',
          y: 100
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y:.0f} ({point.percentage:.1f}%)</b>'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            // enabled: true,
            // distance: -30,
            // style: {
            //   fontWeight: 'bold',
            //   color: 'white'
            // },
            formatter: function(){return this.point.name+":<br><b>"+this.point.y+" ("+this.point.percentage.toFixed(1)+"%)</b>";}
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%']
        }
      },
      series: [{
        type: 'pie',
        name: this.name,
        innerSize: '50%',
        data: this.dataSeries
      }]
    }
  }
}
