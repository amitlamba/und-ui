import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ChartSeriesData, EntityType, EventReportFilter, GroupBy} from "../../_models/reports";
import {GlobalFilter} from "../../_models/segment";
import {ReportsService} from "../../_services/reports.service";

@Component({
  selector: 'app-eventreport-demographics',
  templateUrl: './eventreport-demographics.component.html',
  styleUrls: ['./eventreport-demographics.component.scss']
})
export class EventreportDemographicsComponent implements OnInit ,OnChanges,OnDestroy{

  @Input() segmentId:number;
  @Input() eventName:string;
  @Input() fromDate:string;
  @Input() toDate:string;

  filterList:GlobalFilter[];
  groupByFilterType:string;

  eventReportFilterParam:EventReportFilter;
  entityTypeParam:EntityType;

  genderChart: ChartModel;
  ageChart: ChartModel;


  constructor(private reportService:ReportsService) {
    this.groupByFilterType='Demographics';
    this.eventReportFilterParam=new EventReportFilter();
    this.entityTypeParam=EntityType.event;
    this.filterList = [];
    this.genderChart=new ChartModel();
    this.ageChart=new ChartModel();

  }

  ngOnInit() {
    this.genderChart.yAxisTitle = "Number of Users";
    this.ageChart.yAxisTitle = "Number of Users"
  }

  ngOnChanges(){

    this.fromDate='2018-08-10';
    this.toDate='2018-08-20';
    this.eventReportFilterParam.eventName=this.eventName;
    this.eventReportFilterParam.fromDate=this.fromDate;
    this.eventReportFilterParam.toDate=this.toDate;
    this.eventReportFilterParam.segmentid=this.segmentId;
    this.eventReportFilterParam.propFilter=this.filterList;

    this.drawAgeChart();
    this.drawGenderChart();

  }

  ngOnDestroy(){
    console.log('demo destroy')
  }
  drawGenderChart(){
    var groupBy= new GroupBy();
    groupBy.globalFilterType=this.groupByFilterType;
    groupBy.name='gender';
    this.reportService.getCountTrend(this.eventReportFilterParam,this.entityTypeParam,groupBy)
      .subscribe(
        response=>{
          this.genderChart.category=response.map(data=>data.groupedBy['name']);
          var data=response.map(data=>data.count);
          var chartSeriesData={
            showInLegend:false,
            seriesName:'gender',
            data:data
          };

          this.genderChart.dataSeries.push(chartSeriesData);

          console.log(response);
        }
      );
  }

  drawAgeChart(){
    var groupBy= new GroupBy();
    groupBy.globalFilterType=this.groupByFilterType;
    groupBy.name='dob';
    this.reportService.getCountTrend(this.eventReportFilterParam,this.entityTypeParam,groupBy)
      .subscribe(
      response=>{
        this.ageChart.category=response.map(data=>data.groupedBy['name']);
        var data=response.map(data=>data.count);
        var chartSeriesData={
          showInLegend:false,
          seriesName:'age',
          data:data
        };

        this.ageChart.dataSeries.push(chartSeriesData);

        console.log(response);
      }
    );
  }

}

export class ChartModel {
  title:string='';
  subTitle:string='';
  xAxisTitle:string='';
  yAxisTitle:string='';
  graphType:string='column';
  category:string[];
  dataSeries:ChartSeriesData[]=[];
}
