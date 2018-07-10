import {Component, OnInit, ViewChild} from '@angular/core';
import {SegmentService} from "../../../_services/segment.service";
import {DidEvents, Geography, GlobalFilter, Segment} from "../../../_models/segment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-new-segment',
  templateUrl: './create-new-segment.component.html',
  styleUrls: ['./create-new-segment.component.scss']
})
export class CreateNewSegmentComponent implements OnInit {

  newSegment: Segment;
  @ViewChild('segmentForm') segmentForm;
  constructor(private segmentService: SegmentService, private router: Router) {
    this.newSegment = new Segment();
    // this.newSegment.didEvents = new DidEvents();
    // this.newSegment.didNotEvents = new DidEvents();
    // this.newSegment.globalFilters = [];
    // this.newSegment.geographyFilters = new Array<Geography>();
    this.segmentService.initSegment(this.newSegment);
    this.newSegment.type = "Behaviour";
    this.segmentService.editSegment = this.newSegment;
  }

  ngOnInit() {
  }

  save() {
    // console.log(this.newSegment);
    // this.segmentForm.reset();
    this.segmentService.saveSegment(this.newSegment).subscribe(
      (segment) => {
        this.segmentService.segments.push(segment);
        this.router.navigate(['segment/segments']);
      }
    )
  }
}
