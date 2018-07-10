import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js'
import {ReportsService} from "../../_services/reports.service";


@Component({
  selector: 'app-events-graph',
  templateUrl: './events-graph.component.html',
  styleUrls: ['./events-graph.component.scss']
})
export class EventsGraphComponent implements OnInit {
  public eventsChartData: Array<any> = [];
  public eventsChartLabels: Array<any> = [];
  public eventsChartOptions: any = {};
  public eventsChartColors: Array<any> = [];
  public eventsChartLegend: boolean;
  public eventsChartType: string;

  constructor(private reportsService: ReportsService) {
  }

  ngOnInit() {
    this.eventsChartData = this.reportsService.eventsChartData;
    // this.eventsChartLabels = this.reportsService.lineChartLabels;
    this.eventsChartOptions = this.reportsService.lineChartOptions.options;
    this.eventsChartColors = this.reportsService.lineChartColors;
    this.eventsChartLegend = this.reportsService.lineChartLegend;
    this.eventsChartType = this.reportsService.lineChartType;
  }

  // https://valor-software.com/ng2-charts/ (Reference)
  // Make the below function reusable by specifying it in Reports service instead of specifying it here in different components.

  getDailyOrWeeklyOrMonthlyReports($event) {
    if ($event == 'Daily') {
      let _lineChartData: Array<any> = new Array(this.eventsChartData.length);
      _lineChartData[0] = {
        data: [19, 35, 30, 71, 31, 87, 10, 50, 15, 36, 75, 57, 30, 50, 11, 55, 92, 15, 19, 62, 84, 48, 78, 36],
        label: this.eventsChartData[0].label
      };
      _lineChartData[1] = {
        data: [67, 46, 61, 8, 66, 3, 76, 81, 52, 46, 81, 80, 34, 96, 81, 28, 19, 4, 16, 11, 56, 85, 84, 17],

        label: this.eventsChartData[1].label
      };
      _lineChartData[2] = {
        data: [98, 48, 40, 19, 86, 27, 90, 35, 91, 58, 48, 76, 70, 85, 70, 25, 95, 62, 84, 98, 32, 47, 62, 77],

        label: this.eventsChartData[2].label
      };
      _lineChartData[3] = {
        data: [85, 59, 80, 81, 56, 55, 40, 65, 49, 90, 21, 58, 54, 44, 56, 55, 40, 65, 49, 90, 21, 58, 48, 76],
        label: this.eventsChartData[3].label
      };
      this.eventsChartData = _lineChartData;
    }
    else if ($event == 'Weekly') {
      let _lineChartData: Array<any> = new Array(this.eventsChartData.length);
      _lineChartData[0] = {
        data: [49, 47, 75, 61, 42, 90, 67, 20, 45, 89, 75, 57, 30, 50, 19, 62, 84, 11, 55, 92, 15, 28, 58, 76],
        label: this.eventsChartData[0].label
      };
      _lineChartData[1] = {
        data: [65, 59, 80, 81, 56, 55, 40, 65, 49, 90, 21, 58, 54, 44, 56, 55, 40, 65, 49, 90, 21, 58, 48, 56],
        label: this.eventsChartData[1].label
      };
      _lineChartData[2] = {
        data: [76, 24, 87, 6, 21, 52, 52, 91, 98, 100, 81, 67, 93, 91, 80, 84, 59, 84, 39, 74, 86, 36, 13, 15],
        label: this.eventsChartData[2].label
      };
      _lineChartData[3] = {
        data: [65, 90, 68, 17, 65, 66, 92, 71, 73, 3, 97, 48, 77, 36, 69, 52, 23, 58, 68, 23, 48, 77, 35, 33],
        label: this.eventsChartData[3].label
      };
      this.eventsChartData = _lineChartData;
    }
    else {
      let _lineChartData: Array<any> = new Array(this.eventsChartData.length);
      _lineChartData[0] = {
        data: [28, 48, 40, 19, 86, 27, 90, 35, 91, 58, 48, 76, 70, 85, 70, 25, 95, 62, 84, 98, 32, 47, 62, 77],
        label: this.eventsChartData[0].label
      };
      _lineChartData[1] = {
        data: [19, 35, 30, 71, 31, 87, 10, 50, 15, 36, 75, 57, 30, 50, 11, 55, 92, 15, 19, 62, 84, 48, 78, 36],
        label: this.eventsChartData[1].label
      };
      _lineChartData[2] = {
        data: [63, 34, 11, 26, 81, 62, 4, 49, 76, 14, 60, 16, 23, 88, 4, 64, 13, 92, 10, 3, 52, 76, 62, 100],
        label: this.eventsChartData[2].label
      };
      _lineChartData[3] = {
        data: [70, 18, 94, 13, 82, 95, 100, 17, 85, 95, 12, 26, 6, 14, 38, 43, 69, 52, 80, 89, 41, 23, 16, 68],
        label: this.eventsChartData[3].label
      };
      this.eventsChartData = _lineChartData;
    }
  }
}
