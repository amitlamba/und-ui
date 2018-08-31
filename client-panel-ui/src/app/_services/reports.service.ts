import {Injectable} from "@angular/core";
import {
  EventCount, EventPeriodCount, EventTimeFrequency, EventUserFrequency, TrendCount, TrendTimeSeries,
  UserCountByEventTimeSeries,
  UserCountTimeSeries
} from "../_models/reports";

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
      label: 'Users Acquired'
    },
    {
      data: [45, 89, 60, 41, 96, 55, 40, 65, 49, 90, 21, 58, 54, 44, 56, 55, 40, 65, 49, 90, 21, 58, 48, 76],
      label: 'Conversion Event'
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
      label: 'Conversion Rate'
    },
    {
      data: [50, 11, 55, 92, 15, 19, 62, 84, 49, 90, 21, 58, 54, 44, 56, 55, 40, 65, 49, 90, 21, 58, 48, 76],
      label: 'Revenue'
    },
    {
      data: [85, 59, 80, 81, 56, 55, 40, 65, 49, 90, 21, 58, 54, 44, 96, 75, 54, 72, 49, 95, 41, 58, 38, 96],
      label: 'Conversion Event'
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
        position: 'right',
        labels: {
          padding: 30
        }
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
      },
    }
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: '#aaf45c',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: '#1ba72f',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'bar';





  public trendcountData: Array<TrendCount>=[

      {
        "name": "android",
        "usercount": 12245
      },
      {
        "name": "ios",
        "usercount": 34003
      },
    {
      "name": "window",
      "usercount": 12453
    },
    {
      "name": "lnux",
      "usercount": 34909
    }


  ]
  public trendchartData:Array<TrendTimeSeries>=[
    {
      "date": "2018-08-27",
      "trenddata": [
        {
          "usercount": 10000,
          "time": 0
        },
        {
          "usercount": 10025,
          "time": 5
        },
        {
          "usercount": 10100,
          "time": 10
        },
        {
          "usercount": 10225,
          "time": 15
        },
        {
          "usercount": 10400,
          "time": 20
        },
        {
          "usercount": 10625,
          "time": 25
        },
        {
          "usercount": 10900,
          "time": 30
        },
        {
          "usercount": 11225,
          "time": 35
        },
        {
          "usercount": 11600,
          "time": 40
        },
        {
          "usercount": 12025,
          "time": 45
        },
        {
          "usercount": 12500,
          "time": 50
        },
        {
          "usercount": 13025,
          "time": 55
        },
        {
          "usercount": 13600,
          "time": 60
        },
        {
          "usercount": 14225,
          "time": 65
        },
        {
          "usercount": 14900,
          "time": 70
        },
        {
          "usercount": 15625,
          "time": 75
        },
        {
          "usercount": 16400,
          "time": 80
        },
        {
          "usercount": 17225,
          "time": 85
        },
        {
          "usercount": 18100,
          "time": 90
        },
        {
          "usercount": 19025,
          "time": 95
        },
        {
          "usercount": 20000,
          "time": 100
        },
        {
          "usercount": 21025,
          "time": 105
        },
        {
          "usercount": 22100,
          "time": 110
        },
        {
          "usercount": 23225,
          "time": 115
        },
        {
          "usercount": 24400,
          "time": 120
        },
        {
          "usercount": 25625,
          "time": 125
        },
        {
          "usercount": 26900,
          "time": 130
        },
        {
          "usercount": 28225,
          "time": 135
        },
        {
          "usercount": 29600,
          "time": 140
        },
        {
          "usercount": 31025,
          "time": 145
        },
        {
          "usercount": 32500,
          "time": 150
        },
        {
          "usercount": 34025,
          "time": 155
        },
        {
          "usercount": 35600,
          "time": 160
        },
        {
          "usercount": 37225,
          "time": 165
        },
        {
          "usercount": 38900,
          "time": 170
        },
        {
          "usercount": 40625,
          "time": 175
        },
        {
          "usercount": 42400,
          "time": 180
        },
        {
          "usercount": 44225,
          "time": 185
        },
        {
          "usercount": 46100,
          "time": 190
        },
        {
          "usercount": 48025,
          "time": 195
        },
        {
          "usercount": 50000,
          "time": 200
        },
        {
          "usercount": 52025,
          "time": 205
        },
        {
          "usercount": 54100,
          "time": 210
        },
        {
          "usercount": 56225,
          "time": 215
        },
        {
          "usercount": 58400,
          "time": 220
        },
        {
          "usercount": 60625,
          "time": 225
        },
        {
          "usercount": 62900,
          "time": 230
        },
        {
          "usercount": 65225,
          "time": 235
        },
        {
          "usercount": 67600,
          "time": 240
        },
        {
          "usercount": 70025,
          "time": 245
        },
        {
          "usercount": 72500,
          "time": 250
        },
        {
          "usercount": 75025,
          "time": 255
        },
        {
          "usercount": 77600,
          "time": 260
        },
        {
          "usercount": 80225,
          "time": 265
        },
        {
          "usercount": 82900,
          "time": 270
        },
        {
          "usercount": 85625,
          "time": 275
        },
        {
          "usercount": 88400,
          "time": 280
        },
        {
          "usercount": 91225,
          "time": 285
        }
      ]
    },
    {
      "date": "2018-08-28",
      "trenddata": [
        {
          "usercount": 10000,
          "time": 0
        },
        {
          "usercount": 10030,
          "time": 5
        },
        {
          "usercount": 10110,
          "time": 10
        },
        {
          "usercount": 10240,
          "time": 15
        },
        {
          "usercount": 10420,
          "time": 20
        },
        {
          "usercount": 10650,
          "time": 25
        },
        {
          "usercount": 10930,
          "time": 30
        },
        {
          "usercount": 11260,
          "time": 35
        },
        {
          "usercount": 11640,
          "time": 40
        },
        {
          "usercount": 12070,
          "time": 45
        },
        {
          "usercount": 12550,
          "time": 50
        },
        {
          "usercount": 13080,
          "time": 55
        },
        {
          "usercount": 13660,
          "time": 60
        },
        {
          "usercount": 14290,
          "time": 65
        },
        {
          "usercount": 14970,
          "time": 70
        },
        {
          "usercount": 15700,
          "time": 75
        },
        {
          "usercount": 16480,
          "time": 80
        },
        {
          "usercount": 17310,
          "time": 85
        },
        {
          "usercount": 18190,
          "time": 90
        },
        {
          "usercount": 19120,
          "time": 95
        },
        {
          "usercount": 20100,
          "time": 100
        },
        {
          "usercount": 21130,
          "time": 105
        },
        {
          "usercount": 22210,
          "time": 110
        },
        {
          "usercount": 23340,
          "time": 115
        },
        {
          "usercount": 24520,
          "time": 120
        },
        {
          "usercount": 25750,
          "time": 125
        },
        {
          "usercount": 27030,
          "time": 130
        },
        {
          "usercount": 28360,
          "time": 135
        },
        {
          "usercount": 29740,
          "time": 140
        },
        {
          "usercount": 31170,
          "time": 145
        },
        {
          "usercount": 32650,
          "time": 150
        },
        {
          "usercount": 34180,
          "time": 155
        },
        {
          "usercount": 35760,
          "time": 160
        },
        {
          "usercount": 37390,
          "time": 165
        },
        {
          "usercount": 39070,
          "time": 170
        },
        {
          "usercount": 40800,
          "time": 175
        },
        {
          "usercount": 42580,
          "time": 180
        },
        {
          "usercount": 44410,
          "time": 185
        },
        {
          "usercount": 46290,
          "time": 190
        },
        {
          "usercount": 48220,
          "time": 195
        },
        {
          "usercount": 50200,
          "time": 200
        },
        {
          "usercount": 52230,
          "time": 205
        },
        {
          "usercount": 54310,
          "time": 210
        },
        {
          "usercount": 56440,
          "time": 215
        },
        {
          "usercount": 58620,
          "time": 220
        },
        {
          "usercount": 60850,
          "time": 225
        },
        {
          "usercount": 63130,
          "time": 230
        },
        {
          "usercount": 65460,
          "time": 235
        },
        {
          "usercount": 67840,
          "time": 240
        },
        {
          "usercount": 70270,
          "time": 245
        },
        {
          "usercount": 72750,
          "time": 250
        },
        {
          "usercount": 75280,
          "time": 255
        },
        {
          "usercount": 77860,
          "time": 260
        },
        {
          "usercount": 80490,
          "time": 265
        },
        {
          "usercount": 83170,
          "time": 270
        },
        {
          "usercount": 85900,
          "time": 275
        },
        {
          "usercount": 88680,
          "time": 280
        },
        {
          "usercount": 91510,
          "time": 285
        }
      ]
    },{
      "date": "2018-08-29",
      "trenddata": [
        {
          "usercount": 10000,
          "time": 0
        },
        {
          "usercount": 10035,
          "time": 5
        },
        {
          "usercount": 10120,
          "time": 10
        },
        {
          "usercount": 10255,
          "time": 15
        },
        {
          "usercount": 10440,
          "time": 20
        },
        {
          "usercount": 10675,
          "time": 25
        },
        {
          "usercount": 10960,
          "time": 30
        },
        {
          "usercount": 11295,
          "time": 35
        },
        {
          "usercount": 11680,
          "time": 40
        },
        {
          "usercount": 12115,
          "time": 45
        },
        {
          "usercount": 12600,
          "time": 50
        },
        {
          "usercount": 13135,
          "time": 55
        },
        {
          "usercount": 13720,
          "time": 60
        },
        {
          "usercount": 14355,
          "time": 65
        },
        {
          "usercount": 15040,
          "time": 70
        },
        {
          "usercount": 15775,
          "time": 75
        },
        {
          "usercount": 16560,
          "time": 80
        },
        {
          "usercount": 17395,
          "time": 85
        },
        {
          "usercount": 18280,
          "time": 90
        },
        {
          "usercount": 19215,
          "time": 95
        },
        {
          "usercount": 20200,
          "time": 100
        },
        {
          "usercount": 21235,
          "time": 105
        },
        {
          "usercount": 22320,
          "time": 110
        },
        {
          "usercount": 23455,
          "time": 115
        },
        {
          "usercount": 24640,
          "time": 120
        },
        {
          "usercount": 25875,
          "time": 125
        },
        {
          "usercount": 27160,
          "time": 130
        },
        {
          "usercount": 28495,
          "time": 135
        },
        {
          "usercount": 29880,
          "time": 140
        },
        {
          "usercount": 31315,
          "time": 145
        },
        {
          "usercount": 32800,
          "time": 150
        },
        {
          "usercount": 34335,
          "time": 155
        },
        {
          "usercount": 35920,
          "time": 160
        },
        {
          "usercount": 37555,
          "time": 165
        },
        {
          "usercount": 39240,
          "time": 170
        },
        {
          "usercount": 40975,
          "time": 175
        },
        {
          "usercount": 42760,
          "time": 180
        },
        {
          "usercount": 44595,
          "time": 185
        },
        {
          "usercount": 46480,
          "time": 190
        },
        {
          "usercount": 48415,
          "time": 195
        },
        {
          "usercount": 50400,
          "time": 200
        },
        {
          "usercount": 52435,
          "time": 205
        },
        {
          "usercount": 54520,
          "time": 210
        },
        {
          "usercount": 56655,
          "time": 215
        },
        {
          "usercount": 58840,
          "time": 220
        },
        {
          "usercount": 61075,
          "time": 225
        },
        {
          "usercount": 63360,
          "time": 230
        },
        {
          "usercount": 65695,
          "time": 235
        },
        {
          "usercount": 68080,
          "time": 240
        },
        {
          "usercount": 70515,
          "time": 245
        },
        {
          "usercount": 73000,
          "time": 250
        },
        {
          "usercount": 75535,
          "time": 255
        },
        {
          "usercount": 78120,
          "time": 260
        },
        {
          "usercount": 80755,
          "time": 265
        },
        {
          "usercount": 83440,
          "time": 270
        },
        {
          "usercount": 86175,
          "time": 275
        },
        {
          "usercount": 88960,
          "time": 280
        },
        {
          "usercount": 91795,
          "time": 285
        }
      ]
    }
  ]
  public newvsexistingData:Array<UserCountTimeSeries>=[
    {
      "date": "2018-08-27",
      "userCountData": [
        {
          "newusercount": 10000,
          "oldusercount": 15000,
          "time": 0
        },
        {
          "newusercount": 10025,
          "oldusercount": 15025,
          "time": 5
        },
        {
          "newusercount": 10100,
          "oldusercount": 15100,
          "time": 10
        },
        {
          "newusercount": 10225,
          "oldusercount": 15225,
          "time": 15
        },
        {
          "newusercount": 10400,
          "oldusercount": 15400,
          "time": 20
        },
        {
          "newusercount": 10625,
          "oldusercount": 15625,
          "time": 25
        },
        {
          "newusercount": 10900,
          "oldusercount": 15900,
          "time": 30
        },
        {
          "newusercount": 11225,
          "oldusercount": 16225,
          "time": 35
        },
        {
          "newusercount": 11600,
          "oldusercount": 16600,
          "time": 40
        },
        {
          "newusercount": 12025,
          "oldusercount": 17025,
          "time": 45
        },
        {
          "newusercount": 12500,
          "oldusercount": 17500,
          "time": 50
        },
        {
          "newusercount": 13025,
          "oldusercount": 18025,
          "time": 55
        },
        {
          "newusercount": 13600,
          "oldusercount": 18600,
          "time": 60
        },
        {
          "newusercount": 14225,
          "oldusercount": 19225,
          "time": 65
        },
        {
          "newusercount": 14900,
          "oldusercount": 19900,
          "time": 70
        },
        {
          "newusercount": 15625,
          "oldusercount": 20625,
          "time": 75
        },
        {
          "newusercount": 16400,
          "oldusercount": 21400,
          "time": 80
        },
        {
          "newusercount": 17225,
          "oldusercount": 22225,
          "time": 85
        },
        {
          "newusercount": 18100,
          "oldusercount": 23100,
          "time": 90
        },
        {
          "newusercount": 19025,
          "oldusercount": 24025,
          "time": 95
        },
        {
          "newusercount": 20000,
          "oldusercount": 25000,
          "time": 100
        },
        {
          "newusercount": 21025,
          "oldusercount": 26025,
          "time": 105
        },
        {
          "newusercount": 22100,
          "oldusercount": 27100,
          "time": 110
        },
        {
          "newusercount": 23225,
          "oldusercount": 28225,
          "time": 115
        },
        {
          "newusercount": 24400,
          "oldusercount": 29400,
          "time": 120
        },
        {
          "newusercount": 25625,
          "oldusercount": 30625,
          "time": 125
        },
        {
          "newusercount": 26900,
          "oldusercount": 31900,
          "time": 130
        },
        {
          "newusercount": 28225,
          "oldusercount": 33225,
          "time": 135
        },
        {
          "newusercount": 29600,
          "oldusercount": 34600,
          "time": 140
        },
        {
          "newusercount": 31025,
          "oldusercount": 36025,
          "time": 145
        },
        {
          "newusercount": 32500,
          "oldusercount": 37500,
          "time": 150
        },
        {
          "newusercount": 34025,
          "oldusercount": 39025,
          "time": 155
        },
        {
          "newusercount": 35600,
          "oldusercount": 40600,
          "time": 160
        },
        {
          "newusercount": 37225,
          "oldusercount": 42225,
          "time": 165
        },
        {
          "newusercount": 38900,
          "oldusercount": 43900,
          "time": 170
        },
        {
          "newusercount": 40625,
          "oldusercount": 45625,
          "time": 175
        },
        {
          "newusercount": 42400,
          "oldusercount": 47400,
          "time": 180
        },
        {
          "newusercount": 44225,
          "oldusercount": 49225,
          "time": 185
        },
        {
          "newusercount": 46100,
          "oldusercount": 51100,
          "time": 190
        },
        {
          "newusercount": 48025,
          "oldusercount": 53025,
          "time": 195
        },
        {
          "newusercount": 50000,
          "oldusercount": 55000,
          "time": 200
        },
        {
          "newusercount": 52025,
          "oldusercount": 57025,
          "time": 205
        },
        {
          "newusercount": 54100,
          "oldusercount": 59100,
          "time": 210
        },
        {
          "newusercount": 56225,
          "oldusercount": 61225,
          "time": 215
        },
        {
          "newusercount": 58400,
          "oldusercount": 63400,
          "time": 220
        },
        {
          "newusercount": 60625,
          "oldusercount": 65625,
          "time": 225
        },
        {
          "newusercount": 62900,
          "oldusercount": 67900,
          "time": 230
        },
        {
          "newusercount": 65225,
          "oldusercount": 70225,
          "time": 235
        },
        {
          "newusercount": 67600,
          "oldusercount": 72600,
          "time": 240
        },
        {
          "newusercount": 70025,
          "oldusercount": 75025,
          "time": 245
        },
        {
          "newusercount": 72500,
          "oldusercount": 77500,
          "time": 250
        },
        {
          "newusercount": 75025,
          "oldusercount": 80025,
          "time": 255
        },
        {
          "newusercount": 77600,
          "oldusercount": 82600,
          "time": 260
        },
        {
          "newusercount": 80225,
          "oldusercount": 85225,
          "time": 265
        },
        {
          "newusercount": 82900,
          "oldusercount": 87900,
          "time": 270
        },
        {
          "newusercount": 85625,
          "oldusercount": 90625,
          "time": 275
        },
        {
          "newusercount": 88400,
          "oldusercount": 93400,
          "time": 280
        },
        {
          "newusercount": 91225,
          "oldusercount": 96225,
          "time": 285
        }
      ]
    },
    {
      "date": "2018-08-28",
      "userCountData": [
        {
          "newusercount": 10000,
          "oldusercount": 15000,
          "time": 0
        },
        {
          "newusercount": 10030,
          "oldusercount": 15030,
          "time": 5
        },
        {
          "newusercount": 10110,
          "oldusercount": 15110,
          "time": 10
        },
        {
          "newusercount": 10240,
          "oldusercount": 15240,
          "time": 15
        },
        {
          "newusercount": 10420,
          "oldusercount": 15420,
          "time": 20
        },
        {
          "newusercount": 10650,
          "oldusercount": 15650,
          "time": 25
        },
        {
          "newusercount": 10930,
          "oldusercount": 15930,
          "time": 30
        },
        {
          "newusercount": 11260,
          "oldusercount": 16260,
          "time": 35
        },
        {
          "newusercount": 11640,
          "oldusercount": 16640,
          "time": 40
        },
        {
          "newusercount": 12070,
          "oldusercount": 17070,
          "time": 45
        },
        {
          "newusercount": 12550,
          "oldusercount": 17550,
          "time": 50
        },
        {
          "newusercount": 13080,
          "oldusercount": 18080,
          "time": 55
        },
        {
          "newusercount": 13660,
          "oldusercount": 18660,
          "time": 60
        },
        {
          "newusercount": 14290,
          "oldusercount": 19290,
          "time": 65
        },
        {
          "newusercount": 14970,
          "oldusercount": 19970,
          "time": 70
        },
        {
          "newusercount": 15700,
          "oldusercount": 20700,
          "time": 75
        },
        {
          "newusercount": 16480,
          "oldusercount": 21480,
          "time": 80
        },
        {
          "newusercount": 17310,
          "oldusercount": 22310,
          "time": 85
        },
        {
          "newusercount": 18190,
          "oldusercount": 23190,
          "time": 90
        },
        {
          "newusercount": 19120,
          "oldusercount": 24120,
          "time": 95
        },
        {
          "newusercount": 20100,
          "oldusercount": 25100,
          "time": 100
        },
        {
          "newusercount": 21130,
          "oldusercount": 26130,
          "time": 105
        },
        {
          "newusercount": 22210,
          "oldusercount": 27210,
          "time": 110
        },
        {
          "newusercount": 23340,
          "oldusercount": 28340,
          "time": 115
        },
        {
          "newusercount": 24520,
          "oldusercount": 29520,
          "time": 120
        },
        {
          "newusercount": 25750,
          "oldusercount": 30750,
          "time": 125
        },
        {
          "newusercount": 27030,
          "oldusercount": 32030,
          "time": 130
        },
        {
          "newusercount": 28360,
          "oldusercount": 33360,
          "time": 135
        },
        {
          "newusercount": 29740,
          "oldusercount": 34740,
          "time": 140
        },
        {
          "newusercount": 31170,
          "oldusercount": 36170,
          "time": 145
        },
        {
          "newusercount": 32650,
          "oldusercount": 37650,
          "time": 150
        },
        {
          "newusercount": 34180,
          "oldusercount": 39180,
          "time": 155
        },
        {
          "newusercount": 35760,
          "oldusercount": 40760,
          "time": 160
        },
        {
          "newusercount": 37390,
          "oldusercount": 42390,
          "time": 165
        },
        {
          "newusercount": 39070,
          "oldusercount": 44070,
          "time": 170
        },
        {
          "newusercount": 40800,
          "oldusercount": 45800,
          "time": 175
        },
        {
          "newusercount": 42580,
          "oldusercount": 47580,
          "time": 180
        },
        {
          "newusercount": 44410,
          "oldusercount": 49410,
          "time": 185
        },
        {
          "newusercount": 46290,
          "oldusercount": 51290,
          "time": 190
        },
        {
          "newusercount": 48220,
          "oldusercount": 53220,
          "time": 195
        },
        {
          "newusercount": 50200,
          "oldusercount": 55200,
          "time": 200
        },
        {
          "newusercount": 52230,
          "oldusercount": 57230,
          "time": 205
        },
        {
          "newusercount": 54310,
          "oldusercount": 59310,
          "time": 210
        },
        {
          "newusercount": 56440,
          "oldusercount": 61440,
          "time": 215
        },
        {
          "newusercount": 58620,
          "oldusercount": 63620,
          "time": 220
        },
        {
          "newusercount": 60850,
          "oldusercount": 65850,
          "time": 225
        },
        {
          "newusercount": 63130,
          "oldusercount": 68130,
          "time": 230
        },
        {
          "newusercount": 65460,
          "oldusercount": 70460,
          "time": 235
        },
        {
          "newusercount": 67840,
          "oldusercount": 72840,
          "time": 240
        },
        {
          "newusercount": 70270,
          "oldusercount": 75270,
          "time": 245
        },
        {
          "newusercount": 72750,
          "oldusercount": 77750,
          "time": 250
        },
        {
          "newusercount": 75280,
          "oldusercount": 80280,
          "time": 255
        },
        {
          "newusercount": 77860,
          "oldusercount": 82860,
          "time": 260
        },
        {
          "newusercount": 80490,
          "oldusercount": 85490,
          "time": 265
        },
        {
          "newusercount": 83170,
          "oldusercount": 88170,
          "time": 270
        },
        {
          "newusercount": 85900,
          "oldusercount": 90900,
          "time": 275
        },
        {
          "newusercount": 88680,
          "oldusercount": 93680,
          "time": 280
        },
        {
          "newusercount": 91510,
          "oldusercount": 96510,
          "time": 285
        }
      ]
    },
    {
      "date": "2018-08-29",
      "userCountData": [
        {
          "newusercount": 10000,
          "oldusercount": 15000,
          "time": 0
        },
        {
          "newusercount": 10035,
          "oldusercount": 15035,
          "time": 5
        },
        {
          "newusercount": 10120,
          "oldusercount": 15120,
          "time": 10
        },
        {
          "newusercount": 10255,
          "oldusercount": 15255,
          "time": 15
        },
        {
          "newusercount": 10440,
          "oldusercount": 15440,
          "time": 20
        },
        {
          "newusercount": 10675,
          "oldusercount": 15675,
          "time": 25
        },
        {
          "newusercount": 10960,
          "oldusercount": 15960,
          "time": 30
        },
        {
          "newusercount": 11295,
          "oldusercount": 16295,
          "time": 35
        },
        {
          "newusercount": 11680,
          "oldusercount": 16680,
          "time": 40
        },
        {
          "newusercount": 12115,
          "oldusercount": 17115,
          "time": 45
        },
        {
          "newusercount": 12600,
          "oldusercount": 17600,
          "time": 50
        },
        {
          "newusercount": 13135,
          "oldusercount": 18135,
          "time": 55
        },
        {
          "newusercount": 13720,
          "oldusercount": 18720,
          "time": 60
        },
        {
          "newusercount": 14355,
          "oldusercount": 19355,
          "time": 65
        },
        {
          "newusercount": 15040,
          "oldusercount": 20040,
          "time": 70
        },
        {
          "newusercount": 15775,
          "oldusercount": 20775,
          "time": 75
        },
        {
          "newusercount": 16560,
          "oldusercount": 21560,
          "time": 80
        },
        {
          "newusercount": 17395,
          "oldusercount": 22395,
          "time": 85
        },
        {
          "newusercount": 18280,
          "oldusercount": 23280,
          "time": 90
        },
        {
          "newusercount": 19215,
          "oldusercount": 24215,
          "time": 95
        },
        {
          "newusercount": 20200,
          "oldusercount": 25200,
          "time": 100
        },
        {
          "newusercount": 21235,
          "oldusercount": 26235,
          "time": 105
        },
        {
          "newusercount": 22320,
          "oldusercount": 27320,
          "time": 110
        },
        {
          "newusercount": 23455,
          "oldusercount": 28455,
          "time": 115
        },
        {
          "newusercount": 24640,
          "oldusercount": 29640,
          "time": 120
        },
        {
          "newusercount": 25875,
          "oldusercount": 30875,
          "time": 125
        },
        {
          "newusercount": 27160,
          "oldusercount": 32160,
          "time": 130
        },
        {
          "newusercount": 28495,
          "oldusercount": 33495,
          "time": 135
        },
        {
          "newusercount": 29880,
          "oldusercount": 34880,
          "time": 140
        },
        {
          "newusercount": 31315,
          "oldusercount": 36315,
          "time": 145
        },
        {
          "newusercount": 32800,
          "oldusercount": 37800,
          "time": 150
        },
        {
          "newusercount": 34335,
          "oldusercount": 39335,
          "time": 155
        },
        {
          "newusercount": 35920,
          "oldusercount": 40920,
          "time": 160
        },
        {
          "newusercount": 37555,
          "oldusercount": 42555,
          "time": 165
        },
        {
          "newusercount": 39240,
          "oldusercount": 44240,
          "time": 170
        },
        {
          "newusercount": 40975,
          "oldusercount": 45975,
          "time": 175
        },
        {
          "newusercount": 42760,
          "oldusercount": 47760,
          "time": 180
        },
        {
          "newusercount": 44595,
          "oldusercount": 49595,
          "time": 185
        },
        {
          "newusercount": 46480,
          "oldusercount": 51480,
          "time": 190
        },
        {
          "newusercount": 48415,
          "oldusercount": 53415,
          "time": 195
        },
        {
          "newusercount": 50400,
          "oldusercount": 55400,
          "time": 200
        },
        {
          "newusercount": 52435,
          "oldusercount": 57435,
          "time": 205
        },
        {
          "newusercount": 54520,
          "oldusercount": 59520,
          "time": 210
        },
        {
          "newusercount": 56655,
          "oldusercount": 61655,
          "time": 215
        },
        {
          "newusercount": 58840,
          "oldusercount": 63840,
          "time": 220
        },
        {
          "newusercount": 61075,
          "oldusercount": 66075,
          "time": 225
        },
        {
          "newusercount": 63360,
          "oldusercount": 68360,
          "time": 230
        },
        {
          "newusercount": 65695,
          "oldusercount": 70695,
          "time": 235
        },
        {
          "newusercount": 68080,
          "oldusercount": 73080,
          "time": 240
        },
        {
          "newusercount": 70515,
          "oldusercount": 75515,
          "time": 245
        },
        {
          "newusercount": 73000,
          "oldusercount": 78000,
          "time": 250
        },
        {
          "newusercount": 75535,
          "oldusercount": 80535,
          "time": 255
        },
        {
          "newusercount": 78120,
          "oldusercount": 83120,
          "time": 260
        },
        {
          "newusercount": 80755,
          "oldusercount": 85755,
          "time": 265
        },
        {
          "newusercount": 83440,
          "oldusercount": 88440,
          "time": 270
        },
        {
          "newusercount": 86175,
          "oldusercount": 91175,
          "time": 275
        },
        {
          "newusercount": 88960,
          "oldusercount": 93960,
          "time": 280
        },
        {
          "newusercount": 91795,
          "oldusercount": 96795,
          "time": 285
        }
      ]
    }
  ]

  public usercountbyeventsData:Array<UserCountByEventTimeSeries>=[

    {
      "date": "2018-08-29",
      "userCountData": [
        {
          "eventname": "add to cart",
          "usercount": 12234
        },
        {
          "eventname": "charged",
          "usercount": 10243
        },
        {
          "eventname": "Add to wish list",
          "usercount": 12234
        },
        {
          "eventname": "app install",
          "usercount": 10243
        }
      ]
    },
    {
      "date": "2018-08-30",
      "userCountData": [
        {
          "eventname": "add to cart",
          "usercount": 10607
        },
        {
          "eventname": "charged",
          "usercount": 10000
        },
        {
          "eventname": "Add to wish list",
          "usercount": 23234
        },
        {
          "eventname": "app install",
          "usercount": 20243
        }
      ]
    },
    {
      "date": "2018-08-31",
      "userCountData": [
        {
          "eventname": "add to cart",
          "usercount": 3000
        },
        {
          "eventname": "charged",
          "usercount": 5000
        },
        {
          "eventname": "Add to wish list",
          "usercount": 20234
        },
        {
          "eventname": "app install",
          "usercount": 12243
        }
      ]
    }

  ]

  public samepleusersbyevent:Array<string>=[]

  public eventcountData:Array<EventCount>=[
    {
      usercount:12050,
      eventcount:23866,
      name:"Android"
    },
    {
      usercount:9000,
      eventcount:5000,
      name:"Ios"
    },
    {
      usercount:12990,
      eventcount:25006,
      name:"Window"
    },
    {
      usercount:90000,
      eventcount:50000,
      name:"Linux"
    }
  ]
  public trendBytimePeriodData:Array<EventPeriodCount>=[
    {
      "eventcount": 12000,
      "period": "20 aug",
      "usercount": 9000
    },
    {
      "eventcount": 15000,
      "period": "21 aug",
      "usercount": 8000
    },
    {
      "eventcount": 20000,
      "period": "22 aug",
      "usercount": 12000
    },
    {
      "eventcount": 30000,
      "period": "23 aug",
      "usercount":30000
    },
    {
      "eventcount":30000,
      "period": "24 aug",
      "usercount": 20000
    },
    {
      "eventcount": 25000,
      "period": "25 aug",
      "usercount": 12000
    },
    {
      "eventcount": 12000,
      "period": "26 aug",
      "usercount": 1200
    },
    {
      "eventcount": 9000,
      "period": "27 aug",
      "usercount": 8000
    },
    {
      "eventcount": 17000,
      "period": "28 aug",
      "usercount": 12000
    },
    {
      "eventcount": 16000,
      "period": "29 aug",
      "usercount": 13000
    }
  ]
  public eventUserTrendData:Array<EventUserFrequency>=[
    {
      eventcount:1,
      usercount:12000
    },
    {
      eventcount:2,
      usercount:12000
    },
    {
      eventcount:3,
      usercount:1000
    },
    {
      eventcount:4,
      usercount:800
    },
    {
      eventcount:5,
      usercount:1200
    },
    {
      eventcount:6,
      usercount:100
    },

    {
      eventcount:7,
      usercount:80
    },
    {
      eventcount:8,
      usercount:120
    },
    {
      eventcount:9,
      usercount:10
    }
  ]

  public eventTimeTrend:Array<EventTimeFrequency>=[
    {
      "eventCount": 1200,
      "timeRange": "00-03"
    },
    {
      "eventCount": 15000,
      "timeRange": "03-06"
    },
    {
      "eventCount": 12000,
      "timeRange": "06-09"
    },
    {
      "eventCount": 3000,
      "timeRange": "09-12"
    },
    {
      "eventCount": 5000,
      "timeRange": "12-03"
    },
    {
      "eventCount": 10000,
      "timeRange": "03-06"
    },
    {
      "eventCount": 15000,
      "timeRange": "06-09"
    },
    {
      "eventCount": 12000,
      "timeRange": "09-12"
    }
  ]


}
