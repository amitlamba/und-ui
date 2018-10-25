import {Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';

import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {ReportsService} from "../_services/reports.service";
import {
  ChartSeriesData, GroupBy, TrendByTime, TrendCount, TrendTimeSeries, UserCountByEventForDate,
  UserCountByEventTimeSeries,
  UserCountForProperty,
  UserCountTimeSeries, UserCountTrendForDate, UserTypeTrendForDate
} from "../_models/reports";
import {NgForm} from "@angular/forms";
import {moment} from "ngx-bootstrap/chronos/test/chain";
import {Router} from "@angular/router";
import {forEach} from "@angular/router/src/utils/collection";
import {SegmentService} from "../_services/segment.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styles: [
    `
      .card {
        margin-top: 3rem;
        margin-bottom: 2em;
      }
      .dropdown .dropdown-menu .dropdown-item {
        cursor: pointer;
      }
    `
  ]
})

export class HomeComponent implements OnInit,OnChanges,OnDestroy {

  selectedSegment = "All Users";

  segments= [{id:1003,name:'All User'},{id:1,name:'segment 1'},{id:2,name:'segment 2'}];
  segmentId:number = -1;
  interval:number;
  private tempinterval: number;
  date1: string;
  date2: string;
  date3: string;
  dates: string[] = [];
  groupByAttributes: Array<string> = ['os', 'device', 'browser'];
  groupBy:GroupBy;

  viewType: string = 'graph';

  trendChartTitle = 'Trends Report';
  trendChartSubTitle = '';
  trendChartXAxisTitle = '';
  trendChartYAxisTitle = 'users';
  trendChartGraphType = 'line';
  trendChartDataSeries: ChartSeriesData[];
  trendchartData: Array<TrendTimeSeries>;

  newVsExistingTitle: string = '';
  newVsExistingSubTitle: string = '';
  newVsExistingXAxisTitle: string = '';
  newVsExistingYAxisTitle: string = 'users';
  newVsExistingDataSeries: ChartSeriesData[];
  newVsExistingGraphType: string = 'line';
  newVsExistingObject: Array<UserTypeTrendForDate>;

  userCountByEventTitle: string;
  userCountByEventSubTitle: string;
  userCountByEventYAxisTitle: string;
  userCountByEventDataSeries: ChartSeriesData[];
  userCountByEventChartType: string;
  userCountByEventCategory: string[];
  userCountByEventData: Array<UserCountByEventForDate> = [];
  // newdata:Map<string,number[]>;

  trendCountName: string;
  trendCountDataSeries: Array<[string, number]>;

  constructor(private userService: UserService, private reportsService: ReportsService,private router:Router,
              private segmentService: SegmentService) {
    console.log('inside constructor');
    this.segmentId=1003;
    this.interval=this.tempinterval=5;
    this.groupBy=new GroupBy();
    this.groupBy.globalFilterType="Technographics";
    this.groupBy.name='os';
    this.date1 = this.createDateString(0);
    console.log(this.date1);
    this.date2 = this.createDateString(1);
    console.log(this.date2);
    this.date3 = this.createDateString(7);
    console.log(this.date3);
    this.dates.push(this.date1, this.date2, this.date3);

    console.log(this.dates);
    this.getDataFromApi(this.segmentId, this.dates, this.interval);
    this.getTrendCountDataFromApi(this.segmentId, this.groupBy, this.interval);
    //stop function untill result is not return.

    //call segemnt list api
    this.trendChartDataSeries=[];
    this.userCountByEventDataSeries=[];
    this.trendCountDataSeries=[];
    this.newVsExistingDataSeries=[];

  }

  createDateString(daysBack: number = 0): string {
    var date = new Date();
    date.setDate(date.getDate() - daysBack);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    return year + '-' + ('0' + (month + 1)).slice(-2) + '-' + ('0' + day).slice(-2);
  }

  ngOnInit() {
    this.segments = this.segmentService.segmentMini;
  }

  ngOnChanges() {

  }

  getSegementList() {

  }

  public singlePicker = {
    singleDatePicker: true,
    showDropdowns: true,
    startDate: moment(),
    opens: "right",
    locale: {
      format: "YYYY-MM-DD"
    }
  };

  convertDataToChartSeriesData(data: Array<UserCountTrendForDate>): ChartSeriesData[] {
    return data.map<ChartSeriesData>(trenddata => {
      let userCountData: number[] = [];
      for(let i=0; i<24*60/this.interval; i++) {
        let dataFound = trenddata.trenddata.find(v=>v.time == i);
        userCountData.push(dataFound?dataFound.usercount:0);
      }
      return {
        showInLegend: true,
        seriesName: trenddata.date,
        data: userCountData
      }
    });
  }

  changeDate(event) {
    this.getNewVsExistingDataByDate(event.target.value);
  }

  userCountByEventGraphInitialization(data: Array<UserCountByEventForDate>) {

    this.userCountByEventTitle = '';
    this.userCountByEventSubTitle = '';
    this.userCountByEventYAxisTitle = 'users';
    this.userCountByEventChartType = 'column';

// <<<<<<< Updated upstream
    // var category = data.map(data =>
    //   data.userCountData.map(data => data.eventname));
    //
    // this.userCountByEventCategory = category.pop();
    //
    // this.userCountByEventDataSeries = data.map<ChartSeriesData>(data => {
    //     return {
    //       showInLegend: true,
    //       seriesName: data.date,
    //       data: data.userCountData.map<number>(data => {
    //
    //          return data.usercount
    //       }
    //     )
    //     };
    //   }
    // );

    var dates=data.map(data=>data.date);
    var cat=new Set();

    data.forEach(data=>data.userCountData.
    forEach(data=>{
      cat.add(data.eventname)
    }));

    let newcat=new Array();
    cat.forEach(v=>newcat.push(v));

    var dataseries=Array<ChartSeriesData>();

    dataseries=data.map<ChartSeriesData>(v=>{
      let seriesName=v.date;
      let list=new Array(cat.size);
      for(let i=0;i<list.length;i++){
        list[i]=0;
      }
      let data=v.userCountData.forEach(v=>{
        let index=newcat.indexOf(v.eventname);
        list[index]=v.usercount;
        });
      return {
        seriesName:seriesName,
        showInLegend:true,
        data:list
      }
    });

    this.userCountByEventCategory=newcat;
    this.userCountByEventDataSeries=dataseries;
// =======
//     var category = data.map(data =>
//       data.userCountData.map(data => data.eventname));
//
//     this.userCountByEventCategory = category.pop();
//
//     this.userCountByEventDataSeries = data.map<ChartSeriesData>(data => {
//         return {
//           showInLegend: true,
//           seriesName: data.date,
//           data: data.userCountData.map<number>(data => {
//
//              return data.usercount
//           }
//         )
//         };
//       }
//     );
// >>>>>>> Stashed changes

  }

  trendCountGraphInitialization(data: Array<UserCountForProperty>) {

    this.trendCountDataSeries = data.map<[string, number]>((tcData) => {
      return [tcData.groupedBy['name'], tcData.usercount]
    });
    this.trendCountName = this.groupBy.name;

  }

  getNewVsExistingDataByDate(date: string) {
    var result = this.newVsExistingObject.find(obj => obj.date === date);
    console.log(result);
    if(result) {
      this.newVsExistingDataSeries = this.convertUserCountTimeSeriesToChartSeriesSeries(result);
      console.log(this.newVsExistingDataSeries);
    }
  }

  convertUserCountTimeSeriesToChartSeriesSeries(data: UserTypeTrendForDate): ChartSeriesData[] {
    let chartSeriesDataArr: ChartSeriesData[] = [];
    let newUsersData: number[] = [];
    let oldUsersData: number[] = [];
    for(let i=0; i<24*60/this.interval; i++) {
      let dataFound = data.userCountData.find(v=>v.time == i);
      oldUsersData.push(dataFound?dataFound.oldusercount:0);
      newUsersData.push(dataFound?dataFound.newusercount:0);
    }
    chartSeriesDataArr[0] = {
      showInLegend: true,
      seriesName: "New Users",
      data: newUsersData
    };
    chartSeriesDataArr[1] = {
      showInLegend: true,
      seriesName: "Existing Users",
      data: oldUsersData
    };
    return chartSeriesDataArr;
  }

  onTable() {
    this.viewType = 'table';
  }

  onGraph() {
    this.viewType = 'graph';
  }

  onGroupByChange(event) {
    this.groupBy.name = event.target.value;
    this.getTrendCountDataFromApi(this.segmentId, this.groupBy, this.interval);
  }

  getDataFromApi(segmentId, dates, interval) {

    this.reportsService.getTrendChart_1(segmentId, dates, interval)
      .subscribe(response => {
        this.trendChartDataSeries = this.convertDataToChartSeriesData(response);
        console.log(this.trendChartDataSeries);
      });


    this.reportsService.getNewVsExisting_1(segmentId, dates, interval)
      .subscribe(response => {
        this.newVsExistingObject=response;
        // this.dates = response.map<string>(data => data.date);
        this.getNewVsExistingDataByDate(this.dates[0]);
      });


    this.reportsService.getUserCountByEvent_1(segmentId, dates)
      .subscribe(response => {
        this.userCountByEventData=response;
        this.userCountByEventGraphInitialization(response);
      });

  }

  getTrendCountDataFromApi(segmentId, groupBy, interval) {
    this.reportsService.getTrendCount_1(segmentId, groupBy, interval)
      .subscribe(response => {
          this.trendCountGraphInitialization(response);
        },
        (error) => {
          console.log(error);
        });
  }

  date1Select(event){
    console.log((event.start).format("YYYY-MM-DD"));
    this.dates[0]=(event.start).format("YYYY-MM-DD");
  }
  date2Select(event){
    console.log((event.start).format("YYYY-MM-DD"));
    this.dates[1]=(event.start).format("YYYY-MM-DD");
  }date3Select(event){
    console.log((event.start).format("YYYY-MM-DD"));
    this.dates[2]=(event.start).format("YYYY-MM-DD");
  }

  intervalChange(event){
    console.log(event.target.value);
    this.tempinterval=event.target.value;
  }
  reloadApi(){
    this.interval = this.tempinterval;
    this.getDataFromApi(this.segmentId,this.dates,this.interval);
    this.getTrendCountDataFromApi(this.segmentId,this.groupBy,this.interval);
  }

  ngOnDestroy(){

  }

  /**
   * Returns Today, Yesterday, or A Week Ago or null
   */
  getDateLabel(index: number): string {
    let date = this.dates[index];
    // console.log(this.dates);
    // console.log(date);
    if(date == this.createDateString(0))
      return "Today";
    else if(date == this.createDateString(1))
      return "Yesterday";
    else if(date == this.createDateString(7))
      return "A week ago";
    else if(moment().diff(moment(date), 'days') > 0)
      return moment().diff(moment(date), 'days') + " days ago";
    return "Date "+(index+1);
  }

  handleChartClick(params: any) {
    console.log(params);
    this.router.navigate(['/reports/event'],{queryParams: params});
  }
}
