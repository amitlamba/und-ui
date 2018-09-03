import {Component, OnInit} from '@angular/core';

import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {ReportsService} from "../_services/reports.service";
import {ChartSeriesData, TrendTimeSeries} from "../_models/reports";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  title: string = "Dashboard";
  // users: EventUser[] = [];

  trendCountData: Array<[string, number]>;
  trendChartData: Array<TrendTimeSeries>;
  d: ChartSeriesData[];
  simpleChartdata: ChartSeriesData[] = [];
  simpleChartCategories: string[];

  constructor(private userService: UserService, private reportsService: ReportsService) {

  }

  ngOnInit() {
    this.trendCountData = this.reportsService.trendcountData.map<[string, number]>((tcData)=>{return [tcData.name, tcData.usercount]});
    this.trendChartData = this.reportsService.trendchartData;
    this.d = this.trendChartData.map<ChartSeriesData>((v)=>{
      return {seriesName: v.date, data: v.trenddata.map<number>((v1)=> {
        return v1.usercount;
      })}
    });
    this.simpleChartCategories = this.reportsService.trendBytimePeriodData.map(v=>v.period);
    this.simpleChartdata[0] = {
      seriesName: "Trend By Time Period",
      data: this.reportsService.trendBytimePeriodData.map(v=>{
        return v.eventcount;
      })
    };
  }


}
