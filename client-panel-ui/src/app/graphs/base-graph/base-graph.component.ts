import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {Chart} from 'chart.js';

@Component({
  selector: 'app-base-graph',
  templateUrl: './base-graph.component.html',
  styleUrls: ['./base-graph.component.scss']
})
export class BaseGraphComponent implements OnInit {

  @Input() data: number[] | any[];
  @Input() datasets: any[];
  @Input() labels: Array<any>;
  @Input() options: any;
  @Input() chartType: string;
  @Input() colors: Array<any>;
  @Input() legend: boolean;
  // @Output() chartClick: EventEmitter<any>;
  // @Output() chartHover: EventEmitter<any>;

  _ref: any;
  _parentRef: any;

  constructor() { }

  ngOnInit() {
  }

}
