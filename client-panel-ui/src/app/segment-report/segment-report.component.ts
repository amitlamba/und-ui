import {Component, OnInit} from '@angular/core';
import * as moment from "moment";
import {Segment} from "../_models/segment";
import {SegmentService} from "../_services/segment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ChartSeriesData, Reachability} from "../_models/reports";
import {ReportsService} from "../_services/reports.service";
import {Campaign} from "../_models/campaign";

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
  reachability: Reachability;
  associatedCampaigns: Campaign[];
  segmentChart:SegmentChartModel;

  segmentsDropdown: any[] = []; //id and text

  toDate=moment().format("YYYY-MM-DD");
  fromDate=moment().subtract(30,'day').format("YYYY-MM-DD");

  constructor(private activatedRoute: ActivatedRoute, private segmentService: SegmentService,
              private reportsService: ReportsService,
              private router: Router) {
  }

  ngOnInit() {
    this.segmentChart=new SegmentChartModel();
    this.segmentId = this.activatedRoute.snapshot.queryParams['sid'];
    this.segmentService.getSegments().subscribe(response => {
      this.segments = response;
      this.segment = this._segments.find(v=>{
        return v.id == this.segmentId;
      });
      if (this.segmentId) {
        this.getReachability(this.segmentId);
        this.getAssociatedCampaigns(this.segmentId);
        this.getSegmentTrendOverTime(this.segmentId,this.fromDate,this.toDate);
      }
    });
  }

  private getReachability(segmentId: number) {
    console.log("recgability called");
    this.reportsService.getSegmentReachability(segmentId).subscribe(
      response => {
        this.reachability = response;
      }
    );
  }

  private getAssociatedCampaigns(segmentId: number) {
    this.reportsService.getAssociatedCampaigns(this.segmentId).subscribe(
      response => {
        console.log(response);
        this.associatedCampaigns = response;
      }
    );
  }

  private getSegmentTrendOverTime(segmentId:number,startDate:string,endDate:string){
    this.reportsService.getSegmentTrendReport(segmentId,startDate,endDate).subscribe(
      (value => {
      this.segmentChart.category=value.map<string>(value =>
          value.date.substr(0,4)+"-"+value.date.substr(4,2)+"-"+value.date.substr(6,2)
      );
      this.segmentChart.dataSeries=[{
        showInLegend:false,
        seriesName:"Users",
        data: value.map(value => value.count)
      }];
    }
    ),
      (error) =>{
        console.log(error)
      }
    )
  }


  public multiPicker = {
    singleDatePicker: false,
    showDropdowns: true,
    opens: "center",
    startDate: moment(this.fromDate),
    endDate: moment(this.toDate),
    ranges: {
      "Today": [moment(), moment().add("0", "day")],
      "Yesterday": [moment().subtract("1", "day"), moment().subtract("1","day")],
      "Last 7 Days": [moment().subtract("7", "day"), moment().subtract("1","day")],
      "Last 30 Days": [moment().subtract("30", "day"), moment().subtract("1","day")],
      "Last Month": [moment().subtract("1", "month").subtract(moment().date() - 1, "day"), moment().subtract(moment().date(), "day")],
    }
  };

  selectedDate(event) {
    this.fromDate = (event.start).format("YYYY-MM-DD");
    this.toDate = (event.end).format("YYYY-MM-DD");
    if(this.segmentId){
      this.getSegmentTrendOverTime(this.segmentId,this.fromDate,this.toDate);
    }
    //re render reports
  }

  segmentChange(segmentDropdownSelected: any) {
    console.log(segmentDropdownSelected);
    this.segmentId = segmentDropdownSelected.value;
    this.segment = this._segments.find(v=>{return v.id == this.segmentId});
    if (this.segmentId) {
      this.getReachability(this.segmentId);
      this.getAssociatedCampaigns(this.segmentId);
      this.getSegmentTrendOverTime(this.segmentId,this.fromDate,this.toDate);
    }
    //re render reports
  }

  createCampaign(campaignType: string) {
    this.router.navigate(['/campaigns/'+campaignType],{queryParams: {sid: this.segmentId}});
  }
}

export class SegmentChartModel {
  title:string='';
  subTitle:string='';
  xAxisTitle:string='';
  yAxisTitle:string='';
  graphType:string='line';
  category:string[];
  dataSeries:ChartSeriesData[]=[];
}
