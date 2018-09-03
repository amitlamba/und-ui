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
          "usercount": 19952,
          "time": 0
        },
        {
          "usercount": 20359,
          "time": 5
        },
        {
          "usercount": 20718,
          "time": 10
        },
        {
          "usercount": 21550,
          "time": 15
        },
        {
          "usercount": 21176,
          "time": 20
        },
        {
          "usercount": 21787,
          "time": 25
        },
        {
          "usercount": 21114,
          "time": 30
        },
        {
          "usercount": 20121,
          "time": 35
        },
        {
          "usercount": 20286,
          "time": 40
        },
        {
          "usercount": 19896,
          "time": 45
        },
        {
          "usercount": 19206,
          "time": 50
        },
        {
          "usercount": 19018,
          "time": 55
        },
        {
          "usercount": 19192,
          "time": 60
        },
        {
          "usercount": 19777,
          "time": 65
        },
        {
          "usercount": 19066,
          "time": 70
        },
        {
          "usercount": 18973,
          "time": 75
        },
        {
          "usercount": 19171,
          "time": 80
        },
        {
          "usercount": 19681,
          "time": 85
        },
        {
          "usercount": 19388,
          "time": 90
        },
        {
          "usercount": 19886,
          "time": 95
        },
        {
          "usercount": 19362,
          "time": 100
        },
        {
          "usercount": 18434,
          "time": 105
        },
        {
          "usercount": 19227,
          "time": 110
        },
        {
          "usercount": 19972,
          "time": 115
        },
        {
          "usercount": 20457,
          "time": 120
        },
        {
          "usercount": 19996,
          "time": 125
        },
        {
          "usercount": 20317,
          "time": 130
        },
        {
          "usercount": 19868,
          "time": 135
        },
        {
          "usercount": 20138,
          "time": 140
        },
        {
          "usercount": 21000,
          "time": 145
        },
        {
          "usercount": 20420,
          "time": 150
        },
        {
          "usercount": 20565,
          "time": 155
        },
        {
          "usercount": 19544,
          "time": 160
        },
        {
          "usercount": 19236,
          "time": 165
        },
        {
          "usercount": 18879,
          "time": 170
        },
        {
          "usercount": 19736,
          "time": 175
        },
        {
          "usercount": 19240,
          "time": 180
        },
        {
          "usercount": 18814,
          "time": 185
        },
        {
          "usercount": 19478,
          "time": 190
        },
        {
          "usercount": 18564,
          "time": 195
        },
        {
          "usercount": 18125,
          "time": 200
        },
        {
          "usercount": 18409,
          "time": 205
        },
        {
          "usercount": 17549,
          "time": 210
        },
        {
          "usercount": 17239,
          "time": 215
        },
        {
          "usercount": 17898,
          "time": 220
        },
        {
          "usercount": 17317,
          "time": 225
        },
        {
          "usercount": 18124,
          "time": 230
        },
        {
          "usercount": 18184,
          "time": 235
        },
        {
          "usercount": 18650,
          "time": 240
        },
        {
          "usercount": 19250,
          "time": 245
        },
        {
          "usercount": 19986,
          "time": 250
        },
        {
          "usercount": 20087,
          "time": 255
        },
        {
          "usercount": 20567,
          "time": 260
        },
        {
          "usercount": 19548,
          "time": 265
        },
        {
          "usercount": 19959,
          "time": 270
        },
        {
          "usercount": 19296,
          "time": 275
        },
        {
          "usercount": 19210,
          "time": 280
        },
        {
          "usercount": 19673,
          "time": 285
        },
        {
          "usercount": 19203,
          "time": 290
        },
        {
          "usercount": 18247,
          "time": 295
        },
        {
          "usercount": 18858,
          "time": 300
        },
        {
          "usercount": 18420,
          "time": 305
        },
        {
          "usercount": 18852,
          "time": 310
        },
        {
          "usercount": 19322,
          "time": 315
        },
        {
          "usercount": 19603,
          "time": 320
        },
        {
          "usercount": 19160,
          "time": 325
        },
        {
          "usercount": 18799,
          "time": 330
        },
        {
          "usercount": 19148,
          "time": 335
        },
        {
          "usercount": 19218,
          "time": 340
        },
        {
          "usercount": 19427,
          "time": 345
        },
        {
          "usercount": 18978,
          "time": 350
        },
        {
          "usercount": 19717,
          "time": 355
        },
        {
          "usercount": 19681,
          "time": 360
        },
        {
          "usercount": 19528,
          "time": 365
        },
        {
          "usercount": 19687,
          "time": 370
        },
        {
          "usercount": 20003,
          "time": 375
        },
        {
          "usercount": 20530,
          "time": 380
        },
        {
          "usercount": 19939,
          "time": 385
        },
        {
          "usercount": 20732,
          "time": 390
        },
        {
          "usercount": 20359,
          "time": 395
        },
        {
          "usercount": 21325,
          "time": 400
        },
        {
          "usercount": 21637,
          "time": 405
        },
        {
          "usercount": 20625,
          "time": 410
        },
        {
          "usercount": 20106,
          "time": 415
        },
        {
          "usercount": 19469,
          "time": 420
        },
        {
          "usercount": 20338,
          "time": 425
        },
        {
          "usercount": 19590,
          "time": 430
        },
        {
          "usercount": 18876,
          "time": 435
        },
        {
          "usercount": 17986,
          "time": 440
        },
        {
          "usercount": 17102,
          "time": 445
        },
        {
          "usercount": 16388,
          "time": 450
        },
        {
          "usercount": 15686,
          "time": 455
        },
        {
          "usercount": 15186,
          "time": 460
        },
        {
          "usercount": 15603,
          "time": 465
        },
        {
          "usercount": 16134,
          "time": 470
        },
        {
          "usercount": 16152,
          "time": 475
        },
        {
          "usercount": 16379,
          "time": 480
        },
        {
          "usercount": 16118,
          "time": 485
        },
        {
          "usercount": 15593,
          "time": 490
        },
        {
          "usercount": 16152,
          "time": 495
        },
        {
          "usercount": 16647,
          "time": 500
        },
        {
          "usercount": 17260,
          "time": 505
        },
        {
          "usercount": 17299,
          "time": 510
        },
        {
          "usercount": 17218,
          "time": 515
        },
        {
          "usercount": 17521,
          "time": 520
        },
        {
          "usercount": 16968,
          "time": 525
        },
        {
          "usercount": 16370,
          "time": 530
        },
        {
          "usercount": 16483,
          "time": 535
        },
        {
          "usercount": 15871,
          "time": 540
        },
        {
          "usercount": 16308,
          "time": 545
        },
        {
          "usercount": 16506,
          "time": 550
        },
        {
          "usercount": 17170,
          "time": 555
        },
        {
          "usercount": 17750,
          "time": 560
        },
        {
          "usercount": 17096,
          "time": 565
        },
        {
          "usercount": 16896,
          "time": 570
        },
        {
          "usercount": 16690,
          "time": 575
        },
        {
          "usercount": 16474,
          "time": 580
        },
        {
          "usercount": 16183,
          "time": 585
        },
        {
          "usercount": 16556,
          "time": 590
        },
        {
          "usercount": 16721,
          "time": 595
        },
        {
          "usercount": 16448,
          "time": 600
        },
        {
          "usercount": 16959,
          "time": 605
        },
        {
          "usercount": 16706,
          "time": 610
        },
        {
          "usercount": 16293,
          "time": 615
        },
        {
          "usercount": 16897,
          "time": 620
        },
        {
          "usercount": 17391,
          "time": 625
        },
        {
          "usercount": 17975,
          "time": 630
        },
        {
          "usercount": 18752,
          "time": 635
        },
        {
          "usercount": 18829,
          "time": 640
        },
        {
          "usercount": 18745,
          "time": 645
        },
        {
          "usercount": 19222,
          "time": 650
        },
        {
          "usercount": 18619,
          "time": 655
        },
        {
          "usercount": 18201,
          "time": 660
        },
        {
          "usercount": 18184,
          "time": 665
        },
        {
          "usercount": 17465,
          "time": 670
        },
        {
          "usercount": 16965,
          "time": 675
        },
        {
          "usercount": 16162,
          "time": 680
        },
        {
          "usercount": 16074,
          "time": 685
        },
        {
          "usercount": 15936,
          "time": 690
        },
        {
          "usercount": 15193,
          "time": 695
        },
        {
          "usercount": 14734,
          "time": 700
        },
        {
          "usercount": 14187,
          "time": 705
        },
        {
          "usercount": 14690,
          "time": 710
        },
        {
          "usercount": 15230,
          "time": 715
        },
        {
          "usercount": 15457,
          "time": 720
        },
        {
          "usercount": 16026,
          "time": 725
        },
        {
          "usercount": 15380,
          "time": 730
        },
        {
          "usercount": 15664,
          "time": 735
        },
        {
          "usercount": 15527,
          "time": 740
        },
        {
          "usercount": 15899,
          "time": 745
        },
        {
          "usercount": 16528,
          "time": 750
        },
        {
          "usercount": 16452,
          "time": 755
        },
        {
          "usercount": 16002,
          "time": 760
        },
        {
          "usercount": 15898,
          "time": 765
        },
        {
          "usercount": 16572,
          "time": 770
        },
        {
          "usercount": 16458,
          "time": 775
        },
        {
          "usercount": 17032,
          "time": 780
        },
        {
          "usercount": 16391,
          "time": 785
        },
        {
          "usercount": 15959,
          "time": 790
        },
        {
          "usercount": 16048,
          "time": 795
        },
        {
          "usercount": 15919,
          "time": 800
        },
        {
          "usercount": 16002,
          "time": 805
        },
        {
          "usercount": 15970,
          "time": 810
        },
        {
          "usercount": 15412,
          "time": 815
        },
        {
          "usercount": 14812,
          "time": 820
        },
        {
          "usercount": 15518,
          "time": 825
        },
        {
          "usercount": 16172,
          "time": 830
        },
        {
          "usercount": 16598,
          "time": 835
        },
        {
          "usercount": 17136,
          "time": 840
        },
        {
          "usercount": 17270,
          "time": 845
        },
        {
          "usercount": 17646,
          "time": 850
        },
        {
          "usercount": 18377,
          "time": 855
        },
        {
          "usercount": 17702,
          "time": 860
        },
        {
          "usercount": 17098,
          "time": 865
        },
        {
          "usercount": 16993,
          "time": 870
        },
        {
          "usercount": 17489,
          "time": 875
        },
        {
          "usercount": 17613,
          "time": 880
        },
        {
          "usercount": 17497,
          "time": 885
        },
        {
          "usercount": 16854,
          "time": 890
        },
        {
          "usercount": 16108,
          "time": 895
        },
        {
          "usercount": 15874,
          "time": 900
        },
        {
          "usercount": 16178,
          "time": 905
        },
        {
          "usercount": 16508,
          "time": 910
        },
        {
          "usercount": 16281,
          "time": 915
        },
        {
          "usercount": 15695,
          "time": 920
        },
        {
          "usercount": 16405,
          "time": 925
        },
        {
          "usercount": 16458,
          "time": 930
        },
        {
          "usercount": 15798,
          "time": 935
        },
        {
          "usercount": 16534,
          "time": 940
        },
        {
          "usercount": 16828,
          "time": 945
        },
        {
          "usercount": 17205,
          "time": 950
        },
        {
          "usercount": 17860,
          "time": 955
        },
        {
          "usercount": 18092,
          "time": 960
        },
        {
          "usercount": 17398,
          "time": 965
        },
        {
          "usercount": 16733,
          "time": 970
        },
        {
          "usercount": 16503,
          "time": 975
        },
        {
          "usercount": 16741,
          "time": 980
        },
        {
          "usercount": 17318,
          "time": 985
        },
        {
          "usercount": 17248,
          "time": 990
        },
        {
          "usercount": 16728,
          "time": 995
        },
        {
          "usercount": 17179,
          "time": 1000
        },
        {
          "usercount": 17218,
          "time": 1005
        },
        {
          "usercount": 17828,
          "time": 1010
        },
        {
          "usercount": 17882,
          "time": 1015
        },
        {
          "usercount": 17707,
          "time": 1020
        },
        {
          "usercount": 18432,
          "time": 1025
        },
        {
          "usercount": 19114,
          "time": 1030
        },
        {
          "usercount": 20043,
          "time": 1035
        },
        {
          "usercount": 19180,
          "time": 1040
        },
        {
          "usercount": 18254,
          "time": 1045
        },
        {
          "usercount": 19081,
          "time": 1050
        },
        {
          "usercount": 18429,
          "time": 1055
        },
        {
          "usercount": 17823,
          "time": 1060
        },
        {
          "usercount": 17675,
          "time": 1065
        },
        {
          "usercount": 17253,
          "time": 1070
        },
        {
          "usercount": 16901,
          "time": 1075
        },
        {
          "usercount": 16465,
          "time": 1080
        },
        {
          "usercount": 16105,
          "time": 1085
        },
        {
          "usercount": 16230,
          "time": 1090
        },
        {
          "usercount": 16650,
          "time": 1095
        },
        {
          "usercount": 17187,
          "time": 1100
        },
        {
          "usercount": 17056,
          "time": 1105
        },
        {
          "usercount": 17508,
          "time": 1110
        },
        {
          "usercount": 16949,
          "time": 1115
        },
        {
          "usercount": 17164,
          "time": 1120
        },
        {
          "usercount": 17109,
          "time": 1125
        },
        {
          "usercount": 17133,
          "time": 1130
        },
        {
          "usercount": 16840,
          "time": 1135
        },
        {
          "usercount": 16053,
          "time": 1140
        },
        {
          "usercount": 16283,
          "time": 1145
        },
        {
          "usercount": 15864,
          "time": 1150
        },
        {
          "usercount": 15875,
          "time": 1155
        },
        {
          "usercount": 16030,
          "time": 1160
        },
        {
          "usercount": 15625,
          "time": 1165
        },
        {
          "usercount": 15131,
          "time": 1170
        },
        {
          "usercount": 15046,
          "time": 1175
        },
        {
          "usercount": 15512,
          "time": 1180
        },
        {
          "usercount": 15011,
          "time": 1185
        },
        {
          "usercount": 15675,
          "time": 1190
        },
        {
          "usercount": 16174,
          "time": 1195
        },
        {
          "usercount": 16692,
          "time": 1200
        },
        {
          "usercount": 16367,
          "time": 1205
        },
        {
          "usercount": 16917,
          "time": 1210
        },
        {
          "usercount": 16384,
          "time": 1215
        },
        {
          "usercount": 16009,
          "time": 1220
        },
        {
          "usercount": 16504,
          "time": 1225
        },
        {
          "usercount": 16863,
          "time": 1230
        },
        {
          "usercount": 16047,
          "time": 1235
        },
        {
          "usercount": 16828,
          "time": 1240
        },
        {
          "usercount": 16549,
          "time": 1245
        },
        {
          "usercount": 16774,
          "time": 1250
        },
        {
          "usercount": 16636,
          "time": 1255
        },
        {
          "usercount": 16226,
          "time": 1260
        },
        {
          "usercount": 16554,
          "time": 1265
        },
        {
          "usercount": 17318,
          "time": 1270
        },
        {
          "usercount": 17437,
          "time": 1275
        },
        {
          "usercount": 16962,
          "time": 1280
        },
        {
          "usercount": 17757,
          "time": 1285
        },
        {
          "usercount": 17876,
          "time": 1290
        },
        {
          "usercount": 17731,
          "time": 1295
        },
        {
          "usercount": 17603,
          "time": 1300
        },
        {
          "usercount": 17465,
          "time": 1305
        },
        {
          "usercount": 16641,
          "time": 1310
        },
        {
          "usercount": 16973,
          "time": 1315
        },
        {
          "usercount": 16328,
          "time": 1320
        },
        {
          "usercount": 15669,
          "time": 1325
        },
        {
          "usercount": 15359,
          "time": 1330
        },
        {
          "usercount": 16027,
          "time": 1335
        },
        {
          "usercount": 15269,
          "time": 1340
        },
        {
          "usercount": 14655,
          "time": 1345
        },
        {
          "usercount": 14211,
          "time": 1350
        },
        {
          "usercount": 14730,
          "time": 1355
        },
        {
          "usercount": 14756,
          "time": 1360
        },
        {
          "usercount": 14708,
          "time": 1365
        },
        {
          "usercount": 14747,
          "time": 1370
        },
        {
          "usercount": 14342,
          "time": 1375
        },
        {
          "usercount": 14853,
          "time": 1380
        },
        {
          "usercount": 14226,
          "time": 1385
        },
        {
          "usercount": 14107,
          "time": 1390
        },
        {
          "usercount": 14464,
          "time": 1395
        },
        {
          "usercount": 14861,
          "time": 1400
        },
        {
          "usercount": 14374,
          "time": 1405
        },
        {
          "usercount": 15066,
          "time": 1410
        },
        {
          "usercount": 14547,
          "time": 1415
        },
        {
          "usercount": 14755,
          "time": 1420
        },
        {
          "usercount": 15095,
          "time": 1425
        },
        {
          "usercount": 15544,
          "time": 1430
        },
        {
          "usercount": 16302,
          "time": 1435
        }
      ]
    },{
      "date": "2018-08-28",
      "trenddata": [
        {
          "usercount": 20370,
          "time": 0
        },
        {
          "usercount": 20793,
          "time": 5
        },
        {
          "usercount": 20134,
          "time": 10
        },
        {
          "usercount": 20762,
          "time": 15
        },
        {
          "usercount": 20896,
          "time": 20
        },
        {
          "usercount": 20326,
          "time": 25
        },
        {
          "usercount": 20768,
          "time": 30
        },
        {
          "usercount": 20171,
          "time": 35
        },
        {
          "usercount": 19965,
          "time": 40
        },
        {
          "usercount": 19590,
          "time": 45
        },
        {
          "usercount": 18892,
          "time": 50
        },
        {
          "usercount": 18438,
          "time": 55
        },
        {
          "usercount": 18809,
          "time": 60
        },
        {
          "usercount": 17901,
          "time": 65
        },
        {
          "usercount": 18272,
          "time": 70
        },
        {
          "usercount": 17542,
          "time": 75
        },
        {
          "usercount": 16999,
          "time": 80
        },
        {
          "usercount": 16715,
          "time": 85
        },
        {
          "usercount": 15925,
          "time": 90
        },
        {
          "usercount": 16157,
          "time": 95
        },
        {
          "usercount": 16768,
          "time": 100
        },
        {
          "usercount": 16464,
          "time": 105
        },
        {
          "usercount": 16154,
          "time": 110
        },
        {
          "usercount": 15416,
          "time": 115
        },
        {
          "usercount": 15206,
          "time": 120
        },
        {
          "usercount": 15885,
          "time": 125
        },
        {
          "usercount": 15955,
          "time": 130
        },
        {
          "usercount": 16564,
          "time": 135
        },
        {
          "usercount": 17093,
          "time": 140
        },
        {
          "usercount": 17518,
          "time": 145
        },
        {
          "usercount": 17317,
          "time": 150
        },
        {
          "usercount": 17018,
          "time": 155
        },
        {
          "usercount": 17094,
          "time": 160
        },
        {
          "usercount": 16537,
          "time": 165
        },
        {
          "usercount": 16300,
          "time": 170
        },
        {
          "usercount": 16591,
          "time": 175
        },
        {
          "usercount": 16120,
          "time": 180
        },
        {
          "usercount": 15598,
          "time": 185
        },
        {
          "usercount": 14840,
          "time": 190
        },
        {
          "usercount": 15070,
          "time": 195
        },
        {
          "usercount": 14379,
          "time": 200
        },
        {
          "usercount": 14615,
          "time": 205
        },
        {
          "usercount": 14501,
          "time": 210
        },
        {
          "usercount": 14985,
          "time": 215
        },
        {
          "usercount": 15439,
          "time": 220
        },
        {
          "usercount": 15219,
          "time": 225
        },
        {
          "usercount": 15365,
          "time": 230
        },
        {
          "usercount": 15795,
          "time": 235
        },
        {
          "usercount": 16227,
          "time": 240
        },
        {
          "usercount": 16642,
          "time": 245
        },
        {
          "usercount": 17035,
          "time": 250
        },
        {
          "usercount": 17037,
          "time": 255
        },
        {
          "usercount": 16824,
          "time": 260
        },
        {
          "usercount": 16201,
          "time": 265
        },
        {
          "usercount": 17009,
          "time": 270
        },
        {
          "usercount": 17122,
          "time": 275
        },
        {
          "usercount": 16585,
          "time": 280
        },
        {
          "usercount": 16581,
          "time": 285
        },
        {
          "usercount": 17244,
          "time": 290
        },
        {
          "usercount": 18007,
          "time": 295
        },
        {
          "usercount": 18001,
          "time": 300
        },
        {
          "usercount": 17667,
          "time": 305
        },
        {
          "usercount": 18429,
          "time": 310
        },
        {
          "usercount": 17621,
          "time": 315
        },
        {
          "usercount": 17700,
          "time": 320
        },
        {
          "usercount": 17022,
          "time": 325
        },
        {
          "usercount": 16547,
          "time": 330
        },
        {
          "usercount": 15817,
          "time": 335
        },
        {
          "usercount": 16192,
          "time": 340
        },
        {
          "usercount": 16953,
          "time": 345
        },
        {
          "usercount": 17119,
          "time": 350
        },
        {
          "usercount": 16627,
          "time": 355
        },
        {
          "usercount": 16692,
          "time": 360
        },
        {
          "usercount": 16294,
          "time": 365
        },
        {
          "usercount": 15928,
          "time": 370
        },
        {
          "usercount": 15342,
          "time": 375
        },
        {
          "usercount": 14858,
          "time": 380
        },
        {
          "usercount": 14847,
          "time": 385
        },
        {
          "usercount": 14337,
          "time": 390
        },
        {
          "usercount": 14378,
          "time": 395
        },
        {
          "usercount": 14929,
          "time": 400
        },
        {
          "usercount": 15302,
          "time": 405
        },
        {
          "usercount": 14877,
          "time": 410
        },
        {
          "usercount": 14439,
          "time": 415
        },
        {
          "usercount": 14132,
          "time": 420
        },
        {
          "usercount": 14055,
          "time": 425
        },
        {
          "usercount": 13795,
          "time": 430
        },
        {
          "usercount": 13846,
          "time": 435
        },
        {
          "usercount": 13681,
          "time": 440
        },
        {
          "usercount": 13716,
          "time": 445
        },
        {
          "usercount": 14039,
          "time": 450
        },
        {
          "usercount": 14000,
          "time": 455
        },
        {
          "usercount": 13952,
          "time": 460
        },
        {
          "usercount": 13590,
          "time": 465
        },
        {
          "usercount": 12961,
          "time": 470
        },
        {
          "usercount": 12685,
          "time": 475
        },
        {
          "usercount": 12491,
          "time": 480
        },
        {
          "usercount": 12649,
          "time": 485
        },
        {
          "usercount": 12443,
          "time": 490
        },
        {
          "usercount": 12944,
          "time": 495
        },
        {
          "usercount": 12406,
          "time": 500
        },
        {
          "usercount": 12523,
          "time": 505
        },
        {
          "usercount": 13030,
          "time": 510
        },
        {
          "usercount": 13267,
          "time": 515
        },
        {
          "usercount": 13497,
          "time": 520
        },
        {
          "usercount": 12950,
          "time": 525
        },
        {
          "usercount": 12419,
          "time": 530
        },
        {
          "usercount": 11872,
          "time": 535
        },
        {
          "usercount": 11418,
          "time": 540
        },
        {
          "usercount": 11224,
          "time": 545
        },
        {
          "usercount": 10897,
          "time": 550
        },
        {
          "usercount": 10731,
          "time": 555
        },
        {
          "usercount": 11120,
          "time": 560
        },
        {
          "usercount": 11499,
          "time": 565
        },
        {
          "usercount": 11473,
          "time": 570
        },
        {
          "usercount": 11799,
          "time": 575
        },
        {
          "usercount": 11784,
          "time": 580
        },
        {
          "usercount": 11447,
          "time": 585
        },
        {
          "usercount": 10884,
          "time": 590
        },
        {
          "usercount": 11249,
          "time": 595
        },
        {
          "usercount": 11529,
          "time": 600
        },
        {
          "usercount": 11251,
          "time": 605
        },
        {
          "usercount": 11151,
          "time": 610
        },
        {
          "usercount": 11155,
          "time": 615
        },
        {
          "usercount": 11629,
          "time": 620
        },
        {
          "usercount": 11718,
          "time": 625
        },
        {
          "usercount": 12131,
          "time": 630
        },
        {
          "usercount": 11682,
          "time": 635
        },
        {
          "usercount": 11845,
          "time": 640
        },
        {
          "usercount": 11323,
          "time": 645
        },
        {
          "usercount": 10806,
          "time": 650
        },
        {
          "usercount": 11314,
          "time": 655
        },
        {
          "usercount": 11166,
          "time": 660
        },
        {
          "usercount": 10765,
          "time": 665
        },
        {
          "usercount": 10488,
          "time": 670
        },
        {
          "usercount": 10238,
          "time": 675
        },
        {
          "usercount": 10738,
          "time": 680
        },
        {
          "usercount": 11076,
          "time": 685
        },
        {
          "usercount": 10655,
          "time": 690
        },
        {
          "usercount": 11141,
          "time": 695
        },
        {
          "usercount": 11433,
          "time": 700
        },
        {
          "usercount": 10872,
          "time": 705
        },
        {
          "usercount": 10717,
          "time": 710
        },
        {
          "usercount": 10663,
          "time": 715
        },
        {
          "usercount": 10326,
          "time": 720
        },
        {
          "usercount": 10014,
          "time": 725
        },
        {
          "usercount": 10206,
          "time": 730
        },
        {
          "usercount": 10636,
          "time": 735
        },
        {
          "usercount": 10541,
          "time": 740
        },
        {
          "usercount": 10801,
          "time": 745
        },
        {
          "usercount": 11322,
          "time": 750
        },
        {
          "usercount": 11247,
          "time": 755
        },
        {
          "usercount": 10951,
          "time": 760
        },
        {
          "usercount": 11377,
          "time": 765
        },
        {
          "usercount": 11234,
          "time": 770
        },
        {
          "usercount": 10752,
          "time": 775
        },
        {
          "usercount": 10547,
          "time": 780
        },
        {
          "usercount": 10810,
          "time": 785
        },
        {
          "usercount": 10549,
          "time": 790
        },
        {
          "usercount": 10167,
          "time": 795
        },
        {
          "usercount": 9998,
          "time": 800
        },
        {
          "usercount": 9835,
          "time": 805
        },
        {
          "usercount": 10153,
          "time": 810
        },
        {
          "usercount": 10453,
          "time": 815
        },
        {
          "usercount": 10712,
          "time": 820
        },
        {
          "usercount": 11122,
          "time": 825
        },
        {
          "usercount": 10730,
          "time": 830
        },
        {
          "usercount": 10962,
          "time": 835
        },
        {
          "usercount": 11069,
          "time": 840
        },
        {
          "usercount": 11503,
          "time": 845
        },
        {
          "usercount": 11231,
          "time": 850
        },
        {
          "usercount": 11413,
          "time": 855
        },
        {
          "usercount": 11761,
          "time": 860
        },
        {
          "usercount": 12065,
          "time": 865
        },
        {
          "usercount": 12296,
          "time": 870
        },
        {
          "usercount": 11943,
          "time": 875
        },
        {
          "usercount": 11531,
          "time": 880
        },
        {
          "usercount": 11449,
          "time": 885
        },
        {
          "usercount": 11231,
          "time": 890
        },
        {
          "usercount": 11101,
          "time": 895
        },
        {
          "usercount": 11167,
          "time": 900
        },
        {
          "usercount": 11714,
          "time": 905
        },
        {
          "usercount": 11437,
          "time": 910
        },
        {
          "usercount": 11474,
          "time": 915
        },
        {
          "usercount": 11345,
          "time": 920
        },
        {
          "usercount": 11525,
          "time": 925
        },
        {
          "usercount": 11344,
          "time": 930
        },
        {
          "usercount": 11718,
          "time": 935
        },
        {
          "usercount": 11175,
          "time": 940
        },
        {
          "usercount": 11101,
          "time": 945
        },
        {
          "usercount": 11126,
          "time": 950
        },
        {
          "usercount": 10877,
          "time": 955
        },
        {
          "usercount": 10844,
          "time": 960
        },
        {
          "usercount": 11055,
          "time": 965
        },
        {
          "usercount": 10989,
          "time": 970
        },
        {
          "usercount": 10599,
          "time": 975
        },
        {
          "usercount": 10107,
          "time": 980
        },
        {
          "usercount": 9738,
          "time": 985
        },
        {
          "usercount": 9472,
          "time": 990
        },
        {
          "usercount": 9808,
          "time": 995
        },
        {
          "usercount": 9883,
          "time": 1000
        },
        {
          "usercount": 10249,
          "time": 1005
        },
        {
          "usercount": 10123,
          "time": 1010
        },
        {
          "usercount": 10553,
          "time": 1015
        },
        {
          "usercount": 10271,
          "time": 1020
        },
        {
          "usercount": 10577,
          "time": 1025
        },
        {
          "usercount": 10918,
          "time": 1030
        },
        {
          "usercount": 11321,
          "time": 1035
        },
        {
          "usercount": 11671,
          "time": 1040
        },
        {
          "usercount": 11787,
          "time": 1045
        },
        {
          "usercount": 11246,
          "time": 1050
        },
        {
          "usercount": 11516,
          "time": 1055
        },
        {
          "usercount": 10984,
          "time": 1060
        },
        {
          "usercount": 10947,
          "time": 1065
        },
        {
          "usercount": 10416,
          "time": 1070
        },
        {
          "usercount": 10304,
          "time": 1075
        },
        {
          "usercount": 9870,
          "time": 1080
        },
        {
          "usercount": 10240,
          "time": 1085
        },
        {
          "usercount": 10054,
          "time": 1090
        },
        {
          "usercount": 10174,
          "time": 1095
        },
        {
          "usercount": 10449,
          "time": 1100
        },
        {
          "usercount": 10663,
          "time": 1105
        },
        {
          "usercount": 11053,
          "time": 1110
        },
        {
          "usercount": 10661,
          "time": 1115
        },
        {
          "usercount": 10634,
          "time": 1120
        },
        {
          "usercount": 10895,
          "time": 1125
        },
        {
          "usercount": 10425,
          "time": 1130
        },
        {
          "usercount": 10081,
          "time": 1135
        },
        {
          "usercount": 10036,
          "time": 1140
        },
        {
          "usercount": 10085,
          "time": 1145
        },
        {
          "usercount": 9738,
          "time": 1150
        },
        {
          "usercount": 9327,
          "time": 1155
        },
        {
          "usercount": 9206,
          "time": 1160
        },
        {
          "usercount": 9626,
          "time": 1165
        },
        {
          "usercount": 9237,
          "time": 1170
        },
        {
          "usercount": 9189,
          "time": 1175
        },
        {
          "usercount": 8811,
          "time": 1180
        },
        {
          "usercount": 8690,
          "time": 1185
        },
        {
          "usercount": 8788,
          "time": 1190
        },
        {
          "usercount": 8878,
          "time": 1195
        },
        {
          "usercount": 9306,
          "time": 1200
        },
        {
          "usercount": 8858,
          "time": 1205
        },
        {
          "usercount": 8562,
          "time": 1210
        },
        {
          "usercount": 8612,
          "time": 1215
        },
        {
          "usercount": 8917,
          "time": 1220
        },
        {
          "usercount": 9321,
          "time": 1225
        },
        {
          "usercount": 9177,
          "time": 1230
        },
        {
          "usercount": 9620,
          "time": 1235
        },
        {
          "usercount": 9705,
          "time": 1240
        },
        {
          "usercount": 9285,
          "time": 1245
        },
        {
          "usercount": 8986,
          "time": 1250
        },
        {
          "usercount": 8720,
          "time": 1255
        },
        {
          "usercount": 8608,
          "time": 1260
        },
        {
          "usercount": 8860,
          "time": 1265
        },
        {
          "usercount": 8568,
          "time": 1270
        },
        {
          "usercount": 8350,
          "time": 1275
        },
        {
          "usercount": 8189,
          "time": 1280
        },
        {
          "usercount": 8461,
          "time": 1285
        },
        {
          "usercount": 8839,
          "time": 1290
        },
        {
          "usercount": 8560,
          "time": 1295
        },
        {
          "usercount": 8644,
          "time": 1300
        },
        {
          "usercount": 9062,
          "time": 1305
        },
        {
          "usercount": 8762,
          "time": 1310
        },
        {
          "usercount": 8579,
          "time": 1315
        },
        {
          "usercount": 8510,
          "time": 1320
        },
        {
          "usercount": 8266,
          "time": 1325
        },
        {
          "usercount": 7878,
          "time": 1330
        },
        {
          "usercount": 8061,
          "time": 1335
        },
        {
          "usercount": 7924,
          "time": 1340
        },
        {
          "usercount": 8086,
          "time": 1345
        },
        {
          "usercount": 8254,
          "time": 1350
        },
        {
          "usercount": 8381,
          "time": 1355
        },
        {
          "usercount": 8531,
          "time": 1360
        },
        {
          "usercount": 8791,
          "time": 1365
        },
        {
          "usercount": 9167,
          "time": 1370
        },
        {
          "usercount": 9214,
          "time": 1375
        },
        {
          "usercount": 9241,
          "time": 1380
        },
        {
          "usercount": 9214,
          "time": 1385
        },
        {
          "usercount": 9341,
          "time": 1390
        },
        {
          "usercount": 9532,
          "time": 1395
        },
        {
          "usercount": 9555,
          "time": 1400
        },
        {
          "usercount": 9766,
          "time": 1405
        },
        {
          "usercount": 9740,
          "time": 1410
        },
        {
          "usercount": 9936,
          "time": 1415
        },
        {
          "usercount": 10347,
          "time": 1420
        },
        {
          "usercount": 10570,
          "time": 1425
        },
        {
          "usercount": 10975,
          "time": 1430
        },
        {
          "usercount": 10542,
          "time": 1435
        }
      ]
    },{
      "date": "2018-08-29",
      "trenddata": [
        {
          "usercount": 20287,
          "time": 0
        },
        {
          "usercount": 19957,
          "time": 5
        },
        {
          "usercount": 19221,
          "time": 10
        },
        {
          "usercount": 19988,
          "time": 15
        },
        {
          "usercount": 20483,
          "time": 20
        },
        {
          "usercount": 19551,
          "time": 25
        },
        {
          "usercount": 18676,
          "time": 30
        },
        {
          "usercount": 17802,
          "time": 35
        },
        {
          "usercount": 17570,
          "time": 40
        },
        {
          "usercount": 18237,
          "time": 45
        },
        {
          "usercount": 19060,
          "time": 50
        },
        {
          "usercount": 19411,
          "time": 55
        },
        {
          "usercount": 20164,
          "time": 60
        },
        {
          "usercount": 20846,
          "time": 65
        },
        {
          "usercount": 19951,
          "time": 70
        },
        {
          "usercount": 19983,
          "time": 75
        },
        {
          "usercount": 20893,
          "time": 80
        },
        {
          "usercount": 20634,
          "time": 85
        },
        {
          "usercount": 19942,
          "time": 90
        },
        {
          "usercount": 20756,
          "time": 95
        },
        {
          "usercount": 20447,
          "time": 100
        },
        {
          "usercount": 20910,
          "time": 105
        },
        {
          "usercount": 20580,
          "time": 110
        },
        {
          "usercount": 21445,
          "time": 115
        },
        {
          "usercount": 20890,
          "time": 120
        },
        {
          "usercount": 21136,
          "time": 125
        },
        {
          "usercount": 21513,
          "time": 130
        },
        {
          "usercount": 20741,
          "time": 135
        },
        {
          "usercount": 21085,
          "time": 140
        },
        {
          "usercount": 20714,
          "time": 145
        },
        {
          "usercount": 20681,
          "time": 150
        },
        {
          "usercount": 20861,
          "time": 155
        },
        {
          "usercount": 20515,
          "time": 160
        },
        {
          "usercount": 20656,
          "time": 165
        },
        {
          "usercount": 20600,
          "time": 170
        },
        {
          "usercount": 19660,
          "time": 175
        },
        {
          "usercount": 19322,
          "time": 180
        },
        {
          "usercount": 19886,
          "time": 185
        },
        {
          "usercount": 20499,
          "time": 190
        },
        {
          "usercount": 19622,
          "time": 195
        },
        {
          "usercount": 19688,
          "time": 200
        },
        {
          "usercount": 19489,
          "time": 205
        },
        {
          "usercount": 18628,
          "time": 210
        },
        {
          "usercount": 17729,
          "time": 215
        },
        {
          "usercount": 17445,
          "time": 220
        },
        {
          "usercount": 18159,
          "time": 225
        },
        {
          "usercount": 18473,
          "time": 230
        },
        {
          "usercount": 17811,
          "time": 235
        },
        {
          "usercount": 18403,
          "time": 240
        },
        {
          "usercount": 19078,
          "time": 245
        },
        {
          "usercount": 19903,
          "time": 250
        },
        {
          "usercount": 19890,
          "time": 255
        },
        {
          "usercount": 20721,
          "time": 260
        },
        {
          "usercount": 21708,
          "time": 265
        },
        {
          "usercount": 22260,
          "time": 270
        },
        {
          "usercount": 22544,
          "time": 275
        },
        {
          "usercount": 22227,
          "time": 280
        },
        {
          "usercount": 22068,
          "time": 285
        },
        {
          "usercount": 21519,
          "time": 290
        },
        {
          "usercount": 22073,
          "time": 295
        },
        {
          "usercount": 22655,
          "time": 300
        },
        {
          "usercount": 22521,
          "time": 305
        },
        {
          "usercount": 21761,
          "time": 310
        },
        {
          "usercount": 22377,
          "time": 315
        },
        {
          "usercount": 22732,
          "time": 320
        },
        {
          "usercount": 23857,
          "time": 325
        },
        {
          "usercount": 23950,
          "time": 330
        },
        {
          "usercount": 24666,
          "time": 335
        },
        {
          "usercount": 24534,
          "time": 340
        },
        {
          "usercount": 23436,
          "time": 345
        },
        {
          "usercount": 23642,
          "time": 350
        },
        {
          "usercount": 23883,
          "time": 355
        },
        {
          "usercount": 24525,
          "time": 360
        },
        {
          "usercount": 24907,
          "time": 365
        },
        {
          "usercount": 24030,
          "time": 370
        },
        {
          "usercount": 24473,
          "time": 375
        },
        {
          "usercount": 25263,
          "time": 380
        },
        {
          "usercount": 26046,
          "time": 385
        },
        {
          "usercount": 25254,
          "time": 390
        },
        {
          "usercount": 25578,
          "time": 395
        },
        {
          "usercount": 24707,
          "time": 400
        },
        {
          "usercount": 24127,
          "time": 405
        },
        {
          "usercount": 23272,
          "time": 410
        },
        {
          "usercount": 24429,
          "time": 415
        },
        {
          "usercount": 23245,
          "time": 420
        },
        {
          "usercount": 22918,
          "time": 425
        },
        {
          "usercount": 22390,
          "time": 430
        },
        {
          "usercount": 21932,
          "time": 435
        },
        {
          "usercount": 21910,
          "time": 440
        },
        {
          "usercount": 21831,
          "time": 445
        },
        {
          "usercount": 22735,
          "time": 450
        },
        {
          "usercount": 22736,
          "time": 455
        },
        {
          "usercount": 22201,
          "time": 460
        },
        {
          "usercount": 22761,
          "time": 465
        },
        {
          "usercount": 23538,
          "time": 470
        },
        {
          "usercount": 23435,
          "time": 475
        },
        {
          "usercount": 24447,
          "time": 480
        },
        {
          "usercount": 24180,
          "time": 485
        },
        {
          "usercount": 23313,
          "time": 490
        },
        {
          "usercount": 23617,
          "time": 495
        },
        {
          "usercount": 24330,
          "time": 500
        },
        {
          "usercount": 23116,
          "time": 505
        },
        {
          "usercount": 23940,
          "time": 510
        },
        {
          "usercount": 23935,
          "time": 515
        },
        {
          "usercount": 24914,
          "time": 520
        },
        {
          "usercount": 26069,
          "time": 525
        },
        {
          "usercount": 25207,
          "time": 530
        },
        {
          "usercount": 24393,
          "time": 535
        },
        {
          "usercount": 24316,
          "time": 540
        },
        {
          "usercount": 24324,
          "time": 545
        },
        {
          "usercount": 23129,
          "time": 550
        },
        {
          "usercount": 22764,
          "time": 555
        },
        {
          "usercount": 22776,
          "time": 560
        },
        {
          "usercount": 22976,
          "time": 565
        },
        {
          "usercount": 22978,
          "time": 570
        },
        {
          "usercount": 22777,
          "time": 575
        },
        {
          "usercount": 22662,
          "time": 580
        },
        {
          "usercount": 22649,
          "time": 585
        },
        {
          "usercount": 22740,
          "time": 590
        },
        {
          "usercount": 22292,
          "time": 595
        },
        {
          "usercount": 22236,
          "time": 600
        },
        {
          "usercount": 21727,
          "time": 605
        },
        {
          "usercount": 22678,
          "time": 610
        },
        {
          "usercount": 23733,
          "time": 615
        },
        {
          "usercount": 23784,
          "time": 620
        },
        {
          "usercount": 23427,
          "time": 625
        },
        {
          "usercount": 23960,
          "time": 630
        },
        {
          "usercount": 23344,
          "time": 635
        },
        {
          "usercount": 22477,
          "time": 640
        },
        {
          "usercount": 22823,
          "time": 645
        },
        {
          "usercount": 22422,
          "time": 650
        },
        {
          "usercount": 22992,
          "time": 655
        },
        {
          "usercount": 21877,
          "time": 660
        },
        {
          "usercount": 22473,
          "time": 665
        },
        {
          "usercount": 22964,
          "time": 670
        },
        {
          "usercount": 23942,
          "time": 675
        },
        {
          "usercount": 24787,
          "time": 680
        },
        {
          "usercount": 25213,
          "time": 685
        },
        {
          "usercount": 25069,
          "time": 690
        },
        {
          "usercount": 23982,
          "time": 695
        },
        {
          "usercount": 24843,
          "time": 700
        },
        {
          "usercount": 24793,
          "time": 705
        },
        {
          "usercount": 25086,
          "time": 710
        },
        {
          "usercount": 25048,
          "time": 715
        },
        {
          "usercount": 25266,
          "time": 720
        },
        {
          "usercount": 26444,
          "time": 725
        },
        {
          "usercount": 27212,
          "time": 730
        },
        {
          "usercount": 26905,
          "time": 735
        },
        {
          "usercount": 26084,
          "time": 740
        },
        {
          "usercount": 25709,
          "time": 745
        },
        {
          "usercount": 24748,
          "time": 750
        },
        {
          "usercount": 24385,
          "time": 755
        },
        {
          "usercount": 23280,
          "time": 760
        },
        {
          "usercount": 22566,
          "time": 765
        },
        {
          "usercount": 21809,
          "time": 770
        },
        {
          "usercount": 21254,
          "time": 775
        },
        {
          "usercount": 20421,
          "time": 780
        },
        {
          "usercount": 21018,
          "time": 785
        },
        {
          "usercount": 21209,
          "time": 790
        },
        {
          "usercount": 20661,
          "time": 795
        },
        {
          "usercount": 21010,
          "time": 800
        },
        {
          "usercount": 21234,
          "time": 805
        },
        {
          "usercount": 22223,
          "time": 810
        },
        {
          "usercount": 21988,
          "time": 815
        },
        {
          "usercount": 22993,
          "time": 820
        },
        {
          "usercount": 24084,
          "time": 825
        },
        {
          "usercount": 24085,
          "time": 830
        },
        {
          "usercount": 23372,
          "time": 835
        },
        {
          "usercount": 22931,
          "time": 840
        },
        {
          "usercount": 23321,
          "time": 845
        },
        {
          "usercount": 23407,
          "time": 850
        },
        {
          "usercount": 24072,
          "time": 855
        },
        {
          "usercount": 25053,
          "time": 860
        },
        {
          "usercount": 24777,
          "time": 865
        },
        {
          "usercount": 25650,
          "time": 870
        },
        {
          "usercount": 25784,
          "time": 875
        },
        {
          "usercount": 24689,
          "time": 880
        },
        {
          "usercount": 24674,
          "time": 885
        },
        {
          "usercount": 24203,
          "time": 890
        },
        {
          "usercount": 24601,
          "time": 895
        },
        {
          "usercount": 24219,
          "time": 900
        },
        {
          "usercount": 23253,
          "time": 905
        },
        {
          "usercount": 22343,
          "time": 910
        },
        {
          "usercount": 21566,
          "time": 915
        },
        {
          "usercount": 20893,
          "time": 920
        },
        {
          "usercount": 20782,
          "time": 925
        },
        {
          "usercount": 20968,
          "time": 930
        },
        {
          "usercount": 20387,
          "time": 935
        },
        {
          "usercount": 21119,
          "time": 940
        },
        {
          "usercount": 21746,
          "time": 945
        },
        {
          "usercount": 22456,
          "time": 950
        },
        {
          "usercount": 23531,
          "time": 955
        },
        {
          "usercount": 23667,
          "time": 960
        },
        {
          "usercount": 23872,
          "time": 965
        },
        {
          "usercount": 24314,
          "time": 970
        },
        {
          "usercount": 23352,
          "time": 975
        },
        {
          "usercount": 23087,
          "time": 980
        },
        {
          "usercount": 23904,
          "time": 985
        },
        {
          "usercount": 24350,
          "time": 990
        },
        {
          "usercount": 24923,
          "time": 995
        },
        {
          "usercount": 25717,
          "time": 1000
        },
        {
          "usercount": 24855,
          "time": 1005
        },
        {
          "usercount": 25743,
          "time": 1010
        },
        {
          "usercount": 26130,
          "time": 1015
        },
        {
          "usercount": 25326,
          "time": 1020
        },
        {
          "usercount": 26418,
          "time": 1025
        },
        {
          "usercount": 25960,
          "time": 1030
        },
        {
          "usercount": 25312,
          "time": 1035
        },
        {
          "usercount": 26477,
          "time": 1040
        },
        {
          "usercount": 26360,
          "time": 1045
        },
        {
          "usercount": 26939,
          "time": 1050
        },
        {
          "usercount": 27922,
          "time": 1055
        },
        {
          "usercount": 28496,
          "time": 1060
        },
        {
          "usercount": 28079,
          "time": 1065
        },
        {
          "usercount": 29151,
          "time": 1070
        },
        {
          "usercount": 30339,
          "time": 1075
        },
        {
          "usercount": 30908,
          "time": 1080
        },
        {
          "usercount": 29584,
          "time": 1085
        },
        {
          "usercount": 29961,
          "time": 1090
        },
        {
          "usercount": 30244,
          "time": 1095
        },
        {
          "usercount": 31615,
          "time": 1100
        },
        {
          "usercount": 30794,
          "time": 1105
        },
        {
          "usercount": 29297,
          "time": 1110
        },
        {
          "usercount": 27842,
          "time": 1115
        },
        {
          "usercount": 27723,
          "time": 1120
        },
        {
          "usercount": 26505,
          "time": 1125
        },
        {
          "usercount": 26587,
          "time": 1130
        },
        {
          "usercount": 25869,
          "time": 1135
        },
        {
          "usercount": 24939,
          "time": 1140
        },
        {
          "usercount": 25048,
          "time": 1145
        },
        {
          "usercount": 24605,
          "time": 1150
        },
        {
          "usercount": 24176,
          "time": 1155
        },
        {
          "usercount": 23305,
          "time": 1160
        },
        {
          "usercount": 23381,
          "time": 1165
        },
        {
          "usercount": 23129,
          "time": 1170
        },
        {
          "usercount": 22463,
          "time": 1175
        },
        {
          "usercount": 21427,
          "time": 1180
        },
        {
          "usercount": 22128,
          "time": 1185
        },
        {
          "usercount": 22997,
          "time": 1190
        },
        {
          "usercount": 23403,
          "time": 1195
        },
        {
          "usercount": 23457,
          "time": 1200
        },
        {
          "usercount": 23055,
          "time": 1205
        },
        {
          "usercount": 22866,
          "time": 1210
        },
        {
          "usercount": 23532,
          "time": 1215
        },
        {
          "usercount": 23813,
          "time": 1220
        },
        {
          "usercount": 24928,
          "time": 1225
        },
        {
          "usercount": 25552,
          "time": 1230
        },
        {
          "usercount": 25461,
          "time": 1235
        },
        {
          "usercount": 25678,
          "time": 1240
        },
        {
          "usercount": 25925,
          "time": 1245
        },
        {
          "usercount": 26754,
          "time": 1250
        },
        {
          "usercount": 26208,
          "time": 1255
        },
        {
          "usercount": 25680,
          "time": 1260
        },
        {
          "usercount": 26441,
          "time": 1265
        },
        {
          "usercount": 26452,
          "time": 1270
        },
        {
          "usercount": 26056,
          "time": 1275
        },
        {
          "usercount": 24852,
          "time": 1280
        },
        {
          "usercount": 24938,
          "time": 1285
        },
        {
          "usercount": 25617,
          "time": 1290
        },
        {
          "usercount": 26054,
          "time": 1295
        },
        {
          "usercount": 25516,
          "time": 1300
        },
        {
          "usercount": 24364,
          "time": 1305
        },
        {
          "usercount": 24277,
          "time": 1310
        },
        {
          "usercount": 23308,
          "time": 1315
        },
        {
          "usercount": 23686,
          "time": 1320
        },
        {
          "usercount": 23681,
          "time": 1325
        },
        {
          "usercount": 23010,
          "time": 1330
        },
        {
          "usercount": 23516,
          "time": 1335
        },
        {
          "usercount": 23109,
          "time": 1340
        },
        {
          "usercount": 21978,
          "time": 1345
        },
        {
          "usercount": 21651,
          "time": 1350
        },
        {
          "usercount": 21637,
          "time": 1355
        },
        {
          "usercount": 21248,
          "time": 1360
        },
        {
          "usercount": 21084,
          "time": 1365
        },
        {
          "usercount": 20122,
          "time": 1370
        },
        {
          "usercount": 20136,
          "time": 1375
        },
        {
          "usercount": 19498,
          "time": 1380
        },
        {
          "usercount": 18855,
          "time": 1385
        },
        {
          "usercount": 19605,
          "time": 1390
        },
        {
          "usercount": 18953,
          "time": 1395
        },
        {
          "usercount": 19887,
          "time": 1400
        },
        {
          "usercount": 19151,
          "time": 1405
        },
        {
          "usercount": 19606,
          "time": 1410
        },
        {
          "usercount": 18949,
          "time": 1415
        },
        {
          "usercount": 18235,
          "time": 1420
        },
        {
          "usercount": 18133,
          "time": 1425
        },
        {
          "usercount": 18744,
          "time": 1430
        },
        {
          "usercount": 19610,
          "time": 1435
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
