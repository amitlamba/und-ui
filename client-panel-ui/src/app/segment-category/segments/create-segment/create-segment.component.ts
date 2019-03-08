import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-segment',
  templateUrl: './create-segment.component.html',
  styleUrls: ['./create-segment.component.scss']
})
export class CreateSegmentComponent implements OnInit {

  private segmentTypes: string[] = ["Behavior-Actions", "Behavior-InActions", "Behavior-LocationBased", "Behavior-UserPropertiesBased", "Live-SingleAction", "Live-SingleActionWithSingleInaction", "Live-SingleActionWithOtherAction"];

  constructor() { }

  ngOnInit() {
  }

}
