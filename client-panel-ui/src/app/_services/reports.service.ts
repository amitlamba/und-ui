import {Injectable} from "@angular/core";

@Injectable()
export class ReportsService {

  reportsDataFormat = [
    {
      "date": "2018-06-26",
      "eventName": "Added To Cart",
      "count": 5
    },
    {
      "date": "2018-06-27",
      "eventName": "Coupon applied",
      "count": 4
    },
    {
      "date": "2018-06-28",
      "eventName": "Item Purchased",
      "count": 5
    },
    {
      "date": "2018-06-29",
      "eventName": "Product Viewed",
      "count": 14
    },
    {
      "date": "2018-06-30",
      "eventName": "Removed From Cart",
      "count": 3
    },
    {
      "date": "2018-07-1",
      "eventName": "Added To Cart",
      "count": 8
    }

  ];

  // ng2-charts https://valor-software.com/ng2-charts/
  // lineChart
  public newUsersChartData: Array<any> = [
    {
      data: [19, 35, 30, 71, 31, 87, 10, 50, 15, 36, 75, 57, 30, 50, 11, 55, 92, 15, 19, 62, 84, 48, 78, 36],
      label: 'Users Acquired',
      fill: false
    },
    {
      data: [45, 89, 60, 41, 96, 55, 40, 65, 49, 90, 21, 58, 54, 44, 56, 55, 40, 65, 49, 90, 21, 58, 48, 76],
      label: 'Conversion Event',
      fill: false
    }
  ];
  public eventsChartData: Array<any> = [
    {
      data: [19, 35, 30, 71, 31, 87, 10, 50, 15, 36, 75, 57, 30, 50, 11, 55, 92, 15, 19, 62, 84, 48, 78, 36],
      label: 'Event 1'
    },
    {
      data: [67, 46, 61, 8, 66, 3, 76, 81, 52, 46, 81, 80, 34, 96, 81, 28, 19, 4, 16, 11, 56, 85, 84, 17],
      label: 'Event 2'
    },
    {
      data: [98, 48, 40, 19, 86, 27, 90, 35, 91, 58, 48, 76, 70, 85, 70, 25, 95, 62, 84, 98, 32, 47, 62, 77],
      label: 'Event 3'
    },
    {
      data: [85, 59, 80, 81, 56, 55, 40, 65, 49, 90, 21, 58, 54, 44, 56, 55, 40, 65, 49, 90, 21, 58, 48, 76],
      label: 'Event 4'
    }
  ];
  public conversionEventsChartData: Array<any> = [
    {
      data: [98, 48, 40, 19, 86, 27, 90, 35, 15, 36, 75, 57, 30, 50, 11, 55, 92, 15, 19, 62, 84, 48, 78, 36],
      label: 'Conversion Rate',
      fill: false
    },
    {
      data: [50, 11, 55, 92, 15, 19, 62, 84, 49, 90, 21, 58, 54, 44, 56, 55, 40, 65, 49, 90, 21, 58, 48, 76],
      label: 'Revenue',
      fill: false
    },
    {
      data: [85, 59, 80, 81, 56, 55, 40, 65, 49, 90, 21, 58, 54, 44, 96, 75, 54, 72, 49, 95, 41, 58, 38, 96],
      label: 'Conversion Event',
      fill: false
    }
  ];
  // public xAxesLabels = {
  //   lineChartDayLabels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6",
  //     "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13", "Day 14",
  //     "Day 15", "Day 16", "Day 17", "Day 18", "Day 19", "Day 20", "Day 21", "Day 22",
  //     "Day 23", "Day 24"],
  //   lineChartMonthLabels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6",
  //     "Month 7", "Month 8", "Month 9", "Month 10", "Month 11", "Month 12", "Month 13", "Month 14",
  //     "Month 15", "Month 16", "Month 17", "Month 18", "Month 19", "Month 20", "Month 21", "Month 22",
  //     "Month 23", "Month 24"],
  //   lineChartWeekLabels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6",
  //     "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12", "Week 13", "Week 14",
  //     "Week 15", "Week 16", "Week 17", "Week 18", "Week 19", "Week 20", "Week 21", "Week 22",
  //     "Week 23", "Week 24"]
  // };
  // public lineChartLabels: Array<any> = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6",
  //   "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13", "Day 14",
  //   "Day 15", "Day 16", "Day 17", "Day 18", "Day 19", "Day 20", "Day 21", "Day 22",
  //   "Day 23", "Day 24"];
  public lineChartOptions: any = {
    responsive: true,
    options: {
      legend: {
        position: 'top',
        labels: {
          padding: 30
        }
      },
      tooltips: {
        mode: 'index'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 20,
            min: 0,
            max: 100
          },
          scaleLabel: {
            display: true,
            labelString: 'Number of Users  (in thousands)'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time  (24 hrs)'
          }
        }]
      }
    }
  };
  public lineChartColors: Array<any> = [
    { // grey
      // backgroundColor: '#aaf45c',
      borderColor: 'rgba(148,159,177,1)',
      // pointBackgroundColor: 'rgba(148,159,177,1)',
      // pointBorderColor: '#fff',
      // pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      // backgroundColor: '#1ba72f',
      borderColor: 'rgba(77,83,96,1)',
      // pointBackgroundColor: 'rgba(77,83,96,1)',
      // pointBorderColor: '#fff',
      // pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      // backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      // pointBackgroundColor: 'rgba(148,159,177,1)',
      // pointBorderColor: '#fff',
      // pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'bar';
}
