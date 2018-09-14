import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-eventreport',
  templateUrl: './eventreport.component.html',
  styleUrls: ['./eventreport.component.scss']
})
export class EventreportComponent implements OnInit {

  eventName: string = "Add to Cart";

  segmentId:string;
  events:string[]=['Add to cart','Search','View'];
  segments:any[]=[{id:1,name:"Segment 1"},{id:2,name:"Segment 2"},{id:3,name:"Segment 3"},{id:4,name:"Segment 4"},{id:5,name:"Segment 5"}];

  constructor() {}

  ngOnInit() {}
}
