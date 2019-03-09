import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-segment',
  templateUrl: './create-segment.component.html',
  styleUrls: ['./create-segment.component.scss']
})
export class CreateSegmentComponent implements OnInit {

  private segmentTypes: string[] = ["Behavior-Actions", "Behavior-InActions", "Behavior-LocationBased", "Behavior-UserPropertiesBased", "Live-SingleAction", "Live-SingleActionWithSingleInaction", "Live-SingleActionWithOtherAction"];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onCreateBehaviourSegmentBasedOnAction() {
    this.router.navigate(["segment", "create-reactive-segment"]);
  }

  onCreateLiveSegmentBasedOnSingleAction() {
    this.router.navigate(["segment", "create-live-segment"]);
  }
}
