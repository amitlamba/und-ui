import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {EventUserTable, UserCountByEventForDate, UserCountByEventTimeSeries} from "../../_models/reports";

@Component({
  selector: 'app-draw-table',
  templateUrl: './draw-table.component.html',
  styleUrls: ['./draw-table.component.scss']
})
export class DrawTableComponent implements OnInit ,OnChanges{

  @Input() eventUserData:Array<UserCountByEventForDate>;

  eventUserTableData:Array<EventUserTable> = [];

  @Input() newdata:Map<string,number[]>;

  events:string[]=[];
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(){
    // this.initializeTable();
    this.newInitialization1();
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
  newInitialization1(){
    var map=this.newdata;
    var key=map.keys();
    var obj=key.next();
    while(obj){
      this.events.push(obj.value);
      obj=key.next();
    }

    this.events.forEach(data=>console.log("key are"+data));

  }
}
