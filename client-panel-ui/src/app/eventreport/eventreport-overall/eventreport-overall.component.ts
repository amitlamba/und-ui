import {Component, DoCheck, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ChartSeriesData, EntityType, EventReportFilter, GroupBy, PERIOD} from "../../_models/reports";
import {ReportsService} from "../../_services/reports.service";
import {HttpClient} from "@angular/common/http";
import {ChartModel} from "../eventreport-demographics/eventreport-demographics.component";
import {GlobalFilter} from "../../_models/segment";

@Component({
  selector: 'app-eventreport-overall',
  templateUrl: './eventreport-overall.component.html',
  styleUrls: ['./eventreport-overall.component.scss']
})
export class EventreportOverallComponent implements OnInit ,OnChanges,OnDestroy,DoCheck{

  @Input() segmentId:number;
  @Input() eventName:string;
  @Input() fromDate:string;
  @Input() toDate:string;

  totalUser:number;
  totalevent:number;

  filterList:GlobalFilter[];

  entityType:string;
  period:string;

  groupBy:string;
  groupByFilterType:string;

  eventCountChart:ChartModel;

  eventUserTrendChart:ChartModel;

  eventTimeTrendChart:ChartModel;

  eventUserTimeTrendChart:ChartModel;

  eventReportFilterParam:EventReportFilter;
  entityTypeParam:EntityType;
  groupByParam:GroupBy;
  periodParam:PERIOD;

  constructor(private reportService: ReportsService, private httpClient: HttpClient) {
    this.groupByFilterType='Technographics';
    this.groupBy='os';
    this.period='daily';
    this.eventReportFilterParam=new EventReportFilter();
    this.groupByParam=new GroupBy();
    this.groupByParam.globalFilterType=this.groupByFilterType;
    this.groupByParam.name=this.groupBy;
    this.periodParam=PERIOD.daily;
    this.filterList = [];

    this.eventCountChart=new ChartModel();
    this.eventUserTrendChart=new ChartModel();
    this.eventTimeTrendChart=new ChartModel();
    this.eventUserTimeTrendChart=new ChartModel();

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

    this.eventCountChart.dataSeries=[];

    // calling Event trend
    this.entityTypeParam=EntityType.event;
    this.reportService.getCountTrend(this.eventReportFilterParam,this.entityTypeParam,this.groupByParam)
      .subscribe(
        response=>{
          this.eventCountChart.category=response.map(data=>data.groupedBy['name']);
          var data=response.map(data=>data.count);
          this.totalevent=0;
          for(let count of data){
            this.totalevent+=count;
          }
          var chartSeriesData={
            showInLegend:false,
            seriesName:'event',
            data:data
          };

          this.eventCountChart.dataSeries.push(chartSeriesData);

          console.log(response);
        }
      );

    this.entityTypeParam=EntityType.user;
      this.reportService.getCountTrend(this.eventReportFilterParam,this.entityTypeParam,this.groupByParam)
        .subscribe(
          response=>{
            var data=response.map(data=>data.count);
            this.totalUser=0;
            for(let count of data){
              this.totalUser+=count;
            }
            var chartSeriesData={
              showInLegend:false,
              seriesName:'users',
              data:data
            };

            this.eventCountChart.dataSeries.push(chartSeriesData);

            console.log(response);
          }
        );
    //calling time period trend
    this.eventTimeTrendChart.dataSeries=[];

    this.reportService.getTimePeriodTrend(this.eventReportFilterParam,this.entityTypeParam,this.periodParam)
      .subscribe(
        (response)=>{
          console.log(response);
        }
      );
    //calling eventuser trend api



    this.reportService.getEventUserTrend(this.eventReportFilterParam)
      .subscribe(
        (response)=>{
          this.eventUserTrendChart.category=response.map(data=>data.eventcount.toString());
          this.eventUserTrendChart.dataSeries=[];
          this.eventUserTrendChart.dataSeries.push({
            showInLegend:false,
            seriesName:'users',
            data:response.map(data=>data.usercount)
          });
          console.log(response);
        }
      );
    //calling event user time trend
    this.eventUserTimeTrendChart.dataSeries=[];

    this.reportService.getEventTimeTrend(this.eventReportFilterParam)
      .subscribe(
        (response)=>{
          console.log(response);
        }
      );
    //calling aggregate trend
    this.reportService.getEventAggregateTrend(this.eventReportFilterParam,this.periodParam)
      .subscribe(
        (response)=>{
          console.log(response);
        }
      );

    this.eventCountGraphInitialization();
    this.eventUserTrendGraphInitialization();
    this.eventTimeTrendGraphInitialization();
    this.trendByTimePeriodGraphInitialization();

  }

  ngDoCheck(){

  }
  eventCountGraphInitialization() {
    this.eventCountChart.title = '';
    this.eventCountChart.subTitle = '';
    this.eventCountChart.xAxisTitle = '';
    this.eventCountChart.yAxisTitle = 'users';
    this.eventCountChart.graphType = 'column';

  }

  trendByTimePeriodGraphInitialization() {
    this.eventUserTimeTrendChart.title = '';
    this.eventUserTimeTrendChart.subTitle = '';
    this.eventUserTimeTrendChart.xAxisTitle = '';
    this.eventUserTimeTrendChart.yAxisTitle = 'events';
    this.eventUserTimeTrendChart.graphType = 'column';

  }

  eventUserTrendGraphInitialization() {
    this.eventUserTrendChart.title = '';
    this.eventUserTrendChart.subTitle = '';
    this.eventUserTrendChart.xAxisTitle = 'frequency';
    this.eventUserTrendChart.yAxisTitle = 'users';
    this.eventUserTrendChart.graphType = 'bar';
  }

  eventTimeTrendGraphInitialization() {
    this.eventTimeTrendChart.title = '';
    this.eventTimeTrendChart.subTitle = '';
    this.eventTimeTrendChart.xAxisTitle = 'time';
    this.eventTimeTrendChart.yAxisTitle = 'events';
    this.eventTimeTrendChart.graphType = 'column';

  }



  onGroupBy(event){

    console.log(event.target.value);
    this.groupBy=event.target.value;
    this.groupByParam.name=this.groupBy;
    //call event trend by api again
    this.entityTypeParam=EntityType.event;

    this.eventCountChart.dataSeries=[];

    this.reportService.getCountTrend(this.eventReportFilterParam,this.entityTypeParam,this.groupByParam)
      .subscribe(
        response=>{
          this.eventCountChart.category=response.map(data=>data.groupedBy['name']);
          var data=response.map(data=>data.count);
          this.totalevent=0;
          for(let count of data){
            this.totalevent+=count;
          }
          var chartSeriesData={
            showInLegend:false,
            seriesName:'event',
            data:data
          };

          this.eventCountChart.dataSeries.push(chartSeriesData);

          console.log(response);
        }
      );

    this.entityTypeParam=EntityType.user;
    this.reportService.getCountTrend(this.eventReportFilterParam,this.entityTypeParam,this.groupByParam)
      .subscribe(
        response=>{
          var data=response.map(data=>data.count);
          this.totalUser=0;
          for(let count of data){
            this.totalUser+=count;
          }
          var chartSeriesData={
            showInLegend:false,
            seriesName:'users',
            data:data
          };

          this.eventCountChart.dataSeries.push(chartSeriesData);

          console.log(response);
        }
      );
  }
  onEntityType(entity){
    console.log(entity.target.value);
    this.entityType=entity.target.value;
    this.entityTypeParam=EntityType[this.entityType];
    //call trendbytimeperiod api
    this.reportService.getTimePeriodTrend(this.eventReportFilterParam,this.entityTypeParam,this.periodParam)
      .subscribe(
        (response)=>{
          console.log(response);
        }
      );
  }
  onPeriod(period){
    console.log(period.target.value);
    this.period=period.target.value;
    this.periodParam=PERIOD[this.period];
    //call trendbytimeperiod api
    this.reportService.getTimePeriodTrend(this.eventReportFilterParam,this.entityTypeParam,this.periodParam)
      .subscribe(
        (response)=>{
          console.log(response);
        }
      );
  }
  ngOnDestroy(){
    console.log('overall destroy')
  }
}
