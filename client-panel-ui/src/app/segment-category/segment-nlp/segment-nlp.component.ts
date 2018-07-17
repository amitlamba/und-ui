import {Component, Input, OnInit} from '@angular/core';
import {Segment} from "../../_models/segment";

@Component({
  selector: 'app-segment-nlp',
  templateUrl: './segment-nlp.component.html',
  styleUrls: ['./segment-nlp.component.scss']
})
export class SegmentNlpComponent implements OnInit {

  @Input() segment: Segment;



  constructor() { }

  ngOnInit() {
  }

}
