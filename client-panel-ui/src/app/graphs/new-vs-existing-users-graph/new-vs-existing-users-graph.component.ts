import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js'
import {ReportsService} from "../../_services/reports.service";

@Component({
  selector: 'app-new-vs-existing-users-graph',
  templateUrl: './new-vs-existing-users-graph.component.html',
  styleUrls: ['./new-vs-existing-users-graph.component.scss']
})
export class NewVsExistingUsersGraphComponent implements OnInit {

  // ng2-charts https://valor-software.com/ng2-charts/
  public newUsersChartData: Array<any> = [];
  public newUsersChartLabels: Array<any> = [];
  public newUsersChartOptions: any = {};
  public newUsersChartColors: Array<any> = [];
  public newUsersChartLegend: boolean;
  public newUsersChartType: string;

  constructor(private reportsService: ReportsService) {
  }

  ngOnInit() {
    this.newUsersChartData = this.reportsService.newUsersChartData;
    // this.newUsersChartLabels = this.reportsService.lineChartLabels;
    this.newUsersChartOptions = this.reportsService.lineChartOptions.options;
    this.newUsersChartColors = this.reportsService.lineChartColors;
    this.newUsersChartLegend = this.reportsService.lineChartLegend;
    this.newUsersChartType = this.reportsService.lineChartType;
  }

  // https://valor-software.com/ng2-charts/ (Reference)
  // Make the below function reusable by specifying it in Reports service instead of specifying it here in different components.

  getDailyOrWeeklyOrMonthlyReports($event) {
    if ($event == 'Daily') {
      let _lineChartData: Array<any> = new Array(this.newUsersChartData.length);
      _lineChartData[0] = {
        data: [19, 35, 30, 71, 31, 87, 10, 50, 15, 36, 75, 57, 30, 50, 11, 55, 92, 15, 19, 62, 84, 48, 78, 36],
        label: this.newUsersChartData[0].label
      };
      _lineChartData[1] = {
        data: [45, 89, 60, 41, 96, 55, 40, 65, 49, 90, 21, 58, 54, 44, 56, 55, 40, 65, 49, 90, 21, 58, 48, 76],
        label: this.newUsersChartData[1].label
      };
      this.newUsersChartData = _lineChartData;
    }
    else if ($event == 'Weekly') {
      let _lineChartData: Array<any> = new Array(this.newUsersChartData.length);
      _lineChartData[0] = {
        data: [49, 47, 75, 61, 42, 90, 67, 20, 45, 89, 75, 57, 30, 50, 19, 62, 84, 11, 55, 92, 15, 28, 58, 76],
        label: this.newUsersChartData[0].label
      };
      _lineChartData[1] = {
        data: [65, 59, 80, 81, 56, 55, 40, 65, 49, 90, 21, 58, 54, 44, 56, 55, 40, 65, 49, 90, 21, 58, 48, 56],
        label: this.newUsersChartData[1].label
      };
      this.newUsersChartData = _lineChartData;
    }
    else {
      let _lineChartData: Array<any> = new Array(this.newUsersChartData.length);
      _lineChartData[0] = {
        data: [28, 48, 40, 19, 86, 27, 90, 35, 91, 58, 48, 76, 70, 85, 70, 25, 95, 62, 84, 98, 32, 47, 62, 77],
        label: this.newUsersChartData[0].label
      };
      _lineChartData[1] = {
        data: [19, 35, 30, 71, 31, 87, 10, 50, 15, 36, 75, 57, 30, 50, 11, 55, 92, 15, 19, 62, 84, 48, 78, 36],
        label: this.newUsersChartData[1].label
      };
      this.newUsersChartData = _lineChartData;
    }
  }
  private datasets = [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3]
    }
  ];

  private labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

  private options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  changeLabels(): void {
    if (this.labels[0] == 'Red')
      this.labels = ['Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red'];
    else
      this.labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  }
  changeData(): void {
    if (this.datasets[0].data[0] == 12)
      this.datasets = [
        {
          label: "# of Votes",
          data: [19, 3, 5, 2, 3, 12]
        }
      ]
    else
      this.datasets = [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3]
        }
      ]
  }

}
