import {Component, OnInit} from '@angular/core';
import {
  LiveSegment, PropertyFilter, RegisteredEvent, RegisteredEventProperties,
  Segment
} from "../../../../_models/segment";
import {SegmentService} from "../../../../_services/segment.service";
import {Form, FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-live-segment',
  templateUrl: './create-live-segment.component.html',
  styleUrls: ['./create-live-segment.component.scss']
})
export class CreateLiveSegmentComponent implements OnInit {

  liveSegment: LiveSegment;

  get showBehaviorSegment(): boolean {
    return this._showBehaviorSegment;
  }

  set showBehaviorSegment(value: boolean) {
    this._showBehaviorSegment = value;
    if (!this._showBehaviorSegment && this.liveSegment) {
      this.liveSegment.segment = null;
      this.triggerValidatedSegment = false;
    }
  }

  private _showBehaviorSegment: boolean = false;

  registeredEvents: RegisteredEvent[];
  liveSegmentForm: FormGroup;
  registeredEventProperties: RegisteredEventProperties[] = [];

  triggerValidatedSegment: boolean = false;

  constructor(private segmentService: SegmentService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.registeredEvents = this.segmentService.cachedRegisteredEvents;
    this.liveSegment = new LiveSegment();
    // this.liveSegment.segment = new Segment();
    this.liveSegment.startEventFilters = [];
    this.liveSegment.endEventFilters = [];
    this.initLiveSegmentForm();
  }

  change(event: any) {
    this.registeredEventProperties = this.registeredEvents.find(v => v.name == event.target.value).properties;
    this.resetStartEventFilters();
  }

  private resetStartEventFilters() {
    this.liveSegment.startEventFilters = [];
    this.liveSegmentForm.setControl("startEventFilters", this.fb.array(this.createEventFilters(this.liveSegment.startEventFilters)));
  }

  private initLiveSegmentForm() {
    this.liveSegmentForm = this.fb.group({
      startEvent: [this.liveSegment.startEvent ? this.liveSegment.startEvent : ""],
      startEventFilters: this.fb.array(this.createEventFilters(this.liveSegment.startEventFilters)),
      endEvent: [this.liveSegment.endEvent],
      endEventFilters: this.fb.array(this.createEventFilters(this.liveSegment.endEventFilters)),
      intervalSeconds: [this.liveSegment.intervalSeconds]
    });
  }

  private createEventFilters(propertyFilters: PropertyFilter[]): FormGroup[] {
    if (propertyFilters && propertyFilters.length)
      return propertyFilters.map((v) => {
        return this.createEventFilter(v);
      });
    else return [];
  }

  private createEventFilter(propertyFilter: PropertyFilter): FormGroup {
    var fg = this.fb.group({
      name: [propertyFilter.name],
      operator: [propertyFilter.operator],
      values: [propertyFilter.values],
      type: [propertyFilter.type]
    });
    return fg;
  }

  get startEventFilterArray(): FormArray {
    return <FormArray>(this.liveSegmentForm.get('startEventFilters'));
  }

  addStartEventFilter() {
    this.startEventFilterArray.push(this.createEventFilter(new PropertyFilter()));
  }

  removeStartEventFilter(index) {
    this.startEventFilterArray.removeAt(index);
  }

  insertSegmentValue(event: any) {
    console.log(event);
    this.liveSegment.segment = event;
  }

  onSave() {
    this.triggerValidatedSegment = !this.triggerValidatedSegment;
    // this.triggerValidatedSegment = true;
    console.log(this.liveSegment);
  }
}
