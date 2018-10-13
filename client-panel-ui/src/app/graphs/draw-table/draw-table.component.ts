import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {EventUserTable, UserCountByEventForDate, UserCountByEventTimeSeries} from "../../_models/reports";

@Component({
  selector: 'app-draw-table',
  templateUrl: './draw-table.component.html',
  styleUrls: ['./draw-table.component.scss']
})
export class DrawTableComponent implements OnInit ,OnChanges{

  @Input() eventUserData:Array<UserCountByEventForDate>;

   eventName:string[];
   dates:string[];
   data:number[][];

  constructor() {
  }

  ngOnInit() {


  }

  ngOnChanges(){
    this.initializeTable();
    // this.newInitialization1();
  }
  initializeTable(){
    // var length=this.eventUserData[0].userCountData.length
    // console.log(length)
    // var i=0
    // for(;i<length;i++){
    //   var tabledata=new EventUserTable();
    //   var j=0
    //   for(;j<this.eventUserData.length;j++){
    //     if(j==0){
    //       tabledata.eventName=this.eventUserData[j].userCountData[i].eventname
    //     }
    //     tabledata.count[j]=this.eventUserData[j].userCountData[i].usercount
    //   }
    //   this.eventUserTableData.push(tabledata)
    // }


    var dates=this.eventUserData.map(data=>data.date);
    var cat=new Set();

    this.eventUserData.forEach(data=>data.userCountData.
    forEach(data=>{
      cat.add(data.eventname)
    }));

    let newcat=new Array();
    cat.forEach(v=>newcat.push(v));
    this.eventName=newcat;
    this.dates=dates;


    this.data=new Array(this.eventName.length);
    for(let i=0;i<this.eventName.length;i++){
      this.data[i]=[];
      for(let j=0;j<this.dates.length;j++){
        this.data[i][j]=0;
      }
    }

    this.eventUserData.forEach((v,i)=>{
      v.userCountData.forEach((nv)=>{
        let index=newcat.indexOf(nv.eventname);
        this.data[index][i]=nv.usercount;
      })
    });

  }
  newInitialization1(){
    // var map=this.newdata;
    // var key=map.keys();
    // var obj=key.next();
    // while(obj){
    //   this.events.push(obj.value);
    //   obj=key.next();
    // }
    //
    // this.events.forEach(data=>console.log("key are"+data));

  }
}
