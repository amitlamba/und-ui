import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ChartSeriesData, EntityType, EventCount, EventReportFilter, GroupBy} from "../../_models/reports";
import {GlobalFilter} from "../../_models/segment";
import {ReportsService} from "../../_services/reports.service";
// import {getFullYear} from "ngx-bootstrap/chronos/utils/date-getters";

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
  @Input() button: string;

  @Input() filterList:GlobalFilter[];

  groupByFilterType:string;

  eventReportFilterParam:EventReportFilter;
  entityTypeParam:EntityType;

  genderChart: ChartModel;
  ageChart: ChartModel;


  constructor(private reportService:ReportsService) {
    this.groupByFilterType='Demographics';
    this.eventReportFilterParam=new EventReportFilter();
    this.entityTypeParam=EntityType.user;
    this.genderChart=new ChartModel();
    this.ageChart=new ChartModel();

  }

  ngOnInit() {
    this.genderChart.yAxisTitle = "Number of Users";
    this.genderChart.xAxisTitle = "Gender";
    this.ageChart.yAxisTitle = "Number of Users";
    this.ageChart.xAxisTitle = "Age (years)";
  }

  ngOnChanges(){

    // this.fromDate='2018-08-10';
    // this.toDate='2018-08-20';
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
            seriesName:'Users',
            data:data
          };
          this.genderChart.dataSeries = [];
          this.genderChart.dataSeries.push(chartSeriesData);

          console.log(response);
        }
      );
  }

  drawAgeChart(){
    var groupBy= new GroupBy();
    groupBy.globalFilterType=this.groupByFilterType;
    groupBy.name='age';
    this.reportService.getCountTrend(this.eventReportFilterParam,this.entityTypeParam,groupBy)
      .subscribe(
      response=>{
        response = this.groupAge(response);
        this.ageChart.category=response.map(data=>data.groupedBy['name']);
        var data=response.map(data=>data.count);
        var chartSeriesData={
          showInLegend:false,
          seriesName:'Users',
          data:data
        };
        this.ageChart.dataSeries = [];
        this.ageChart.dataSeries.push(chartSeriesData);

        console.log(response);
      }
    );
  }

  private groupByAge(dobGroup: EventCount[]): EventCount[] {
    var ng = {};
    dobGroup.forEach((v,i,a)=>{
      let age = this.getAge(v.groupedBy['name']).toString();
      ng[age] = (ng[age]?ng[age]:0) + v.count;
    });
    return Object.keys(ng).map<EventCount>(v=> {
      let ec = new EventCount();
      ec['count']=ng[v];
      ec['groupedBy'] = new Map();
      ec['groupedBy']['name']=v;
      return ec;
    });
  }

  private getAge(dob: string): number {
    let dobDate = Date.parse(dob);
    let yeardiff = (new Date().getFullYear() - new Date(dobDate).getFullYear());
    let monthdiff = this.getMonthDiff(dobDate);
    let offset = 0;
    if(monthdiff == 0) {
      let daydiff = this.getDayOfMonthDiff(dobDate);
      offset = daydiff < 0 ? -1 : 0
    } else if(monthdiff < 0) {
      offset = -1;
    }
    return yeardiff + offset
  }

  private groupAge(data:EventCount[]) {
    let currentYear = new Date().getFullYear();
    let map = new Map<string, number>();
    map.set("10-18",0);
    map.set("18-25",0);
    map.set("25-35",0);
    map.set("35-50",0);
    map.set("50-65",0);
    map.set("65+",0);

    data.forEach(value => {
    let v=value.groupedBy['_id'];
    console.log("value is ",v);
      if(v<currentYear-65 && v!=null){
        map.set("65+",map.get('65+')+value.count);
      }else if(v<=currentYear-50 && v!=null){
        map.set("50-65",map.get('50-65')+value.count);
      }else if(v<=currentYear-35 && v!=null){
        map.set("35-50",map.get('35-50')+value.count);
      }else if(v<=currentYear-25 && v!=null){
        map.set("25-35",map.get('25-35')+value.count);
      }else if(v<=currentYear-18 && v!=null){
        map.set("18-25",map.get('18-25')+value.count);
      }else if(v<=currentYear-10 && v!=null){
        map.set("10-18",map.get('10-18')+value.count);
      }
      });
     return this.convertMapIntoEventCount(map);
  }

  private convertMapIntoEventCount(v:Map<string,number>):EventCount[]{
    let eventcount=[];
    v.forEach((value,key,map)=>{
      eventcount.push({
        'count':map.get(key),
        'groupedBy':{
          'name':key
        }
      });
    });
    return eventcount;
  }



  private getMonthDiff(dobDate): number {
    return new Date().getMonth() - new Date(dobDate).getMonth();
  }
  private getDayOfMonthDiff(dobDate): number {
    return new Date().getDate() - new Date(dobDate).getDate();
  }

  addFilter(event) {
    console.log(event);
    this.filterList.push(event);
    this.ngOnChanges();
  }

  addAgeFilter(event) {
    event.operator = "Between";
    event.type = "number";
    let v=event.values[0].split("-");
    if(v[0]=='65+'){
      event.values=[65,120];
    }else{
      event.values=[parseInt(v[0]),parseInt(v[1])];
    }


    console.log(event);
    this.filterList.push(event);
    this.ngOnChanges();
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
