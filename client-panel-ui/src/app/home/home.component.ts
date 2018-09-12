import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {ReportsService} from "../_services/reports.service";
import {
  ChartSeriesData, TrendByTime, TrendCount, TrendTimeSeries, UserCountByEventTimeSeries,
  UserCountTimeSeries
} from "../_models/reports";
import {NgForm} from "@angular/forms";
import {moment} from "ngx-bootstrap/chronos/test/chain";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

  segments: Array<string> = [];
  segmentId = 1;
  interval = 5;
  date1: string;
  date2: string;
  date3: string;
  dates: string[] = [];
  groupByAttributes: Array<string> = ['os', 'device', 'browser'];
  groupBy = 'os'

  viewType: string = 'graph';
  @ViewChild('formref') formRef:NgForm;

  trendChartTitle = '';
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
  newVsExistingObject: Array<UserCountTimeSeries>;


  userCountByEventTitle: string;
  userCountByEventSubTitle: string;
  userCountByEventYAxisTitle: string;
  userCountByEventDataSeries: ChartSeriesData[];
  userCountByEventChartType: string;
  userCountByEventCategory: string[];
  userCountByEventData: Array<UserCountByEventTimeSeries> = [];

  trendCountName: string;
  trendCountDataSeries: Array<[string, number]>
  trendcountData: Array<TrendCount>

  constructor(private userService: UserService, private reportsService: ReportsService) {
    console.log('inside constructor')
    // this.userCountByEventData=this.reportsService.usercountbyeventsData;
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    this.date1 = year + '-' + ('0' + (month + 1)).slice(-2) + '-' + ('0' + day).slice(-2);
    console.log(this.date1)
    date.setDate(date.getDate() - 1);
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();
    this.date2 = year + '-' + ('0' + (month + 1)).slice(-2) + '-' + ('0' + day).slice(-2);
    console.log(this.date2)
    date.setDate(date.getDate() - 7);
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();
    this.date3 = year + '-' + ('0' + (month + 1)).slice(-2) + '-' + ('0' + day).slice(-2);
    console.log(this.date3)
    this.dates.push(this.date1, this.date2, this.date3);

    this.getDataFromApi(this.segmentId, this.dates, this.interval);
    this.getTrendCountDataFromApi(this.segmentId, this.groupBy, this.interval);
    //stop function untill result is not return.

    //call segemnt list api
  }

  ngOnInit() {
    //wait until data is return

    // this.trendChartGraphInitialization(this.trendchartData);
    // this.newVsExistingData(this.newVsExistingObject);
    // this.userCountByEventGraphInitialization(this.userCountByEventData);
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

  trendChartGraphInitialization(data: Array<TrendTimeSeries>) {

    this.trendChartDataSeries = data.map<ChartSeriesData>(trenddata => {
      return {
        showInLegend: true,
        seriesName: trenddata.date,
        data: trenddata.trenddata.map<number>(count => count.usercount)
      }
    });
  }

  changeDate(event) {
    this.getNewVsExistingDataByDate(event.target.value);
  }

  newVsExistingGraphInitialization(trendTimeSeries: Array<TrendTimeSeries>) {
    this.newVsExistingDataSeries = trendTimeSeries.map<ChartSeriesData>(trenddata => {
      return {showInLegend: true, seriesName: trenddata.date, data: trenddata.trenddata.map(count => count.usercount)}
    });
  }

  userCountByEventGraphInitialization(data: Array<UserCountByEventTimeSeries>) {

    this.userCountByEventTitle = '';
    this.userCountByEventSubTitle = '';
    this.userCountByEventYAxisTitle = 'users';
    this.userCountByEventChartType = 'column';

    var category = data.map(data =>
      data.userCountData.map(data => data.eventname));

    this.userCountByEventCategory = category.pop();

    this.userCountByEventDataSeries = data.map<ChartSeriesData>(data => {
        return {
          showInLegend: true,
          seriesName: data.date,
          data: data.userCountData.map<number>(data => data.usercount)
        };
      }
    );

  }

  trendCountGraphInitialization(data: Array<TrendCount>) {

    this.trendCountName = this.groupBy;
    this.trendCountDataSeries = data.map<[string, number]>((tcData) => {
      return [tcData.name, tcData.usercount]
    });

  }

  newVsExistingData(data: Array<UserCountTimeSeries>) {
    this.dates = data.map<string>(data => data.date);

    this.getNewVsExistingDataByDate('2018-08-27');
    // this.getNewVsExistingDataByDate(this.date1);
  }


  getNewVsExistingDataByDate(date: string) {
    var trendTimeSeries = Array<TrendTimeSeries>();
    var result = this.newVsExistingObject.find(obj => obj.date === date);
    var date = result.date;
    var usercountdata = result.userCountData;
    var newusertrenddata = usercountdata.map<TrendByTime>(data => {
      var obj = new TrendByTime();
      obj.time = data.time;
      obj.usercount = data.newusercount;
      return obj
    });

    var oldusertrenddata = usercountdata.map<TrendByTime>(data => {
      var obj = new TrendByTime();
      obj.time = data.time;
      obj.usercount = data.oldusercount;
      return obj
    });

    var newobj = new TrendTimeSeries();
    newobj.date = 'new' + date;
    newobj.trenddata = newusertrenddata;
    trendTimeSeries.push(newobj);
    newobj = new TrendTimeSeries();
    newobj.date = 'old' + date;
    newobj.trenddata = oldusertrenddata;
    trendTimeSeries.push(newobj);

    //call graph initializaation method pass object that are required
    this.newVsExistingGraphInitialization(trendTimeSeries);
  }

  onTable() {
    this.viewType = 'table';
  }

  onGraph() {
    this.viewType = 'graph';
  }

  onSubmit(formRef) {
    console.log(formRef)
    console.log(this.segmentId+this.date1+this.date2+this.date3+this.interval);
    this.segmentId=this.formRef.value.segmentId;
    this.date1=this.formRef.value.date1;
    this.date2=this.formRef.value.date2;
    this.date3=this.formRef.value.date3;
    this.interval=this.formRef.value.interval;
    console.log('second data')
    console.log(this.segmentId+this.date1+this.date2+this.date3+this.interval);
    // this.getDataFromApi(this.segmentId,this.dates,this.interval);
    // this.getTrendCountDataFromApi(this.segmentId,this.groupBy,this.interval);
  }

  onGroupByChange(event) {
    this.groupBy = event.target.value
    this.getTrendCountDataFromApi(this.segmentId, this.groupBy, this.interval);
  }

  getDataFromApi(segmentId, dates, interval) {
    console.log('inside getDataFromApi')
    console.log(segmentId+dates+interval);
    this.reportsService.getTrendChart(segmentId, dates, interval)
      .subscribe(response => {
        this.trendChartGraphInitialization(response);
      });
    this.reportsService.getNewVsExisting(segmentId, dates, interval)
      .subscribe(response => {
        this.newVsExistingObject=response;
        this.newVsExistingData(response);
      });
    this.reportsService.getUserCountByEvent(segmentId, dates)
      .subscribe(response => {
        this.userCountByEventGraphInitialization(response);
      });

  }

  getTrendCountDataFromApi(segmentId, groupBy, interval) {
    console.log('inside getTrendCountData');
    console.log(segmentId+groupBy+interval);

    this.reportsService.getTrendCount(segmentId, groupBy, interval)
      .subscribe(response => {
          this.trendCountGraphInitialization(response);
        },
        (error) => {
          console.log(error)
        });
  }

  date1Select(event){
    console.log(event);
  }
  date2Select(event){
    console.log(event);
  }date3Select(event){
    console.log(event);
  }

}
