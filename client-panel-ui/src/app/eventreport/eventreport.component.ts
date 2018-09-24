import {Component, DoCheck, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Params} from "@angular/router";
import {moment} from "ngx-bootstrap/chronos/test/chain";

@Component({
  selector: 'app-eventreport',
  templateUrl: './eventreport.component.html',
  styleUrls: ['./eventreport.component.scss']
})
export class EventreportComponent implements OnInit ,OnChanges,DoCheck{

  button:string='overall';
  eventName: string;
  segmentId:number;
  fromDate:string;
  toDate:string;

  events:string[]=[
    "Search",
    "View",
    "Support",
    "Add to WishList",
    "Check Review",
    "Search Category",
    "Ask Question",
    "Add to Cart"]

  segments:any[]=[{id:1,name:"Segment 1"},{id:2,name:"Segment 2"},{id:3,name:"Segment 3"},{id:4,name:"Segment 4"},{id:5,name:"Segment 5"}];


  constructor(private route:ActivatedRoute) {
    this.route.queryParams.subscribe(
      (params:Params)=>{
        this.eventName=params['event'];
      }
    );
    this.segmentId=1003;
    var date=new Date();
    var day=date.getDate();
    var month=date.getMonth()+1;
    var year=date.getFullYear();
    this.toDate=(year+'-'+('0'+month).slice(-2)+'-'+('0'+day).slice(-2));
    date.setDate(date.getDate()-30);
    day=date.getDate();
    month=date.getMonth()+1;
    year=date.getFullYear();
    this.fromDate=(year+'-'+('0'+month).slice(-2)+'-'+('0'+day).slice(-2));
  }

  ngOnInit() {

  }

  ngOnChanges(){
    console.log(this.fromDate);
    console.log(this.toDate);
  }
  ngDoCheck(){

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
  }
  buttonClick(button:string){
    this.button=button;
  }
}
