import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {chart, IndividualSeriesOptions} from 'highcharts';
import * as Highcharts from 'highcharts';
import {ChartSeriesData} from "../../../_models/reports";
import {GlobalFilter, GlobalFilterType} from "../../../_models/segment";
import {Router} from "@angular/router";
import {ReportsService} from "../../../_services/reports.service";

@Component({
  selector: 'app-draw-simple-clickable-chart',
  templateUrl: './draw-simple-clickable-chart.component.html',
  styleUrls: ['./draw-simple-clickable-chart.component.scss']
})
export class DrawSimpleClickableChartComponent implements OnInit {
  @Input() title: string = "Dummy Title";
  @Input() subtitle: string = "";
  @Input() chartType: string = "column";
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;
  @Input() categories: string[];
  @Input() dataSeries: Array<ChartSeriesData>;
  @Input() filterType: GlobalFilterType;
  @Input() filterName: string;
  @Output() chartClick: EventEmitter<GlobalFilter> = new EventEmitter();
  @Input() emitType: string = "GlobalFilter"; //GlobalFilter / Event
  @Output() chartClickEmitEvent: EventEmitter<any> = new EventEmitter();

  @ViewChild('chartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;

  constructor(private router:Router,private reportService:ReportsService) { }

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
  }
  ngOnChanges(){
    var that = this;
    this.chart = chart(this.chartTarget.nativeElement, {
      chart: {
        type: this.chartType
      },
      title: {
        text: this.title
      },
      subtitle: {
        text: this.subtitle
      },
      xAxis: {
        categories: this.categories,
        crosshair: true,
        title: {
          text: this.xAxisTitle
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: this.yAxisTitle
        }
      },
      credits: {
        enabled: false
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table><small>(Click to Apply Filter)</small>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          cursor: 'pointer',
          pointPadding: 0.2,
          borderWidth: 0,
          events:{
            click: function (event) {
              if(that.emitType == "Event") {
                console.log(event);
                that.chartClickEmitEvent.emit({event: event.point.category.toString(), date: event.point.series.name});
              } else {
                let gf = new GlobalFilter();
                gf.name = that.filterName;
                gf.globalFilterType = that.filterType;
                gf.operator = "Equals";
                gf.values = [event.point.category.toString()];
                that.chartClick.emit(gf);
              }
            }
          }
        },
        // series: {
        //   cursor: 'pointer',
        //   point: {
        //     events: {
        //       click: function () {
        //         alert('Category: ' + this.category + ', value: ' + this.y);
        //       }
        //     }
        //   }
        // }
      },
      series: this.series()
    });
  }

  series(): any[] {
    let response = new Array<any>();

    this.dataSeries.forEach((v,i,a) => {
      response.push({
        showInLegend:v.showInLegend,
        name: v.seriesName,
        data: v.data,
        // point: {
        //   events: {
        //     click: function () {
        //
        //     }
        //   }
        // }
      })
    })

    return response;
  }

}
