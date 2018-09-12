import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {EventUserTable, UserCountByEventTimeSeries} from "../../_models/reports";

@Component({
  selector: 'app-draw-table',
  templateUrl: './draw-table.component.html',
  styleUrls: ['./draw-table.component.scss']
})
export class DrawTableComponent implements OnInit ,OnChanges{

  @Input() eventUserData:Array<UserCountByEventTimeSeries>;

  eventUserTableData:Array<EventUserTable> = [];

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(){
    this.initializeTable()
  }
  initializeTable(){
    var length=this.eventUserData[0].userCountData.length
    console.log(length)
    var i=0
    for(;i<length;i++){
      var tabledata=new EventUserTable();
      var j=0
      for(;j<this.eventUserData.length;j++){
        if(j==0){
          tabledata.eventName=this.eventUserData[j].userCountData[i].eventname
        }
        tabledata.count[j]=this.eventUserData[j].userCountData[i].usercount
      }
      this.eventUserTableData.push(tabledata)
    }
  }
}
