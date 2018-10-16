import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ChartModel} from "../eventreport-demographics/eventreport-demographics.component";
import {GlobalFilter} from "../../_models/segment";
import {ChartSeriesData, EntityType, EventReportFilter, GroupBy, PERIOD} from "../../_models/reports";
import {ReportsService} from "../../_services/reports.service";

@Component({
  selector: 'app-eventreport-technographics',
  templateUrl: './eventreport-technographics.component.html',
  styleUrls: ['./eventreport-technographics.component.scss']
})
export class EventreportTechnographicsComponent implements OnInit ,OnDestroy,OnChanges{

  @Input() segmentId:number;
  @Input() eventName:string;
  @Input() fromDate:string;
  @Input() toDate:string;

  @Input() filterList:GlobalFilter[] = [];
  groupByFilterType:string;

  eventReportFilterParam:EventReportFilter;
  entityTypeParam:EntityType;

  osChart:ChartModel;
  browserChart:ChartModel;
  deviceChart:ChartModel;

  constructor(private reportService:ReportsService) {
    this.groupByFilterType='Technographics';
    this.eventReportFilterParam=new EventReportFilter();
    this.entityTypeParam=EntityType.event;
    // this.filterList = [];
    this.osChart=new ChartModel();
    this.browserChart=new ChartModel();
    this.deviceChart=new ChartModel();

  }

  ngOnInit() {
  }

  ngOnChanges(){
    // this.fromDate='2018-08-10';
    // this.toDate='2018-08-20';
    this.eventReportFilterParam.eventName=this.eventName;
    this.eventReportFilterParam.fromDate=this.fromDate;
    this.eventReportFilterParam.toDate=this.toDate;
    this.eventReportFilterParam.segmentid=this.segmentId;
    this.eventReportFilterParam.propFilter=this.filterList;

    this.drawOsChart();
    this.drawBrowserChart();
    this.drawDeviceChart();
  }
  ngOnDestroy(){
    console.log('techno destroy')
  }

  drawOsChart() {
    var groupBy= new GroupBy();
    groupBy.globalFilterType=this.groupByFilterType;
    groupBy.name='os';
    this.reportService.getCountTrend(this.eventReportFilterParam,this.entityTypeParam,groupBy)
      .subscribe(
        response=>{
          this.osChart.category=response.map(data=>data.groupedBy['name']);
          var data=response.map(data=>data.count);
          var chartSeriesData={
            showInLegend:false,
            seriesName:'event',
            data:data
          };
          this.osChart.dataSeries = [];
          this.osChart.dataSeries.push(chartSeriesData);

          console.log(response);
        }
      );
  }
  drawBrowserChart(){
    var groupBy= new GroupBy();
    groupBy.globalFilterType=this.groupByFilterType;
    groupBy.name='browser';
    this.reportService.getCountTrend(this.eventReportFilterParam,this.entityTypeParam,groupBy)
      .subscribe(
        response=>{
          this.browserChart.category=response.map(data=>data.groupedBy['name']);
          var data=response.map(data=>data.count);
          var chartSeriesData={
            showInLegend:false,
            seriesName:'event',
            data:data
          };
          this.browserChart.dataSeries = [];
          this.browserChart.dataSeries.push(chartSeriesData);

          console.log(response);
        }
      );

  }
  drawDeviceChart(){
    var groupBy= new GroupBy();
    groupBy.globalFilterType=this.groupByFilterType;
    groupBy.name='device';
    this.reportService.getCountTrend(this.eventReportFilterParam,this.entityTypeParam,groupBy)
      .subscribe(
        response=>{
          this.deviceChart.category=response.map(data=>data.groupedBy['name']);
          var data=response.map(data=>data.count);
          var chartSeriesData={
            showInLegend:false,
            seriesName:'event',
            data:data
          };
          this.deviceChart.dataSeries = [];
          this.deviceChart.dataSeries.push(chartSeriesData);

          console.log(response);
        }
      );
  }

  addFilter(event) {
    this.filterList.push(event);
    this.ngOnChanges();
  }
}
