import {Component, DoCheck, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Params} from "@angular/router";
import {moment} from "ngx-bootstrap/chronos/test/chain";
import {SegmentService} from "../_services/segment.service";
import {GlobalFilter, GlobalFilterType, RegisteredEvent, Segment} from "../_models/segment";

@Component({
  selector: 'app-eventreport',
  templateUrl: './eventreport.component.html',
  styleUrls: ['./eventreport.component.scss']
})
export class EventreportComponent implements OnInit, OnChanges, DoCheck {

  button: string = 'overall';
  eventName: string = "";
  private _segmentId: number;
  fromDate: string;
  toDate: string;
  public multiPicker: any;
/*
globalFilterType: GlobalFilterType;
  name: string;
  type: string;
  operator: string;
  values: any[] = [];
  valueUnit: string;
  {
    globalFilterType: GlobalFilterType.Demographics,
    type:
    name: 'gender',
    operator: 'Equals',
    values: ['Male']
  }
 */

  // filterList = [
  //   {"globalFilterType": "Technographics", "name": "os", "operator": "Contains", "values": ["Linux", "Window"]},
  //   // {"globalFilterType": "EventAttributeProperties", "name": "Item", "operator": "Equals", "values": ["Laptop"]}
  // ];
  filterList: GlobalFilter[] = [
    // {
    //   globalFilterType: GlobalFilterType.Technographics,
    //   type: 'string',
    //   name: 'os',
    //   operator: 'Contains',
    //   values: ['Linux'],
    //   valueUnit: "NONE"}
  ];
    // },
    // {
    //   globalFilterType: GlobalFilterType.Demographics,
    //   type: 'string',
    //   name: 'gender',
    //   operator: 'Contains',
    //   values: ['Male'],
    //   valueUnit: "NONE"
    // }];

  segment: Segment;

  events: RegisteredEvent[] = [];

  segments: any[] = [];

  get segmentId(): number {
    return this._segmentId;
  }

  set segmentId(value: number) {
    this._segmentId = value;
    this.getSegmentById();
  }


  constructor(private route: ActivatedRoute, private segmentService: SegmentService) {
    // this.route.queryParams.subscribe(
    //   (params: Params) => {
    //     if (params && params['event'])
    //       this.eventName = params['event'];
    //     if (params && params['date']) {
    //       this.fromDate = this.toDate = params['date'];
    //     }
    //   }
    // );
    this.eventName = this.route.snapshot.queryParams['event'];
    this.fromDate = this.toDate = this.route.snapshot.queryParams['date'];
    this.events = this.segmentService.cachedRegisteredEvents;
    this.segments = this.segmentService.segmentMini;
    this._segmentId = -1;
    var date = new Date();
    if(!this.toDate) {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      this.toDate = (year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2));
    }
    if(!this.fromDate) {
      date.setDate(date.getDate() - 30);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      this.fromDate = (year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2));
    }
  }

  ngOnInit() {
    this.getSegmentById();
    this.initMultipicker();
    console.log(this.fromDate);
    console.log(this.toDate);
    console.log(moment(this.fromDate));
    console.log(moment(this.toDate));
  }

  private getSegmentById() {
    if(this._segmentId > 0) {
      this.segmentService.getSegmentById(this._segmentId).subscribe(
        (segment) => {
          this.segment = segment;
        }
      );
    } else {
      this.segment = null;
    }
  }

  ngOnChanges() {
    console.log(this.fromDate);
    console.log(this.toDate);
  }

  ngDoCheck() {

  }

  initMultipicker() {
    this.multiPicker = {
      singleDatePicker: false,
      showDropdowns: true,
      opens: "center",
      startDate: this.fromDate,
      endDate: this.toDate,
      ranges: {
        "Today": [moment(), moment().add("1", "day")],
        "Yesterday": [moment().subtract("1", "day"), moment()],
        "Last 7 Days": [moment().subtract("7", "day"), moment()],
        "Last 30 Days": [moment().subtract("30", "day"), moment()],
        "Last Month": [moment().subtract("1", "month").subtract(moment().date() - 1, "day"), moment().subtract(moment().date() - 1, "day")],
      },
      locale: {
        format: "YYYY-MM-DD"
      }
    };
  }


  selectedDate(event) {
    this.fromDate = (event.start).format("YYYY-MM-DD");
    this.toDate = (event.end).format("YYYY-MM-DD");
  }

  buttonClick(button: string) {
    this.button = button;
  }

  onClearGlobalFilters() {
    this.filterList = [];
  }
}
