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
  segmentId: number;
  fromDate: string;
  toDate: string;
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
    {
      globalFilterType: GlobalFilterType.Technographics,
      type: 'string',
      name: 'os',
      operator: 'Contains',
      values: ['Linux'],
      valueUnit: "NONE"}];
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

  segments: any[] = [{id: 1, name: "Segment 1"}, {id: 2, name: "Segment 2"}, {id: 3, name: "Segment 3"}, {
    id: 4,
    name: "Segment 4"
  }, {id: 5, name: "Segment 5"}];


  constructor(private route: ActivatedRoute, private segmentService: SegmentService) {
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params && params['event'])
          this.eventName = params['event'];
      }
    );
    this.events = this.segmentService.cachedRegisteredEvents;
    this.segments = this.segmentService.segmentMini;
    this.segmentId = 1003;
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    this.toDate = (year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2));
    date.setDate(date.getDate() - 30);
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    this.fromDate = (year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2));
  }

  ngOnInit() {
    this.getSegmentById();
  }

  private getSegmentById() {
    this.segmentService.getSegmentById(this.segmentId).subscribe(
      (segment) => {
        this.segment = segment;
      }
    );
  }

  ngOnChanges() {
    console.log(this.fromDate);
    console.log(this.toDate);
  }

  ngDoCheck() {

  }

  public multiPicker = {
    singleDatePicker: false,
    showDropdowns: true,
    opens: "center",
    startDate: moment(),
    endDate: moment(),
    ranges: {
      "Today": [moment(), moment().add("1", "day")],
      "Yesterday": [moment().subtract("1", "day"), moment()],
      "Last 7 Days": [moment().subtract("7", "day"), moment()],
      "Last 30 Days": [moment().subtract("30", "day"), moment()],
      "Last Month": [moment().subtract("1", "month").subtract(moment().date() - 1, "day"), moment().subtract(moment().date() - 1, "day")],
    }
  };

  selectedDate(event) {
    this.fromDate = (event.start).format("YYYY-MM-DD");
    this.toDate = (event.end).format("YYYY-MM-DD");
  }

  buttonClick(button: string) {
    this.button = button;
  }
}
