import { Component, OnInit } from '@angular/core';
import {moment} from "ngx-bootstrap/chronos/test/chain";
import {Segment} from "../_models/segment";
import {SegmentService} from "../_services/segment.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-segment-report',
  templateUrl: './segment-report.component.html',
  styleUrls: ['./segment-report.component.scss']
})
export class SegmentReportComponent implements OnInit {

  segments:Segment[];
  segment:Segment;
  fromDate:string;
  toDate:string;

  constructor(private activatedRoute:ActivatedRoute,private segmentService:SegmentService) {
    // take segment
    let segmentName=activatedRoute.snapshot.params['name'];
    segmentService.getSegments().subscribe(response=>{
      this.segments=response;
    });
  }

  ngOnInit() {
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

  selectedDate(event){
    this.fromDate = (event.start).format("YYYY-MM-DD");
    this.toDate = (event.end).format("YYYY-MM-DD");
    //re render reports
  }
  segmentChange(segment:Segment){
    this.segment=segment;
    //re render reports
  }
}
