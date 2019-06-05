import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {GlobalFilter} from "../../_models/segment";
import {EntityType, EventReportFilter, GroupBy, Reachability} from "../../_models/reports";
import {ReportsService} from "../../_services/reports.service";
import {ChartModel} from "../eventreport-demographics/eventreport-demographics.component";

@Component({
  selector: 'app-eventreport-reachability',
  templateUrl: './eventreport-reachability.component.html',
  styleUrls: ['./eventreport-reachability.component.scss']
})
export class EventreportReachabilityComponent implements OnInit,OnDestroy ,OnChanges{

  @Input() segmentId:number;
  @Input() eventName:string;
  @Input() fromDate:string;
  @Input() toDate:string;
  @Input() button: string;

  @Input() filterList:GlobalFilter[];
  groupByFilterType:string;

  eventReportFilterParam:EventReportFilter;
  entityTypeParam:EntityType;

  drawChart:ChartModel;

  constructor(private reportService:ReportsService) {
    this.groupByFilterType='Reachability';
    this.eventReportFilterParam=new EventReportFilter();
    this.entityTypeParam=EntityType.event;
    this.drawChart=new ChartModel();
  }

  ngOnInit() {
    console.log('reach enter')
  }

  ngOnChanges(){
    this.eventReportFilterParam.eventName=this.eventName;
    this.eventReportFilterParam.fromDate=this.fromDate;
    this.eventReportFilterParam.toDate=this.toDate;
    this.eventReportFilterParam.segmentid=this.segmentId;
    this.eventReportFilterParam.propFilter=this.filterList;
    this.drawChart.dataSeries=[];
    this.drawReachabilityChart();
  }
  drawReachabilityChart() {
    var groupBy= new GroupBy();
    groupBy.globalFilterType=this.groupByFilterType;
    groupBy.name='email';
    this.reportService.getEventReachability(this.eventReportFilterParam,this.entityTypeParam,groupBy)
      .subscribe(
        response=>{
          let result=this.removeTotalUser(response);
          this.drawChart.category=Object.keys(result);
          let data=this.drawChart.category.map<number>((v)=>{
            return response[v] as number;
          });
          let chartSeriesData={
            showInLegend:false,
            seriesName:'Reachability',
            data:data
          };
          this.drawChart.xAxisTitle = "Reachable by";
          this.drawChart.yAxisTitle = "Number of users";
          this.drawChart.dataSeries.push(chartSeriesData);

          console.log(response);
        }
      );
    // add it another time
  }

  removeTotalUser(response){
    return {
    "email":response.email,
      "sms":response.sms,
      "android":response.android,
      "webpush":response.webpush,
      "ios":response.ios
    }
  }

  ngOnDestroy(){
    console.log('reach destroy')
  }
}
