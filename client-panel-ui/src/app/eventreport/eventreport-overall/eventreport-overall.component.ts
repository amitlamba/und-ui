import {Component, OnInit} from '@angular/core';
import {ChartSeriesData} from "../../_models/reports";
import {ReportsService} from "../../_services/reports.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-eventreport-overall',
  templateUrl: './eventreport-overall.component.html',
  styleUrls: ['./eventreport-overall.component.scss']
})
export class EventreportOverallComponent implements OnInit {

  eventCountChartTitle: string;
  eventCountChartSubTitle: string;
  eventCountChartXAxisTitle: string;
  eventCountChartCategory: string[];
  eventCountChartYAxisTitle;
  eventCountChartGraphType;
  eventCountChartDataSeries: ChartSeriesData[];

  eventUserTrendChartTitle: string;
  eventUserTrendChartSubTitle: string;
  eventUserTrendChartXAxisTitle: string;
  eventUserTrendChartCategory: string[];
  eventUserTrendChartYAxisTitle;
  eventUserTrendChartGraphType;
  eventUserTrendChartDataSeries: ChartSeriesData[];

  eventTimeTrendChartTitle: string;
  eventTimeTrendChartSubTitle: string;
  eventTimeTrendChartXAxisTitle: string;
  eventTimeTrendChartYAxisTitle;
  eventTimeTrendChartGraphType;
  eventTimeTrendChartCategory: string[]
  eventTimeTrendChartDataSeries: ChartSeriesData[];

  eventUserTimeTrendChartTitle: string;
  eventUserTimeTrendChartSubTitle: string;
  eventUserTimeTrendChartXAxisTitle: string;
  eventUserTimeTrendChartCategory: string[];
  eventUserTimeTrendChartYAxisTitle;
  eventUserTimeTrendChartGraphType;
  eventUserTimeTrendChartDataSeries: ChartSeriesData[];

  constructor(private reportService: ReportsService, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.eventCountGraphInitialization();
    this.eventUserTrendGraphInitialization();
    this.eventTimeTrendGraphInitialization();
    this.trendByTimePeriodGraphInitialization()
  }


  eventCountGraphInitialization() {
    this.eventCountChartTitle = '';
    this.eventCountChartSubTitle = '';
    this.eventCountChartXAxisTitle = '';
    this.eventCountChartYAxisTitle = 'users';
    this.eventCountChartGraphType = 'column';
    //demo

    var eventcountdata = this.reportService.eventcountData;
    this.eventCountChartCategory = eventcountdata.map<string>(data => data.name);
    var usercount = eventcountdata.map(data => data.usercount);
    var eventcount = eventcountdata.map(data => data.eventcount);
    this.eventCountChartDataSeries = Array.of<ChartSeriesData>(
      {showInLegend: true, seriesName: 'usercount', data: usercount},
      {showInLegend: true, seriesName: 'eventcount', data: eventcount})
  }

  trendByTimePeriodGraphInitialization() {

    this.eventUserTimeTrendChartTitle = '';
    this.eventUserTimeTrendChartSubTitle = '';
    this.eventUserTimeTrendChartXAxisTitle = '';
    this.eventUserTimeTrendChartYAxisTitle = 'events';
    this.eventUserTimeTrendChartGraphType = 'column';

    var eventcountdata = this.reportService.trendBytimePeriodData;
    this.eventUserTimeTrendChartCategory = eventcountdata.map<string>(data => data.period);
    var usercount = eventcountdata.map(data => data.usercount);
    var eventcount = eventcountdata.map(data => data.eventcount);
    this.eventUserTimeTrendChartDataSeries = Array.of<ChartSeriesData>(
      {showInLegend: true, seriesName: 'usercount', data: usercount},
      {showInLegend: true, seriesName: 'eventcount', data: eventcount})

  }

  eventUserTrendGraphInitialization() {
    var data = this.reportService.eventUserTrendData;
    this.eventUserTrendChartTitle = '';
    this.eventUserTrendChartSubTitle = '';
    this.eventUserTrendChartXAxisTitle = 'frequency';
    this.eventUserTrendChartYAxisTitle = 'users';
    this.eventUserTrendChartGraphType = 'bar';
    this.eventUserTrendChartCategory = data.map<string>(data => data.eventcount.toString());
    var usercount = data.map(data => data.usercount);

    this.eventUserTrendChartDataSeries = Array.of<ChartSeriesData>({
      showInLegend: false,
      seriesName: 'users',
      data: usercount
    });


  }

  eventTimeTrendGraphInitialization() {
    var data = this.reportService.eventTimeTrend;
    this.eventTimeTrendChartTitle = '';
    this.eventTimeTrendChartSubTitle = '';
    this.eventTimeTrendChartXAxisTitle = 'time';
    this.eventTimeTrendChartYAxisTitle = 'events';
    this.eventTimeTrendChartGraphType = 'column';

    this.eventTimeTrendChartCategory = data.map<string>(data => data.timeRange);
    var eventcount = data.map(data => data.eventCount);
    this.eventTimeTrendChartDataSeries = Array.of<ChartSeriesData>({
      showInLegend: false,
      seriesName: 'events',
      data: eventcount
    });

  }


}
