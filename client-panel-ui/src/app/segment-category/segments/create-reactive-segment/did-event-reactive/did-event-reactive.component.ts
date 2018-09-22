import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {PropertyFilter} from "../../../../_models/segment";

@Component({
  selector: 'app-did-event-reactive',
  templateUrl: './did-event-reactive.component.html',
  styleUrls: ['./did-event-reactive.component.scss']
})
export class DidEventReactiveComponent implements OnInit {

  @Input() didEventForm: FormGroup;
  @Input() didEventIndex: number;

  @Output() remove: EventEmitter<number> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  get didEventPropertyFilterArray(): FormArray {
    return <FormArray>(this.didEventForm.get('propertyFilters'));
  }

  addDidEventPropertyFilter() {
    let propertyFilter = new PropertyFilter();
    this.didEventPropertyFilterArray.push(this.createPropertyFilter(propertyFilter));
  }

  removeDidEventPropertyFilter(propFilterIndex) {
    this.didEventPropertyFilterArray.removeAt(propFilterIndex);
  }

  createPropertyFilter(propertyFilter: PropertyFilter): FormGroup {
    return this.fb.group({
      propertyFilterName: [propertyFilter.name],
      propertyFIlterType: [propertyFilter.type],
      propertyFilterOperator: [propertyFilter.operator],
      propertyFilterValues: [propertyFilter.values]
    });
  }

  removeMe() {
    this.remove.emit(this.didEventIndex);
  }
}
