import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ReportsService} from "../../_services/reports.service";
import {ChartModel} from "../eventreport-demographics/eventreport-demographics.component";
import {GlobalFilter} from "../../_models/segment";
import {EntityType, EventReportFilter, GroupBy, PERIOD} from "../../_models/reports";

@Component({
  selector: 'app-eventreport-geographics',
  templateUrl: './eventreport-geographics.component.html',
  styleUrls: ['./eventreport-geographics.component.scss']
})
export class EventreportGeographicsComponent implements OnInit,OnDestroy ,OnChanges{

  @Input() segmentId:number;
  @Input() eventName:string;
  @Input() fromDate:string;
  @Input() toDate:string;

  filterList:GlobalFilter[];
  groupByFilterType:string;

  eventReportFilterParam:EventReportFilter;
  entityTypeParam:EntityType;

  countryChart:ChartModel;
  stateChart:ChartModel;
  cityChart:ChartModel;

  constructor(private reportsService: ReportsService) {
    this.groupByFilterType='Demographics';
    this.eventReportFilterParam=new EventReportFilter();
    this.entityTypeParam=EntityType.event;
    this.filterList = [];
    this.countryChart=new ChartModel();
    this.stateChart=new ChartModel();
    this.cityChart=new ChartModel();
  }

  ngOnInit() {

  }

  ngOnChanges(){
    this.fromDate='2018-08-10';
    this.toDate='2018-08-20';
    this.eventReportFilterParam.eventName=this.eventName;
    this.eventReportFilterParam.fromDate=this.fromDate;
    this.eventReportFilterParam.toDate=this.toDate;
    this.eventReportFilterParam.segmentid=this.segmentId;
    this.eventReportFilterParam.propFilter=this.filterList;

    this.drawCityChart();
    this.drawCountryChart();
    this.drawStateChart();
  }
  ngOnDestroy(){
    console.log('geo destroy')
  }
  drawCountryChart(){
    var groupBy= new GroupBy();
    groupBy.globalFilterType=this.groupByFilterType;
    groupBy.name='country';
    this.reportsService.getCountTrend(this.eventReportFilterParam,this.entityTypeParam,groupBy)
      .subscribe(
        response=>{
          this.countryChart.category=response.map(data=>data.groupedBy['name']);
          var data=response.map(data=>data.count);
          var chartSeriesData={
            showInLegend:false,
            seriesName:'event',
            data:data
          };

          this.countryChart.dataSeries.push(chartSeriesData);

          console.log(response);
        }
      );
  }
  drawStateChart(){
    var groupBy= new GroupBy();
    groupBy.globalFilterType=this.groupByFilterType;
    groupBy.name='state';
    this.reportsService.getCountTrend(this.eventReportFilterParam,this.entityTypeParam,groupBy)
      .subscribe(
        response=>{
          this.stateChart.category=response.map(data=>data.groupedBy['name']);
          var data=response.map(data=>data.count);
          var chartSeriesData={
            showInLegend:false,
            seriesName:'event',
            data:data
          };

          this.stateChart.dataSeries.push(chartSeriesData);

          console.log(response);
        }
      );
  }
  drawCityChart(){
    var groupBy= new GroupBy();
    groupBy.globalFilterType=this.groupByFilterType;
    groupBy.name='city';
    this.reportsService.getCountTrend(this.eventReportFilterParam,this.entityTypeParam,groupBy)
      .subscribe(
        response=>{
          this.cityChart.category=response.map(data=>data.groupedBy['name']);
          var data=response.map(data=>data.count);
          var chartSeriesData={
            showInLegend:false,
            seriesName:'event',
            data:data
          };

          this.cityChart.dataSeries.push(chartSeriesData);

          console.log(response);
        }
      );
  }

}