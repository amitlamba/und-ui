import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {GlobalFilter} from "../../_models/segment";
import {EntityType, EventReportFilter, GroupBy} from "../../_models/reports";
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

  filterList:GlobalFilter[];
  groupByFilterType:string;

  eventReportFilterParam:EventReportFilter;
  entityTypeParam:EntityType;

  drawChart:ChartModel;

  constructor(private reportService:ReportsService) {
    this.groupByFilterType='Reachability';
    this.eventReportFilterParam=new EventReportFilter();
    this.entityTypeParam=EntityType.event;
    this.filterList = [];
    this.drawChart=new ChartModel();
  }

  ngOnInit() {
    console.log('reach enter')
  }

  ngOnChanges(){
    // this.fromDate='2018-08-10';
    // this.toDate='2018-08-20';
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
    this.reportService.getCountTrend(this.eventReportFilterParam,this.entityTypeParam,groupBy)
      .subscribe(
        response=>{
          this.drawChart.category=response.map(data=>data.groupedBy['name']);
          var data=response.map(data=>data.count);
          var chartSeriesData={
            showInLegend:false,
            seriesName:'email',
            data:data
          };

          this.drawChart.dataSeries.push(chartSeriesData);

          console.log(response);
        }
      );
    // add it another time
  }

  ngOnDestroy(){
    console.log('reach destroy')
  }
}
