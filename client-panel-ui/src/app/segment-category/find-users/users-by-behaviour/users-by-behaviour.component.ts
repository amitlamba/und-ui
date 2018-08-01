///<reference path="../../../_services/segment.service.ts"/>
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SegmentService} from "../../../_services/segment.service";
import {DidEvents, RegisteredEventProperties, Segment} from "../../../_models/segment";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../../../_services/message.service";
import {EventUser} from "../../../_models/user";

@Component({
  selector: 'app-users-by-behaviour',
  templateUrl: './users-by-behaviour.component.html',
  styleUrls: ['./users-by-behaviour.component.scss']
})
export class UsersByBehaviourComponent implements OnInit {

  localSegment: Segment;

  @Input() get segment(): Segment {
    return this.localSegment;
  }

  set segment(segment: Segment) {
    this.localSegment = this.segment;
    this.segmentChange.emit(this.localSegment);
  }

  @Output() segmentChange = new EventEmitter();
  showSegmentInNl: boolean = false;

  constructor(public segmentService: SegmentService,
              private messageService: MessageService) {
    this.localSegment = segmentService.editSegment;
  }

  @Output() eventUserList:EventEmitter<EventUser[]> = new EventEmitter();

  ngOnInit() {
    this.getEventMetadata();
    this.getUserPropertiesMetadata();
  }

  getEventMetadata() {
    this.segmentService.getEvents().subscribe(
      (response) => {
        this.segmentService.cachedRegisteredEvents = response;
      }
    );
  }

  getUserPropertiesMetadata() {
    this.segmentService.getCommonProperties().subscribe(
      (response) => {
        this.segmentService.cachedUserProperties = response;
      }
    );
  }

  find() {
    // console.log(JSON.stringify(this.segment));
    // let error = this.segmentService.validate(this.segment);
    // if(error && error.length > 0) {
    //   console.log(JSON.stringify(error));
    //   return;
    // }
    this.showSegmentInNl = true;
    this.segmentService.getEventUsersBySegment(this.segment)
      .subscribe(response => {
        console.log(response);
        this.eventUserList.emit(response);
      }, (error: HttpErrorResponse)=> {
        console.log(error);
        this.messageService.addInfoMessage("No Such user Exists!!");
      });
    console.log(JSON.stringify(this.segment));
  }
}
