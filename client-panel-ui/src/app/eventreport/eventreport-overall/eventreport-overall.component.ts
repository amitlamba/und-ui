import {Component, DoCheck, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {
  AggregateBy, ChartSeriesData, EntityType, EventPeriodCount, EventReportFilter, GroupBy,
  PERIOD
} from "../../_models/reports";
import {ReportsService} from "../../_services/reports.service";
import {HttpClient} from "@angular/common/http";
import {ChartModel} from "../eventreport-demographics/eventreport-demographics.component";
import {GlobalFilter} from "../../_models/segment";
import {forEach} from "@angular/router/src/utils/collection";
import * as moment from "moment";

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

  @Input() filterList:GlobalFilter[];

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

  aggregateBy:AggregateBy;
  constructor(private reportService: ReportsService, private httpClient: HttpClient) {
    this.groupByFilterType='Technographics';
    this.groupBy='os';
    this.period='dayOfMonth';
    this.eventReportFilterParam=new EventReportFilter();
    this.groupByParam=new GroupBy();
    this.groupByParam.globalFilterType=this.groupByFilterType;
    this.groupByParam.name=this.groupBy;
    this.periodParam=PERIOD.dayOfMonth;
    this.eventCountChart=new ChartModel();
    this.eventUserTrendChart=new ChartModel();
    this.eventTimeTrendChart=new ChartModel();
    this.eventUserTimeTrendChart=new ChartModel();
    this.aggregateBy=new AggregateBy();
    this.aggregateBy.name="Amount";
  }

  ngOnInit() {
  }

  ngOnChanges(){

    this.eventReportFilterParam.eventName=this.eventName;
    this.eventReportFilterParam.fromDate=this.fromDate;
    this.eventReportFilterParam.toDate=this.toDate;
    this.eventReportFilterParam.segmentid=this.segmentId;
    this.eventReportFilterParam.propFilter=this.filterList;

    this.eventCountChart.dataSeries=[];

    this.getCountTrend(EntityType.event, this.groupByParam, 'events');
    this.getCountTrend(EntityType.user, this.groupByParam, 'users');

    //calling time period trend
    this.getTimePeriodTrend()

    //calling eventuser trend api
    this.getEventUserTrend();

    //calling event user time trend
    this.eventUserTimeTrendChart.dataSeries=[];

    this.getEventTimeTrend();
    //calling aggregate trend

    this.reportService.getEventAggregateTrend(this.eventReportFilterParam,this.periodParam,this.aggregateBy)
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

  //Event Time Trend Chart
  private getEventTimeTrend() {
    this.reportService.getEventTimeTrend(this.eventReportFilterParam)
      .subscribe(
        (response) => {
          for (let i = 0; i < 24; i++) {
            let res = response.filter(v=> v.hour==i);
            if(!res.length) {
              response.push({eventCount: 0, hour: i});
            }
          }
          response = response.sort((a,b)=>a.hour - b.hour);
          this.eventUserTimeTrendChart.category = response.map(data => data.hour.toString()+"-"+(data.hour+1).toString());
          this.eventUserTimeTrendChart.dataSeries = [];
          this.eventUserTimeTrendChart.dataSeries.push({
            showInLegend: false,
            seriesName: 'Events',
            data: response.map(data => data.eventCount)
          });
  })

}


  //Frequency Chart
  private getEventUserTrend() {
    this.reportService.getEventUserTrend(this.eventReportFilterParam)
      .subscribe(
        (response) => {
          response = response.sort((a,b) => a.eventcount - b.eventcount);
          this.eventUserTrendChart.category = response.map(data => data.eventcount.toString());
          this.eventUserTrendChart.dataSeries = [];
          this.eventUserTrendChart.dataSeries.push({
            showInLegend: false,
            seriesName: 'users',
            data: response.map(data => data.usercount)
          });
          console.log(response);
        }
      );
  }

  //Event Trend Chart
  private getCountTrend(entityTypeParam: EntityType, groupByParam: GroupBy, seriesName: string) {
    this.reportService.getCountTrend(this.eventReportFilterParam, entityTypeParam, groupByParam)
      .subscribe(
        response=>{
          this.eventCountChart.category=response.map(data=>data.groupedBy['name']);
          var data=response.map(data=>data.count);
          switch(seriesName) {
            case 'events':
              this.totalevent=0;
              for(let count of data){
                this.totalevent+=count;
              }
              break;
            case 'users':
              this.totalUser=0;
              for(let count of data){
                this.totalUser+=count;
              }
              break;
          }
          var chartSeriesData={
            showInLegend: false,
            seriesName: seriesName,
            data: data
          };

          this.eventCountChart.dataSeries.push(chartSeriesData);

          console.log(response);
        }
      );
  }

  //Trend By Time Period Chart
  private getTimePeriodTrend() {
    this.reportService.getTimePeriodTrend(this.eventReportFilterParam,this.entityTypeParam?this.entityTypeParam:EntityType.event,this.periodParam)
      .subscribe(
        (response)=>{
          response = response.sort((a,b) => {
              let ydiff = a.period['year'] - b.period['year'];
              let mdiff = a.period['month'] - b.period['month'];
              let ddiff = 0;
              if (a.period['dayOfMonth'])
                ddiff = a.period['dayOfMonth'] - b.period['dayOfMonth'];
              else if (a.period['dayOfWeek'])
                ddiff = a.period['dayOfWeek'] - b.period['dayOfWeek'];
              if (ydiff != 0)
                return ydiff;
              else if (mdiff != 0)
                return mdiff;
              else return ddiff;
            }
          );
          switch(this.periodParam) {
            case PERIOD.dayOfMonth:
              this.eventTimeTrendChart.category=response.map(data=>data.period['year']+"-"+data.period['month']+"-"+data.period['dayOfMonth']);
              break;
            case PERIOD.dayOfWeek:
              console.log(response);
              response = this.converDailyDataToWeekly(response);
              console.log(response);
              this.eventTimeTrendChart.category=response.map(data=>data.period['year']+"-"+data.period['month']+"-"+data.period['day'] + " -");
              break;
            case PERIOD.month:
              this.eventTimeTrendChart.category=response.map(data=>data.period['year']+"-"+data.period['month']);
              break;
          }
          // this.eventTimeTrendChart.category=response.map(data=>data.period['year']+"-"+data.period['month']+"-"+data.period[this.periodParam]);
          this.eventTimeTrendChart.dataSeries=[];
          this.eventTimeTrendChart.dataSeries.push({
            showInLegend:false,
            seriesName: this.entityTypeParam==EntityType.user?'users':'events',
            data:response.map(data=>data.count)
          });
          this.eventTimeTrendChart.yAxisTitle = this.entityTypeParam==EntityType.user?'users':'events';
          console.log(response);
        }
      );
  }

  converDailyDataToWeekly(data: EventPeriodCount[]) {
    let res = {};
    let firstDate=data[0].period['year']+"-"+data[0].period['month']+"-"+data[0].period['dayOfMonth'];
    let firstStartOfWeek =moment(firstDate).startOf('week');
    data.forEach((value)=>{
      let newDate=value.period['year']+"-"+value.period['month']+"-"+value.period['dayOfMonth'];
      let startOfWeek = moment(newDate).startOf('week');
      if(!res[startOfWeek.format('YYYY-MM-DD')]) {
        res[startOfWeek.format('YYYY-MM-DD')] = value.count;
      } else {
        res[startOfWeek.format('YYYY-MM-DD')] += value.count;
      }
    });
    console.log(res);
    return Object.keys(res).map<EventPeriodCount>(v => {
      return {
        period: JSON.parse(JSON.stringify({
          'year': v.substr(0, 4),
          'month': v.substr(5, 2),
          'day': v.substr(8, 2)
        })),
        count: res[v]
      };
    });
  }

  convertDailyDataToMap(data:EventPeriodCount[]){
    var map:Map<number,EventPeriodCount>=new Map();
    data.forEach((value, index) => {
        var year=value.period['year'];
        var month=value.period['month'];
        var date=value.period['dayOfMonth'];
        var time=moment(year+"-"+month+"-"+date);
        var week=time.week();
      if(map.has(week)){
          var v=map.get(week);
          v.count+=value.count;
          map.set(week,v)
      }else{
          map.set(week,value)
      }
    });
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
    this.eventUserTimeTrendChart.xAxisTitle = 'Time of the day (hours)';
    this.eventUserTimeTrendChart.yAxisTitle = 'No of Events';
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

    this.eventCountChart.dataSeries=[];

    this.getCountTrend(EntityType.event, this.groupByParam, 'events');
    this.getCountTrend(EntityType.user, this.groupByParam, 'users');

  }

  onEntityType(entity){
    this.entityType=entity.target.value;
    this.entityTypeParam=EntityType[this.entityType];
    //call trendbytimeperiod api
    this.getTimePeriodTrend();
  }
  onPeriod(period){
    this.period=period.target.value;
    this.periodParam=PERIOD[this.period];
    //call trendbytimeperiod api
    this.getTimePeriodTrend();
  }
  ngOnDestroy(){
    console.log('overall destroy')
  }
}
