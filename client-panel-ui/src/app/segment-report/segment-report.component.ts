import {Component, OnInit} from '@angular/core';
import {moment} from "ngx-bootstrap/chronos/test/chain";
import {Segment} from "../_models/segment";
import {SegmentService} from "../_services/segment.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-segment-report',
  templateUrl: './segment-report.component.html',
  styleUrls: ['./segment-report.component.scss']
})
export class SegmentReportComponent implements OnInit {

  private select2Options: Select2Options = {
    placeholder: "Select option...",
    allowClear: true,
    width: "100%"
  };

  private _segments: Segment[];
  set segments(value: Segment[]) {
    this._segments = value;
    this.segmentsDropdown = [{id: -1, text: "--Select Segment--"}];
    this.segmentsDropdown.push(...this._segments.map(v=>{return {id: v.id, text: v.name}}));
  }

  segment: Segment;
  segmentId: number;

  segmentsDropdown: any[] = []; //id and text

  fromDate: string;
  toDate: string;

  constructor(private activatedRoute: ActivatedRoute, private segmentService: SegmentService,
              private router: Router) {
  }

  ngOnInit() {
    this.segmentId = this.activatedRoute.snapshot.queryParams['sid'];
    this.segmentService.getSegments().subscribe(response => {
      this.segments = response;
      this.segment = this._segments.find(v=>{
        return v.id == this.segmentId;
      });
    });
  }

  public multiPicker = {
    singleDatePicker: false,
    showDropdowns: true,
    opens: "center",
    startDate: moment(this.fromDate),
    endDate: moment(this.toDate),
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
    //re render reports
  }

  segmentChange(segmentDropdownSelected: any) {
    console.log(segmentDropdownSelected);
    this.segmentId = segmentDropdownSelected.value;
    this.segment = this._segments.find(v=>{return v.id == this.segmentId});
    //re render reports
  }

  createCampaign(campaignType: string) {
    this.router.navigate(['/campaigns/email'],{queryParams: {sid: this.segmentId}});
  }
}
