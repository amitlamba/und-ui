import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PropertyFilter, PropertyType, RegisteredEventProperties} from "../../../../_models/segment";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-filter-reactive',
  templateUrl: './filter-reactive.component.html',
  styleUrls: ['./filter-reactive.component.scss']
})
export class FilterReactiveComponent implements OnInit {

  selectedProperty: RegisteredEventProperties = null;

  public select2Options: Select2Options;

  @Input() eventProperties: RegisteredEventProperties[] = [];
  @Input() defaultProperties: RegisteredEventProperties[] = [];

  @Input() filterForm: FormGroup;
  @Input() filter: PropertyFilter;
  @Input() filterIndex: number;
  @Output() remove: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.select2Options = {
      multiple: true,
      placeholder: "Please Select a Value"
    };
  }

  get propertyFilterType() {
    return this.filterForm.get("propertyFilterType").value;
  }

  removeMe() {
    this.remove.emit(this.filterIndex);
  }
}
