import {Injectable} from "@angular/core";
import {
  Aggregate, EntityType,
  EventCount, EventPeriodCount, EventReportFilter, EventTimeFrequency, EventUserFrequency, GroupBy, TrendCount,
  TrendTimeSeries,
  UserCountByEventForDate,
  UserCountByEventTimeSeries, UserCountForProperty,
  UserCountTimeSeries, UserCountTrendForDate, UserTypeTrendForDate
} from "../_models/reports";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {AppSettings} from "../_settings/app-settings";

@Injectable()
export class ReportsService {


  constructor(private httpClient: HttpClient) {
  }

  /*
  DASHBOARD APIs
   */
  getTrendCount(segmentid, groupby, interval): Observable<TrendCount[]> {
    console.log('trendcount')
    var data = this.trendcountData;
    return of(data)

    // const params = new HttpParams().set("segmentid", segmentid).set("groupby",groupby).set("interval",interval);
    // return this.httpClient.get<TrendCount[]>(AppSettings.API_ENDPOINT_CLIENT_CLIENT_DASHBOARD_TRENDCOUNT,{params});
  }

  getTrendCount_1(segmentid: number, groupby: GroupBy, interval: number): Observable<UserCountForProperty[]> {
    const params = new HttpParams().set("segmentid", segmentid.toString()).set("groupBy", groupby.toString()).set("interval", interval.toString());
    return this.httpClient.get<UserCountForProperty[]>(AppSettings.API_ENDPOINT_CLIENT_DASHBOARD_LIVEUSERS, {
      params: params
    });
  }

  getTrendChart(segmentid, dates, interval): Observable<TrendTimeSeries[]> {
    console.log('trendchart')
    var data = this.trendchartData;
    return of(data);

    // const params = new HttpParams().set("segmentid", segmentid).set("dates",dates).set("interval",interval);
    // return this.httpClient.get<TrendTimeSeries[]>(AppSettings.API_ENDPOINT_CLIENT_CLIENT_DASHBOARD_TRENDCHART,{params});
  }

  getTrendChart_1(segmentid, dates, interval): Observable<UserCountTrendForDate[]> {
    const params = new HttpParams().set("segmentid", segmentid.toString()).set("dates", dates.toString()).set("interval", interval.toString());
    return this.httpClient.get<UserCountTrendForDate[]>(AppSettings.API_ENDPOINT_CLIENT_DASHBOARD_LIVEUSERTREND, {
      params: params
    });
  }

  getNewVsExisting(segmentid, dates, interval): Observable<UserCountTimeSeries[]> {
    //create custom observable
    console.log('newvsexisting')
    var data = this.newvsexistingData;
    return of(data);

    // const params = new HttpParams().set("segmentid", segmentid).set("dates",dates).set("interval",interval);
    // return this.httpClient.get<UserCountTimeSeries[]>(AppSettings.API_ENDPOINT_CLIENT_CLIENT_DASHBOARD_NEWVSEXISTING,{params});
  }

  getNewVsExtsting_1(segmentid, dates, interval): Observable<UserTypeTrendForDate[]> {
    const params = new HttpParams().set("segmentid", segmentid.toString()).set("dates", dates.toString()).set("interval", interval.toString());
    return this.httpClient.get<UserTypeTrendForDate[]>(AppSettings.API_ENDPOINT_CLIENT_DASHBOARD_LIVEUSERTYPETREND, {
      params: params
    });
  }

  getUserCountByEvent(segmentid, dates): Observable<UserCountByEventTimeSeries[]> {
    console.log('usercountbyevent')
    var data = this.usercountbyeventsData;
    return of(data);

    // const params = new HttpParams().set("segmentid", segmentid).set("dates",dates);
    // return this.httpClient.get<UserCountByEventTimeSeries[]>(AppSettings.API_ENDPOINT_CLIENT_CLIENT_DASHBOARD_USERCOUNTBYEVENTS,{params});
  }

  getUserCountByEvent_1(segmentid, dates): Observable<UserCountByEventForDate[]> {
    const params = new HttpParams().set("segmentid", segmentid.toString()).set("dates", dates.toString());
    return this.httpClient.get<UserCountByEventForDate[]>(AppSettings.API_ENDPOINT_CLIENT_DASHBOARD_USERCOUNTBYEVENTS, {
      params: params
    });
  }

  getSampleUsersByEvent(date: string, segmentid: number): Observable<any[]> {
    const params = new HttpParams().set("date", date).set("segmentid", segmentid.toString());
    return this.httpClient.get<any[]>(AppSettings.API_ENDPOINT_CLIENT_DASHBOARD_SAMPLEUSERSBYEVENT, {params});
  }
  /*
  DASHBOARD APIs end
   */


  /*
  EVENT APIs Begin
   */
  //event report api call

  getCountTrend(eventReportFilter: EventReportFilter, entitytype: EntityType, groupby = null): Observable<EventCount[]> {
    //group by optional  os
    const params = new HttpParams().set("ftr", eventReportFilter.toString()).set("entityType", entitytype);
    if (groupby != null) {
      params.set("groupby", groupby);
    }
    return this.httpClient.post<EventCount[]>(AppSettings.API_ENDPOINT_CLIENT_REPORT_EVENT_EVENTCOUNT, {params});
  }

  getTimePeriodTrend(eventReportFilter, entityType: EntityType, period): Observable<EventPeriodCount[]> {
    const params = new HttpParams().set("ftr", eventReportFilter).set("entityType", entityType).set("period", period);
    return this.httpClient.get<EventPeriodCount[]>(AppSettings.API_ENDPOINT_CLIENT_REPORT_EVENT_TRENDBYTIMEPERIOD, {params});
  }

  getEventUserTrend(eventReportFilter): Observable<EventUserFrequency[]> {
    const params = new HttpParams().set("ftr", eventReportFilter);
    return this.httpClient.get<EventUserFrequency[]>(AppSettings.API_ENDPOINT_CLIENT_REPORT_EVENT_EVENTUSERTREND, {params});
  }

  getEventTimeTrend(eventReportFilter): Observable<EventTimeFrequency[]> {
    const params = new HttpParams().set("ftr", eventReportFilter);
    return this.httpClient.get<EventTimeFrequency[]>(AppSettings.API_ENDPOINT_CLIENT_REPORT_EVENT_EVENTTIMETREND, {params});
  }

  getEventAggregateTrend(eventReportFilter, period, aggregateOn = null): Observable<Aggregate[]> {
    //aggregate are unrequire
    const params = new HttpParams().set("ftr", eventReportFilter).set("period", period);
    if (aggregateOn != null) {
      params.set("aggregateOn", aggregateOn);
    }
    return this.httpClient.get<Aggregate[]>(AppSettings.API_ENDPOINT_CLIENT_REPORT_EVENT_EVENTAGGREGATETREND, {params});
  }
  /*
  EVENT APIs end
   */

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


  public trendcountData: Array<TrendCount> = [

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
  public trendchartData: Array<TrendTimeSeries> = [
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
    }, {
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
    }, {
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
  public newvsexistingData: Array<UserCountTimeSeries> = [
    {
      "date": "2018-08-27",
      "userCountData": [
        {
          "newusercount": 5207,
          "oldusercount": 20830,
          "time": 0
        },
        {
          "newusercount": 5410,
          "oldusercount": 21644,
          "time": 5
        },
        {
          "newusercount": 5377,
          "oldusercount": 21510,
          "time": 10
        },
        {
          "newusercount": 5463,
          "oldusercount": 21854,
          "time": 15
        },
        {
          "newusercount": 5713,
          "oldusercount": 22855,
          "time": 20
        },
        {
          "newusercount": 5733,
          "oldusercount": 22936,
          "time": 25
        },
        {
          "newusercount": 5599,
          "oldusercount": 22399,
          "time": 30
        },
        {
          "newusercount": 5409,
          "oldusercount": 21636,
          "time": 35
        },
        {
          "newusercount": 5574,
          "oldusercount": 22297,
          "time": 40
        },
        {
          "newusercount": 5794,
          "oldusercount": 23179,
          "time": 45
        },
        {
          "newusercount": 5560,
          "oldusercount": 22240,
          "time": 50
        },
        {
          "newusercount": 5301,
          "oldusercount": 21203,
          "time": 55
        },
        {
          "newusercount": 5473,
          "oldusercount": 21893,
          "time": 60
        },
        {
          "newusercount": 5393,
          "oldusercount": 21570,
          "time": 65
        },
        {
          "newusercount": 5628,
          "oldusercount": 22511,
          "time": 70
        },
        {
          "newusercount": 5836,
          "oldusercount": 23344,
          "time": 75
        },
        {
          "newusercount": 5577,
          "oldusercount": 22305,
          "time": 80
        },
        {
          "newusercount": 5430,
          "oldusercount": 21717,
          "time": 85
        },
        {
          "newusercount": 5402,
          "oldusercount": 21603,
          "time": 90
        },
        {
          "newusercount": 5469,
          "oldusercount": 21872,
          "time": 95
        },
        {
          "newusercount": 5666,
          "oldusercount": 22661,
          "time": 100
        },
        {
          "newusercount": 5898,
          "oldusercount": 23589,
          "time": 105
        },
        {
          "newusercount": 5828,
          "oldusercount": 23308,
          "time": 110
        },
        {
          "newusercount": 5920,
          "oldusercount": 23679,
          "time": 115
        },
        {
          "newusercount": 5666,
          "oldusercount": 22661,
          "time": 120
        },
        {
          "newusercount": 5530,
          "oldusercount": 22115,
          "time": 125
        },
        {
          "newusercount": 5418,
          "oldusercount": 21666,
          "time": 130
        },
        {
          "newusercount": 5590,
          "oldusercount": 22356,
          "time": 135
        },
        {
          "newusercount": 5643,
          "oldusercount": 22570,
          "time": 140
        },
        {
          "newusercount": 5686,
          "oldusercount": 22744,
          "time": 145
        },
        {
          "newusercount": 5757,
          "oldusercount": 23028,
          "time": 150
        },
        {
          "newusercount": 5567,
          "oldusercount": 22265,
          "time": 155
        },
        {
          "newusercount": 5427,
          "oldusercount": 21705,
          "time": 160
        },
        {
          "newusercount": 5669,
          "oldusercount": 22673,
          "time": 165
        },
        {
          "newusercount": 5586,
          "oldusercount": 22339,
          "time": 170
        },
        {
          "newusercount": 5547,
          "oldusercount": 22183,
          "time": 175
        },
        {
          "newusercount": 5517,
          "oldusercount": 22060,
          "time": 180
        },
        {
          "newusercount": 5437,
          "oldusercount": 21739,
          "time": 185
        },
        {
          "newusercount": 5510,
          "oldusercount": 22031,
          "time": 190
        },
        {
          "newusercount": 5455,
          "oldusercount": 21811,
          "time": 195
        },
        {
          "newusercount": 5638,
          "oldusercount": 22542,
          "time": 200
        },
        {
          "newusercount": 5527,
          "oldusercount": 22098,
          "time": 205
        },
        {
          "newusercount": 5566,
          "oldusercount": 22257,
          "time": 210
        },
        {
          "newusercount": 5784,
          "oldusercount": 23130,
          "time": 215
        },
        {
          "newusercount": 5927,
          "oldusercount": 23704,
          "time": 220
        },
        {
          "newusercount": 6066,
          "oldusercount": 24263,
          "time": 225
        },
        {
          "newusercount": 5808,
          "oldusercount": 23228,
          "time": 230
        },
        {
          "newusercount": 6069,
          "oldusercount": 24272,
          "time": 235
        },
        {
          "newusercount": 6239,
          "oldusercount": 24955,
          "time": 240
        },
        {
          "newusercount": 6182,
          "oldusercount": 24727,
          "time": 245
        },
        {
          "newusercount": 6487,
          "oldusercount": 25948,
          "time": 250
        },
        {
          "newusercount": 6786,
          "oldusercount": 27145,
          "time": 255
        },
        {
          "newusercount": 6503,
          "oldusercount": 26012,
          "time": 260
        },
        {
          "newusercount": 6438,
          "oldusercount": 25750,
          "time": 265
        },
        {
          "newusercount": 6440,
          "oldusercount": 25759,
          "time": 270
        },
        {
          "newusercount": 6647,
          "oldusercount": 26590,
          "time": 275
        },
        {
          "newusercount": 6481,
          "oldusercount": 25925,
          "time": 280
        },
        {
          "newusercount": 6261,
          "oldusercount": 25045,
          "time": 285
        },
        {
          "newusercount": 6546,
          "oldusercount": 26188,
          "time": 290
        },
        {
          "newusercount": 6455,
          "oldusercount": 25821,
          "time": 295
        },
        {
          "newusercount": 6455,
          "oldusercount": 25818,
          "time": 300
        },
        {
          "newusercount": 6712,
          "oldusercount": 26846,
          "time": 305
        },
        {
          "newusercount": 6937,
          "oldusercount": 27748,
          "time": 310
        },
        {
          "newusercount": 7188,
          "oldusercount": 28754,
          "time": 315
        },
        {
          "newusercount": 7500,
          "oldusercount": 30003,
          "time": 320
        },
        {
          "newusercount": 7196,
          "oldusercount": 28786,
          "time": 325
        },
        {
          "newusercount": 7306,
          "oldusercount": 29227,
          "time": 330
        },
        {
          "newusercount": 7134,
          "oldusercount": 28536,
          "time": 335
        },
        {
          "newusercount": 7425,
          "oldusercount": 29700,
          "time": 340
        },
        {
          "newusercount": 7259,
          "oldusercount": 29035,
          "time": 345
        },
        {
          "newusercount": 7062,
          "oldusercount": 28245,
          "time": 350
        },
        {
          "newusercount": 6853,
          "oldusercount": 27408,
          "time": 355
        },
        {
          "newusercount": 6661,
          "oldusercount": 26638,
          "time": 360
        },
        {
          "newusercount": 6594,
          "oldusercount": 26369,
          "time": 365
        },
        {
          "newusercount": 6775,
          "oldusercount": 27096,
          "time": 370
        },
        {
          "newusercount": 7007,
          "oldusercount": 28027,
          "time": 375
        },
        {
          "newusercount": 6926,
          "oldusercount": 27702,
          "time": 380
        },
        {
          "newusercount": 6934,
          "oldusercount": 27737,
          "time": 385
        },
        {
          "newusercount": 6867,
          "oldusercount": 27469,
          "time": 390
        },
        {
          "newusercount": 7133,
          "oldusercount": 28535,
          "time": 395
        },
        {
          "newusercount": 7322,
          "oldusercount": 29292,
          "time": 400
        },
        {
          "newusercount": 7246,
          "oldusercount": 28987,
          "time": 405
        },
        {
          "newusercount": 7164,
          "oldusercount": 28659,
          "time": 410
        },
        {
          "newusercount": 6955,
          "oldusercount": 27820,
          "time": 415
        },
        {
          "newusercount": 7198,
          "oldusercount": 28795,
          "time": 420
        },
        {
          "newusercount": 7038,
          "oldusercount": 28153,
          "time": 425
        },
        {
          "newusercount": 7376,
          "oldusercount": 29506,
          "time": 430
        },
        {
          "newusercount": 7114,
          "oldusercount": 28457,
          "time": 435
        },
        {
          "newusercount": 7263,
          "oldusercount": 29053,
          "time": 440
        },
        {
          "newusercount": 7424,
          "oldusercount": 29698,
          "time": 445
        },
        {
          "newusercount": 7297,
          "oldusercount": 29188,
          "time": 450
        },
        {
          "newusercount": 7187,
          "oldusercount": 28745,
          "time": 455
        },
        {
          "newusercount": 6877,
          "oldusercount": 27503,
          "time": 460
        },
        {
          "newusercount": 6818,
          "oldusercount": 27266,
          "time": 465
        },
        {
          "newusercount": 6738,
          "oldusercount": 26943,
          "time": 470
        },
        {
          "newusercount": 6977,
          "oldusercount": 27900,
          "time": 475
        },
        {
          "newusercount": 6793,
          "oldusercount": 27163,
          "time": 480
        },
        {
          "newusercount": 6677,
          "oldusercount": 26697,
          "time": 485
        },
        {
          "newusercount": 6812,
          "oldusercount": 27240,
          "time": 490
        },
        {
          "newusercount": 6690,
          "oldusercount": 26751,
          "time": 495
        },
        {
          "newusercount": 6639,
          "oldusercount": 26545,
          "time": 500
        },
        {
          "newusercount": 6688,
          "oldusercount": 26741,
          "time": 505
        },
        {
          "newusercount": 6915,
          "oldusercount": 27652,
          "time": 510
        },
        {
          "newusercount": 7090,
          "oldusercount": 28355,
          "time": 515
        },
        {
          "newusercount": 7161,
          "oldusercount": 28639,
          "time": 520
        },
        {
          "newusercount": 7172,
          "oldusercount": 28685,
          "time": 525
        },
        {
          "newusercount": 6852,
          "oldusercount": 27404,
          "time": 530
        },
        {
          "newusercount": 6981,
          "oldusercount": 27922,
          "time": 535
        },
        {
          "newusercount": 6738,
          "oldusercount": 26947,
          "time": 540
        },
        {
          "newusercount": 6695,
          "oldusercount": 26775,
          "time": 545
        },
        {
          "newusercount": 6730,
          "oldusercount": 26918,
          "time": 550
        },
        {
          "newusercount": 6985,
          "oldusercount": 27941,
          "time": 555
        },
        {
          "newusercount": 6655,
          "oldusercount": 26620,
          "time": 560
        },
        {
          "newusercount": 6570,
          "oldusercount": 26278,
          "time": 565
        },
        {
          "newusercount": 6706,
          "oldusercount": 26822,
          "time": 570
        },
        {
          "newusercount": 6658,
          "oldusercount": 26627,
          "time": 575
        },
        {
          "newusercount": 6677,
          "oldusercount": 26706,
          "time": 580
        },
        {
          "newusercount": 6711,
          "oldusercount": 26844,
          "time": 585
        },
        {
          "newusercount": 6926,
          "oldusercount": 27706,
          "time": 590
        },
        {
          "newusercount": 6751,
          "oldusercount": 27005,
          "time": 595
        },
        {
          "newusercount": 6770,
          "oldusercount": 27084,
          "time": 600
        },
        {
          "newusercount": 6477,
          "oldusercount": 25909,
          "time": 605
        },
        {
          "newusercount": 6698,
          "oldusercount": 26795,
          "time": 610
        },
        {
          "newusercount": 6529,
          "oldusercount": 26116,
          "time": 615
        },
        {
          "newusercount": 6695,
          "oldusercount": 26780,
          "time": 620
        },
        {
          "newusercount": 6453,
          "oldusercount": 25809,
          "time": 625
        },
        {
          "newusercount": 6473,
          "oldusercount": 25892,
          "time": 630
        },
        {
          "newusercount": 6654,
          "oldusercount": 26616,
          "time": 635
        },
        {
          "newusercount": 6860,
          "oldusercount": 27440,
          "time": 640
        },
        {
          "newusercount": 6831,
          "oldusercount": 27324,
          "time": 645
        },
        {
          "newusercount": 6571,
          "oldusercount": 26284,
          "time": 650
        },
        {
          "newusercount": 6333,
          "oldusercount": 25330,
          "time": 655
        },
        {
          "newusercount": 6022,
          "oldusercount": 24086,
          "time": 660
        },
        {
          "newusercount": 5859,
          "oldusercount": 23433,
          "time": 665
        },
        {
          "newusercount": 5879,
          "oldusercount": 23516,
          "time": 670
        },
        {
          "newusercount": 5959,
          "oldusercount": 23837,
          "time": 675
        },
        {
          "newusercount": 5928,
          "oldusercount": 23712,
          "time": 680
        },
        {
          "newusercount": 6173,
          "oldusercount": 24693,
          "time": 685
        },
        {
          "newusercount": 6125,
          "oldusercount": 24498,
          "time": 690
        },
        {
          "newusercount": 6087,
          "oldusercount": 24346,
          "time": 695
        },
        {
          "newusercount": 6284,
          "oldusercount": 25134,
          "time": 700
        },
        {
          "newusercount": 6517,
          "oldusercount": 26068,
          "time": 705
        },
        {
          "newusercount": 6294,
          "oldusercount": 25173,
          "time": 710
        },
        {
          "newusercount": 6555,
          "oldusercount": 26219,
          "time": 715
        },
        {
          "newusercount": 6342,
          "oldusercount": 25366,
          "time": 720
        },
        {
          "newusercount": 6061,
          "oldusercount": 24239,
          "time": 725
        },
        {
          "newusercount": 6286,
          "oldusercount": 25141,
          "time": 730
        },
        {
          "newusercount": 6031,
          "oldusercount": 24120,
          "time": 735
        },
        {
          "newusercount": 6156,
          "oldusercount": 24623,
          "time": 740
        },
        {
          "newusercount": 6071,
          "oldusercount": 24283,
          "time": 745
        },
        {
          "newusercount": 5905,
          "oldusercount": 23619,
          "time": 750
        },
        {
          "newusercount": 6016,
          "oldusercount": 24065,
          "time": 755
        },
        {
          "newusercount": 5963,
          "oldusercount": 23850,
          "time": 760
        },
        {
          "newusercount": 5721,
          "oldusercount": 22880,
          "time": 765
        },
        {
          "newusercount": 5933,
          "oldusercount": 23731,
          "time": 770
        },
        {
          "newusercount": 6024,
          "oldusercount": 24098,
          "time": 775
        },
        {
          "newusercount": 5805,
          "oldusercount": 23221,
          "time": 780
        },
        {
          "newusercount": 6066,
          "oldusercount": 24268,
          "time": 785
        },
        {
          "newusercount": 5868,
          "oldusercount": 23474,
          "time": 790
        },
        {
          "newusercount": 6051,
          "oldusercount": 24208,
          "time": 795
        },
        {
          "newusercount": 5915,
          "oldusercount": 23661,
          "time": 800
        },
        {
          "newusercount": 5742,
          "oldusercount": 22969,
          "time": 805
        },
        {
          "newusercount": 5686,
          "oldusercount": 22745,
          "time": 810
        },
        {
          "newusercount": 5901,
          "oldusercount": 23605,
          "time": 815
        },
        {
          "newusercount": 5645,
          "oldusercount": 22578,
          "time": 820
        },
        {
          "newusercount": 5718,
          "oldusercount": 22873,
          "time": 825
        },
        {
          "newusercount": 5735,
          "oldusercount": 22941,
          "time": 830
        },
        {
          "newusercount": 5741,
          "oldusercount": 22965,
          "time": 835
        },
        {
          "newusercount": 5715,
          "oldusercount": 22859,
          "time": 840
        },
        {
          "newusercount": 5890,
          "oldusercount": 23560,
          "time": 845
        },
        {
          "newusercount": 5779,
          "oldusercount": 23114,
          "time": 850
        },
        {
          "newusercount": 6023,
          "oldusercount": 24092,
          "time": 855
        },
        {
          "newusercount": 6227,
          "oldusercount": 24911,
          "time": 860
        },
        {
          "newusercount": 6206,
          "oldusercount": 24825,
          "time": 865
        },
        {
          "newusercount": 6037,
          "oldusercount": 24146,
          "time": 870
        },
        {
          "newusercount": 6247,
          "oldusercount": 24989,
          "time": 875
        },
        {
          "newusercount": 6110,
          "oldusercount": 24440,
          "time": 880
        },
        {
          "newusercount": 5985,
          "oldusercount": 23937,
          "time": 885
        },
        {
          "newusercount": 6177,
          "oldusercount": 24705,
          "time": 890
        },
        {
          "newusercount": 6048,
          "oldusercount": 24189,
          "time": 895
        },
        {
          "newusercount": 6311,
          "oldusercount": 25242,
          "time": 900
        },
        {
          "newusercount": 6197,
          "oldusercount": 24784,
          "time": 905
        },
        {
          "newusercount": 6268,
          "oldusercount": 25070,
          "time": 910
        },
        {
          "newusercount": 6232,
          "oldusercount": 24924,
          "time": 915
        },
        {
          "newusercount": 6075,
          "oldusercount": 24295,
          "time": 920
        },
        {
          "newusercount": 6262,
          "oldusercount": 25045,
          "time": 925
        },
        {
          "newusercount": 6005,
          "oldusercount": 24016,
          "time": 930
        },
        {
          "newusercount": 5854,
          "oldusercount": 23411,
          "time": 935
        },
        {
          "newusercount": 6081,
          "oldusercount": 24320,
          "time": 940
        },
        {
          "newusercount": 5986,
          "oldusercount": 23937,
          "time": 945
        },
        {
          "newusercount": 5956,
          "oldusercount": 23814,
          "time": 950
        },
        {
          "newusercount": 5907,
          "oldusercount": 23615,
          "time": 955
        },
        {
          "newusercount": 5891,
          "oldusercount": 23550,
          "time": 960
        },
        {
          "newusercount": 6069,
          "oldusercount": 24263,
          "time": 965
        },
        {
          "newusercount": 6096,
          "oldusercount": 24374,
          "time": 970
        },
        {
          "newusercount": 6177,
          "oldusercount": 24699,
          "time": 975
        },
        {
          "newusercount": 5895,
          "oldusercount": 23569,
          "time": 980
        },
        {
          "newusercount": 6161,
          "oldusercount": 24636,
          "time": 985
        },
        {
          "newusercount": 6425,
          "oldusercount": 25694,
          "time": 990
        },
        {
          "newusercount": 6386,
          "oldusercount": 25537,
          "time": 995
        },
        {
          "newusercount": 6636,
          "oldusercount": 26538,
          "time": 1000
        },
        {
          "newusercount": 6531,
          "oldusercount": 26115,
          "time": 1005
        },
        {
          "newusercount": 6581,
          "oldusercount": 26315,
          "time": 1010
        },
        {
          "newusercount": 6856,
          "oldusercount": 27415,
          "time": 1015
        },
        {
          "newusercount": 6958,
          "oldusercount": 27825,
          "time": 1020
        },
        {
          "newusercount": 7199,
          "oldusercount": 28792,
          "time": 1025
        },
        {
          "newusercount": 7046,
          "oldusercount": 28177,
          "time": 1030
        },
        {
          "newusercount": 7064,
          "oldusercount": 28249,
          "time": 1035
        },
        {
          "newusercount": 6984,
          "oldusercount": 27929,
          "time": 1040
        },
        {
          "newusercount": 7028,
          "oldusercount": 28108,
          "time": 1045
        },
        {
          "newusercount": 7189,
          "oldusercount": 28755,
          "time": 1050
        },
        {
          "newusercount": 7247,
          "oldusercount": 28989,
          "time": 1055
        },
        {
          "newusercount": 6904,
          "oldusercount": 27617,
          "time": 1060
        },
        {
          "newusercount": 6575,
          "oldusercount": 26298,
          "time": 1065
        },
        {
          "newusercount": 6735,
          "oldusercount": 26940,
          "time": 1070
        },
        {
          "newusercount": 6481,
          "oldusercount": 25922,
          "time": 1075
        },
        {
          "newusercount": 6357,
          "oldusercount": 25425,
          "time": 1080
        },
        {
          "newusercount": 6450,
          "oldusercount": 25799,
          "time": 1085
        },
        {
          "newusercount": 6472,
          "oldusercount": 25890,
          "time": 1090
        },
        {
          "newusercount": 6665,
          "oldusercount": 26663,
          "time": 1095
        },
        {
          "newusercount": 6739,
          "oldusercount": 26960,
          "time": 1100
        },
        {
          "newusercount": 6469,
          "oldusercount": 25879,
          "time": 1105
        },
        {
          "newusercount": 6220,
          "oldusercount": 24882,
          "time": 1110
        },
        {
          "newusercount": 6078,
          "oldusercount": 24311,
          "time": 1115
        },
        {
          "newusercount": 6226,
          "oldusercount": 24905,
          "time": 1120
        },
        {
          "newusercount": 6104,
          "oldusercount": 24415,
          "time": 1125
        },
        {
          "newusercount": 5869,
          "oldusercount": 23475,
          "time": 1130
        },
        {
          "newusercount": 5762,
          "oldusercount": 23047,
          "time": 1135
        },
        {
          "newusercount": 5791,
          "oldusercount": 23166,
          "time": 1140
        },
        {
          "newusercount": 5680,
          "oldusercount": 22721,
          "time": 1145
        },
        {
          "newusercount": 5936,
          "oldusercount": 23745,
          "time": 1150
        },
        {
          "newusercount": 6086,
          "oldusercount": 24348,
          "time": 1155
        },
        {
          "newusercount": 5989,
          "oldusercount": 23957,
          "time": 1160
        },
        {
          "newusercount": 5768,
          "oldusercount": 23071,
          "time": 1165
        },
        {
          "newusercount": 5751,
          "oldusercount": 23001,
          "time": 1170
        },
        {
          "newusercount": 5583,
          "oldusercount": 22326,
          "time": 1175
        },
        {
          "newusercount": 5663,
          "oldusercount": 22648,
          "time": 1180
        },
        {
          "newusercount": 5612,
          "oldusercount": 22441,
          "time": 1185
        },
        {
          "newusercount": 5806,
          "oldusercount": 23219,
          "time": 1190
        },
        {
          "newusercount": 5697,
          "oldusercount": 22783,
          "time": 1195
        },
        {
          "newusercount": 5438,
          "oldusercount": 21746,
          "time": 1200
        },
        {
          "newusercount": 5544,
          "oldusercount": 22171,
          "time": 1205
        },
        {
          "newusercount": 5617,
          "oldusercount": 22463,
          "time": 1210
        },
        {
          "newusercount": 5635,
          "oldusercount": 22535,
          "time": 1215
        },
        {
          "newusercount": 5902,
          "oldusercount": 23606,
          "time": 1220
        },
        {
          "newusercount": 5896,
          "oldusercount": 23580,
          "time": 1225
        },
        {
          "newusercount": 5974,
          "oldusercount": 23893,
          "time": 1230
        },
        {
          "newusercount": 5800,
          "oldusercount": 23195,
          "time": 1235
        },
        {
          "newusercount": 5993,
          "oldusercount": 23969,
          "time": 1240
        },
        {
          "newusercount": 6027,
          "oldusercount": 24106,
          "time": 1245
        },
        {
          "newusercount": 6046,
          "oldusercount": 24183,
          "time": 1250
        },
        {
          "newusercount": 5933,
          "oldusercount": 23731,
          "time": 1255
        },
        {
          "newusercount": 5710,
          "oldusercount": 22838,
          "time": 1260
        },
        {
          "newusercount": 5427,
          "oldusercount": 21704,
          "time": 1265
        },
        {
          "newusercount": 5673,
          "oldusercount": 22687,
          "time": 1270
        },
        {
          "newusercount": 5523,
          "oldusercount": 22085,
          "time": 1275
        },
        {
          "newusercount": 5629,
          "oldusercount": 22511,
          "time": 1280
        },
        {
          "newusercount": 5890,
          "oldusercount": 23556,
          "time": 1285
        },
        {
          "newusercount": 6071,
          "oldusercount": 24280,
          "time": 1290
        },
        {
          "newusercount": 6050,
          "oldusercount": 24193,
          "time": 1295
        },
        {
          "newusercount": 6307,
          "oldusercount": 25222,
          "time": 1300
        },
        {
          "newusercount": 6479,
          "oldusercount": 25912,
          "time": 1305
        },
        {
          "newusercount": 6438,
          "oldusercount": 25747,
          "time": 1310
        },
        {
          "newusercount": 6256,
          "oldusercount": 25017,
          "time": 1315
        },
        {
          "newusercount": 6365,
          "oldusercount": 25453,
          "time": 1320
        },
        {
          "newusercount": 6388,
          "oldusercount": 25545,
          "time": 1325
        },
        {
          "newusercount": 6397,
          "oldusercount": 25583,
          "time": 1330
        },
        {
          "newusercount": 6652,
          "oldusercount": 26606,
          "time": 1335
        },
        {
          "newusercount": 6674,
          "oldusercount": 26694,
          "time": 1340
        },
        {
          "newusercount": 6534,
          "oldusercount": 26133,
          "time": 1345
        },
        {
          "newusercount": 6371,
          "oldusercount": 25479,
          "time": 1350
        },
        {
          "newusercount": 6061,
          "oldusercount": 24240,
          "time": 1355
        },
        {
          "newusercount": 5996,
          "oldusercount": 23977,
          "time": 1360
        },
        {
          "newusercount": 5850,
          "oldusercount": 23393,
          "time": 1365
        },
        {
          "newusercount": 5678,
          "oldusercount": 22703,
          "time": 1370
        },
        {
          "newusercount": 5946,
          "oldusercount": 23778,
          "time": 1375
        },
        {
          "newusercount": 5690,
          "oldusercount": 22754,
          "time": 1380
        },
        {
          "newusercount": 5686,
          "oldusercount": 22736,
          "time": 1385
        },
        {
          "newusercount": 5898,
          "oldusercount": 23586,
          "time": 1390
        },
        {
          "newusercount": 5898,
          "oldusercount": 23587,
          "time": 1395
        },
        {
          "newusercount": 5715,
          "oldusercount": 22852,
          "time": 1400
        },
        {
          "newusercount": 5612,
          "oldusercount": 22438,
          "time": 1405
        },
        {
          "newusercount": 5598,
          "oldusercount": 22382,
          "time": 1410
        },
        {
          "newusercount": 5542,
          "oldusercount": 22155,
          "time": 1415
        },
        {
          "newusercount": 5484,
          "oldusercount": 21923,
          "time": 1420
        },
        {
          "newusercount": 5754,
          "oldusercount": 23004,
          "time": 1425
        },
        {
          "newusercount": 5925,
          "oldusercount": 23689,
          "time": 1430
        },
        {
          "newusercount": 5768,
          "oldusercount": 23060,
          "time": 1435
        }
      ]
    },
    {
      "date": "2018-08-28",
      "userCountData": [
        {
          "newusercount": 4959,
          "oldusercount": 19833,
          "time": 0
        },
        {
          "newusercount": 4810,
          "oldusercount": 19235,
          "time": 5
        },
        {
          "newusercount": 4676,
          "oldusercount": 18699,
          "time": 10
        },
        {
          "newusercount": 4593,
          "oldusercount": 18367,
          "time": 15
        },
        {
          "newusercount": 4501,
          "oldusercount": 17997,
          "time": 20
        },
        {
          "newusercount": 4656,
          "oldusercount": 18616,
          "time": 25
        },
        {
          "newusercount": 4542,
          "oldusercount": 18157,
          "time": 30
        },
        {
          "newusercount": 4657,
          "oldusercount": 18618,
          "time": 35
        },
        {
          "newusercount": 4793,
          "oldusercount": 19165,
          "time": 40
        },
        {
          "newusercount": 4756,
          "oldusercount": 19015,
          "time": 45
        },
        {
          "newusercount": 4865,
          "oldusercount": 19453,
          "time": 50
        },
        {
          "newusercount": 5047,
          "oldusercount": 20183,
          "time": 55
        },
        {
          "newusercount": 5228,
          "oldusercount": 20907,
          "time": 60
        },
        {
          "newusercount": 5337,
          "oldusercount": 21345,
          "time": 65
        },
        {
          "newusercount": 5145,
          "oldusercount": 20576,
          "time": 70
        },
        {
          "newusercount": 5034,
          "oldusercount": 20131,
          "time": 75
        },
        {
          "newusercount": 5104,
          "oldusercount": 20414,
          "time": 80
        },
        {
          "newusercount": 5186,
          "oldusercount": 20742,
          "time": 85
        },
        {
          "newusercount": 5036,
          "oldusercount": 20140,
          "time": 90
        },
        {
          "newusercount": 5029,
          "oldusercount": 20110,
          "time": 95
        },
        {
          "newusercount": 4960,
          "oldusercount": 19832,
          "time": 100
        },
        {
          "newusercount": 4737,
          "oldusercount": 18938,
          "time": 105
        },
        {
          "newusercount": 4901,
          "oldusercount": 19596,
          "time": 110
        },
        {
          "newusercount": 5080,
          "oldusercount": 20315,
          "time": 115
        },
        {
          "newusercount": 5102,
          "oldusercount": 20406,
          "time": 120
        },
        {
          "newusercount": 5079,
          "oldusercount": 20313,
          "time": 125
        },
        {
          "newusercount": 5192,
          "oldusercount": 20767,
          "time": 130
        },
        {
          "newusercount": 5111,
          "oldusercount": 20441,
          "time": 135
        },
        {
          "newusercount": 5207,
          "oldusercount": 20826,
          "time": 140
        },
        {
          "newusercount": 5221,
          "oldusercount": 20885,
          "time": 145
        },
        {
          "newusercount": 5053,
          "oldusercount": 20212,
          "time": 150
        },
        {
          "newusercount": 5018,
          "oldusercount": 20070,
          "time": 155
        },
        {
          "newusercount": 4866,
          "oldusercount": 19459,
          "time": 160
        },
        {
          "newusercount": 4638,
          "oldusercount": 18548,
          "time": 165
        },
        {
          "newusercount": 4587,
          "oldusercount": 18342,
          "time": 170
        },
        {
          "newusercount": 4753,
          "oldusercount": 19006,
          "time": 175
        },
        {
          "newusercount": 4882,
          "oldusercount": 19522,
          "time": 180
        },
        {
          "newusercount": 5082,
          "oldusercount": 20322,
          "time": 185
        },
        {
          "newusercount": 4879,
          "oldusercount": 19510,
          "time": 190
        },
        {
          "newusercount": 4982,
          "oldusercount": 19924,
          "time": 195
        },
        {
          "newusercount": 5039,
          "oldusercount": 20153,
          "time": 200
        },
        {
          "newusercount": 4981,
          "oldusercount": 19921,
          "time": 205
        },
        {
          "newusercount": 4899,
          "oldusercount": 19593,
          "time": 210
        },
        {
          "newusercount": 5130,
          "oldusercount": 20520,
          "time": 215
        },
        {
          "newusercount": 4877,
          "oldusercount": 19506,
          "time": 220
        },
        {
          "newusercount": 4968,
          "oldusercount": 19872,
          "time": 225
        },
        {
          "newusercount": 4782,
          "oldusercount": 19127,
          "time": 230
        },
        {
          "newusercount": 4831,
          "oldusercount": 19324,
          "time": 235
        },
        {
          "newusercount": 4969,
          "oldusercount": 19879,
          "time": 240
        },
        {
          "newusercount": 4916,
          "oldusercount": 19666,
          "time": 245
        },
        {
          "newusercount": 4688,
          "oldusercount": 18751,
          "time": 250
        },
        {
          "newusercount": 4521,
          "oldusercount": 18080,
          "time": 255
        },
        {
          "newusercount": 4611,
          "oldusercount": 18442,
          "time": 260
        },
        {
          "newusercount": 4587,
          "oldusercount": 18345,
          "time": 265
        },
        {
          "newusercount": 4401,
          "oldusercount": 17598,
          "time": 270
        },
        {
          "newusercount": 4437,
          "oldusercount": 17744,
          "time": 275
        },
        {
          "newusercount": 4466,
          "oldusercount": 17863,
          "time": 280
        },
        {
          "newusercount": 4486,
          "oldusercount": 17946,
          "time": 285
        },
        {
          "newusercount": 4642,
          "oldusercount": 18573,
          "time": 290
        },
        {
          "newusercount": 4785,
          "oldusercount": 19146,
          "time": 295
        },
        {
          "newusercount": 4979,
          "oldusercount": 19924,
          "time": 300
        },
        {
          "newusercount": 4808,
          "oldusercount": 19240,
          "time": 305
        },
        {
          "newusercount": 4730,
          "oldusercount": 18925,
          "time": 310
        },
        {
          "newusercount": 4853,
          "oldusercount": 19417,
          "time": 315
        },
        {
          "newusercount": 4705,
          "oldusercount": 18824,
          "time": 320
        },
        {
          "newusercount": 4499,
          "oldusercount": 17998,
          "time": 325
        },
        {
          "newusercount": 4687,
          "oldusercount": 18751,
          "time": 330
        },
        {
          "newusercount": 4640,
          "oldusercount": 18560,
          "time": 335
        },
        {
          "newusercount": 4818,
          "oldusercount": 19274,
          "time": 340
        },
        {
          "newusercount": 4955,
          "oldusercount": 19823,
          "time": 345
        },
        {
          "newusercount": 4727,
          "oldusercount": 18910,
          "time": 350
        },
        {
          "newusercount": 4837,
          "oldusercount": 19351,
          "time": 355
        },
        {
          "newusercount": 4716,
          "oldusercount": 18864,
          "time": 360
        },
        {
          "newusercount": 4724,
          "oldusercount": 18897,
          "time": 365
        },
        {
          "newusercount": 4849,
          "oldusercount": 19397,
          "time": 370
        },
        {
          "newusercount": 4980,
          "oldusercount": 19922,
          "time": 375
        },
        {
          "newusercount": 4841,
          "oldusercount": 19365,
          "time": 380
        },
        {
          "newusercount": 4784,
          "oldusercount": 19135,
          "time": 385
        },
        {
          "newusercount": 4966,
          "oldusercount": 19865,
          "time": 390
        },
        {
          "newusercount": 4841,
          "oldusercount": 19365,
          "time": 395
        },
        {
          "newusercount": 4652,
          "oldusercount": 18607,
          "time": 400
        },
        {
          "newusercount": 4492,
          "oldusercount": 17966,
          "time": 405
        },
        {
          "newusercount": 4375,
          "oldusercount": 17495,
          "time": 410
        },
        {
          "newusercount": 4259,
          "oldusercount": 17031,
          "time": 415
        },
        {
          "newusercount": 4399,
          "oldusercount": 17592,
          "time": 420
        },
        {
          "newusercount": 4466,
          "oldusercount": 17860,
          "time": 425
        },
        {
          "newusercount": 4599,
          "oldusercount": 18392,
          "time": 430
        },
        {
          "newusercount": 4775,
          "oldusercount": 19097,
          "time": 435
        },
        {
          "newusercount": 4593,
          "oldusercount": 18367,
          "time": 440
        },
        {
          "newusercount": 4743,
          "oldusercount": 18968,
          "time": 445
        },
        {
          "newusercount": 4888,
          "oldusercount": 19551,
          "time": 450
        },
        {
          "newusercount": 5090,
          "oldusercount": 20360,
          "time": 455
        },
        {
          "newusercount": 4929,
          "oldusercount": 19715,
          "time": 460
        },
        {
          "newusercount": 4983,
          "oldusercount": 19934,
          "time": 465
        },
        {
          "newusercount": 4819,
          "oldusercount": 19277,
          "time": 470
        },
        {
          "newusercount": 4599,
          "oldusercount": 18394,
          "time": 475
        },
        {
          "newusercount": 4421,
          "oldusercount": 17681,
          "time": 480
        },
        {
          "newusercount": 4338,
          "oldusercount": 17348,
          "time": 485
        },
        {
          "newusercount": 4371,
          "oldusercount": 17482,
          "time": 490
        },
        {
          "newusercount": 4364,
          "oldusercount": 17451,
          "time": 495
        },
        {
          "newusercount": 4371,
          "oldusercount": 17480,
          "time": 500
        },
        {
          "newusercount": 4224,
          "oldusercount": 16892,
          "time": 505
        },
        {
          "newusercount": 4140,
          "oldusercount": 16556,
          "time": 510
        },
        {
          "newusercount": 4069,
          "oldusercount": 16271,
          "time": 515
        },
        {
          "newusercount": 3884,
          "oldusercount": 15528,
          "time": 520
        },
        {
          "newusercount": 3852,
          "oldusercount": 15400,
          "time": 525
        },
        {
          "newusercount": 4032,
          "oldusercount": 16120,
          "time": 530
        },
        {
          "newusercount": 4061,
          "oldusercount": 16237,
          "time": 535
        },
        {
          "newusercount": 3942,
          "oldusercount": 15760,
          "time": 540
        },
        {
          "newusercount": 3798,
          "oldusercount": 15185,
          "time": 545
        },
        {
          "newusercount": 3872,
          "oldusercount": 15483,
          "time": 550
        },
        {
          "newusercount": 3700,
          "oldusercount": 14794,
          "time": 555
        },
        {
          "newusercount": 3741,
          "oldusercount": 14958,
          "time": 560
        },
        {
          "newusercount": 3860,
          "oldusercount": 15436,
          "time": 565
        },
        {
          "newusercount": 4014,
          "oldusercount": 16052,
          "time": 570
        },
        {
          "newusercount": 4139,
          "oldusercount": 16555,
          "time": 575
        },
        {
          "newusercount": 4340,
          "oldusercount": 17360,
          "time": 580
        },
        {
          "newusercount": 4152,
          "oldusercount": 16607,
          "time": 585
        },
        {
          "newusercount": 4238,
          "oldusercount": 16951,
          "time": 590
        },
        {
          "newusercount": 4359,
          "oldusercount": 17436,
          "time": 595
        },
        {
          "newusercount": 4449,
          "oldusercount": 17796,
          "time": 600
        },
        {
          "newusercount": 4514,
          "oldusercount": 18056,
          "time": 605
        },
        {
          "newusercount": 4410,
          "oldusercount": 17639,
          "time": 610
        },
        {
          "newusercount": 4575,
          "oldusercount": 18299,
          "time": 615
        },
        {
          "newusercount": 4420,
          "oldusercount": 17679,
          "time": 620
        },
        {
          "newusercount": 4393,
          "oldusercount": 17571,
          "time": 625
        },
        {
          "newusercount": 4307,
          "oldusercount": 17227,
          "time": 630
        },
        {
          "newusercount": 4465,
          "oldusercount": 17861,
          "time": 635
        },
        {
          "newusercount": 4276,
          "oldusercount": 17103,
          "time": 640
        },
        {
          "newusercount": 4313,
          "oldusercount": 17254,
          "time": 645
        },
        {
          "newusercount": 4492,
          "oldusercount": 17972,
          "time": 650
        },
        {
          "newusercount": 4491,
          "oldusercount": 17968,
          "time": 655
        },
        {
          "newusercount": 4388,
          "oldusercount": 17552,
          "time": 660
        },
        {
          "newusercount": 4201,
          "oldusercount": 16802,
          "time": 665
        },
        {
          "newusercount": 4345,
          "oldusercount": 17381,
          "time": 670
        },
        {
          "newusercount": 4363,
          "oldusercount": 17453,
          "time": 675
        },
        {
          "newusercount": 4206,
          "oldusercount": 16823,
          "time": 680
        },
        {
          "newusercount": 3997,
          "oldusercount": 15987,
          "time": 685
        },
        {
          "newusercount": 4090,
          "oldusercount": 16360,
          "time": 690
        },
        {
          "newusercount": 3927,
          "oldusercount": 15708,
          "time": 695
        },
        {
          "newusercount": 4063,
          "oldusercount": 16255,
          "time": 700
        },
        {
          "newusercount": 3881,
          "oldusercount": 15527,
          "time": 705
        },
        {
          "newusercount": 3801,
          "oldusercount": 15204,
          "time": 710
        },
        {
          "newusercount": 3912,
          "oldusercount": 15650,
          "time": 715
        },
        {
          "newusercount": 3798,
          "oldusercount": 15193,
          "time": 720
        },
        {
          "newusercount": 3761,
          "oldusercount": 15042,
          "time": 725
        },
        {
          "newusercount": 3686,
          "oldusercount": 14741,
          "time": 730
        },
        {
          "newusercount": 3553,
          "oldusercount": 14208,
          "time": 735
        },
        {
          "newusercount": 3633,
          "oldusercount": 14528,
          "time": 740
        },
        {
          "newusercount": 3635,
          "oldusercount": 14539,
          "time": 745
        },
        {
          "newusercount": 3642,
          "oldusercount": 14570,
          "time": 750
        },
        {
          "newusercount": 3493,
          "oldusercount": 13971,
          "time": 755
        },
        {
          "newusercount": 3367,
          "oldusercount": 13467,
          "time": 760
        },
        {
          "newusercount": 3287,
          "oldusercount": 13146,
          "time": 765
        },
        {
          "newusercount": 3348,
          "oldusercount": 13393,
          "time": 770
        },
        {
          "newusercount": 3315,
          "oldusercount": 13260,
          "time": 775
        },
        {
          "newusercount": 3288,
          "oldusercount": 13152,
          "time": 780
        },
        {
          "newusercount": 3444,
          "oldusercount": 13779,
          "time": 785
        },
        {
          "newusercount": 3399,
          "oldusercount": 13597,
          "time": 790
        },
        {
          "newusercount": 3563,
          "oldusercount": 14254,
          "time": 795
        },
        {
          "newusercount": 3734,
          "oldusercount": 14939,
          "time": 800
        },
        {
          "newusercount": 3857,
          "oldusercount": 15431,
          "time": 805
        },
        {
          "newusercount": 3763,
          "oldusercount": 15053,
          "time": 810
        },
        {
          "newusercount": 3786,
          "oldusercount": 15148,
          "time": 815
        },
        {
          "newusercount": 3890,
          "oldusercount": 15566,
          "time": 820
        },
        {
          "newusercount": 3781,
          "oldusercount": 15126,
          "time": 825
        },
        {
          "newusercount": 3881,
          "oldusercount": 15526,
          "time": 830
        },
        {
          "newusercount": 3917,
          "oldusercount": 15670,
          "time": 835
        },
        {
          "newusercount": 3938,
          "oldusercount": 15755,
          "time": 840
        },
        {
          "newusercount": 4102,
          "oldusercount": 16413,
          "time": 845
        },
        {
          "newusercount": 3967,
          "oldusercount": 15871,
          "time": 850
        },
        {
          "newusercount": 4077,
          "oldusercount": 16313,
          "time": 855
        },
        {
          "newusercount": 4093,
          "oldusercount": 16378,
          "time": 860
        },
        {
          "newusercount": 3985,
          "oldusercount": 15945,
          "time": 865
        },
        {
          "newusercount": 3829,
          "oldusercount": 15319,
          "time": 870
        },
        {
          "newusercount": 3665,
          "oldusercount": 14663,
          "time": 875
        },
        {
          "newusercount": 3826,
          "oldusercount": 15310,
          "time": 880
        },
        {
          "newusercount": 3886,
          "oldusercount": 15552,
          "time": 885
        },
        {
          "newusercount": 4071,
          "oldusercount": 16295,
          "time": 890
        },
        {
          "newusercount": 4231,
          "oldusercount": 16937,
          "time": 895
        }
      ]
    }
  ]

  public usercountbyeventsData: Array<UserCountByEventTimeSeries> = [

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

  public samepleusersbyevent: Array<string> = []

  public eventcountData: Array<EventCount> = [
    {
      usercount: 12050,
      eventcount: 23866,
      name: "Android"
    },
    {
      usercount: 9000,
      eventcount: 5000,
      name: "Ios"
    },
    {
      usercount: 12990,
      eventcount: 25006,
      name: "Window"
    },
    {
      usercount: 90000,
      eventcount: 50000,
      name: "Linux"
    }
  ]
  public trendBytimePeriodData: Array<EventPeriodCount> = [
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
      "usercount": 30000
    },
    {
      "eventcount": 30000,
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
  public eventUserTrendData: Array<EventUserFrequency> = [
    {
      eventcount: 1,
      usercount: 12000
    },
    {
      eventcount: 2,
      usercount: 12000
    },
    {
      eventcount: 3,
      usercount: 1000
    },
    {
      eventcount: 4,
      usercount: 800
    },
    {
      eventcount: 5,
      usercount: 1200
    },
    {
      eventcount: 6,
      usercount: 100
    },

    {
      eventcount: 7,
      usercount: 80
    },
    {
      eventcount: 8,
      usercount: 120
    },
    {
      eventcount: 9,
      usercount: 10
    }
  ]

  public eventTimeTrend: Array<EventTimeFrequency> = [
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
