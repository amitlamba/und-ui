import {Component, OnInit} from '@angular/core';
import {Segment} from "../../_models/segment";
import {Router} from "@angular/router";
import {SegmentService} from "../../_services/segment.service";

@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss']
})
export class SegmentsComponent implements OnInit {

  segments: Segment[] = [];
  toggleSegmentDetails: any = {};

  constructor(private router: Router, public segmentService:SegmentService) {
  }

  ngOnInit() {
    this.segmentService.getSegments().subscribe(
      (segments) => {
        this.segmentService.segments = segments;
        this.segments = this.segmentService.segments;
      }
    );
  }

  private createNewSegment(): Segment {
    let textArray = [
      'Behaviour',
      'Live'
    ];
    let randomNumber = Math.floor(Math.random()*textArray.length);

    var segment = new Segment();
    segment.id = Math.floor(Math.random() * 200000) + 1;
    segment.name = "Segment # "+segment.id;
    segment.type = textArray[randomNumber];
    segment.creationDate = "2017-01-01";
    return segment;
  }

  onCreateNew() {
    this.router.navigate(["segment","create-new-segment"]);
  }

  toggleSegmentDetail(id: number) {
    this.toggleSegmentDetails[id] = !this.toggleSegmentDetails[id];
  }

  segmentTrackBy(index: number, segment: Segment) {
    return segment.id;
  }
}
