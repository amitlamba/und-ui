import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-geography-reactive',
  templateUrl: './geography-reactive.component.html',
  styleUrls: ['./geography-reactive.component.scss']
})
export class GeographyReactiveComponent implements OnInit {

  @Input() geographyForm: FormGroup;
  @Input() geographyFormIndex: number;

  @Output() remove: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  removeMe() {
    this.remove.emit(this.geographyFormIndex);
  }
}
