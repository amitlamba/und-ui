import {Component, Input, OnInit} from '@angular/core';
import {
  DidEvents, JoinCondition,
  LiveSegment, PropertyFilter, RegisteredEvent, RegisteredEventProperties,
  Segment
} from "../../../../_models/segment";
import {SegmentService} from "../../../../_services/segment.service";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "../../../../_services/message.service";

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

  @Input()
  liveSegmentWithInaction: boolean = false;

  displaySegmentNameModal: boolean = false;

  segmentFormModel: FormGroup;

  constructor(private segmentService: SegmentService, private fb: FormBuilder, private route: ActivatedRoute,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.registeredEvents = this.segmentService.cachedRegisteredEvents;
    this.liveSegment = new LiveSegment();
    // this.liveSegment.segment = new Segment();
    this.liveSegment.startEventFilters = [];
    this.liveSegment.endEventFilters = [];
    this.initLiveSegmentForm();
    let inaction = this.route.snapshot.queryParams["i"]; //i=1 for inaction
    if((inaction && inaction == 1)) {
      this.liveSegmentWithInaction = true;
    }
    this.initSegmentModalForm();
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
      startEvent: [this.liveSegment.startEvent ? this.liveSegment.startEvent : "", Validators.required],
      startEventFilters: this.fb.array(this.createEventFilters(this.liveSegment.startEventFilters)),
      endEvent: [this.liveSegment.endEvent? this.liveSegment.endEvent : ""],
      endEventFilters: this.fb.array(this.createEventFilters(this.liveSegment.endEventFilters)),
      interval: [this.liveSegment.interval]
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
      name: [propertyFilter.name, Validators.required],
      operator: [propertyFilter.operator, Validators.required],
      values: [propertyFilter.values, Validators.required],
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

  get endEventFilterArray(): FormArray {
    return <FormArray>(this.liveSegmentForm.get('endEventFilters'));
  }

  addEndEventFilter() {
    this.endEventFilterArray.push(this.createEventFilter(new PropertyFilter()));
  }

  removeEndEventFilter(index) {
    this.endEventFilterArray.removeAt(index);
  }

  insertSegmentValue(event: any) {
    // console.log(event);
    if(event && this.showBehaviorSegment) {
      this.liveSegment.segment = event;
      if(this.liveSegmentWithInaction) {
        this.liveSegment.endEventDone = false;
        this.liveSegment.liveSegmentType = "InactionWithinTime";
      } else {
        this.liveSegment.liveSegmentType = "SingleAction";
      }
      console.log(this.liveSegment);
      this.openPopUp();
    }
  }

  onSave() {
    Object.assign(this.liveSegment, this.liveSegmentForm['value']);
    if( !this.showBehaviorSegment ) {
      if(this.liveSegmentWithInaction) {
        this.liveSegment.endEventDone = false;
        this.liveSegment.liveSegmentType = "InactionWithinTime";
      } else {
        this.liveSegment.liveSegmentType = "SingleAction";
      }
      console.log(this.liveSegment);
      this.openPopUp();
    } else {
      this.triggerValidatedSegment = !this.triggerValidatedSegment;
    }
  }

  sendSaveRequest() {
    this.initSegment();
    this.liveSegment.segment.name = this.segmentFormModel.get('segmentName').value.trim();
    this.segmentFormModel.reset();
    this.liveSegment.segment.type = "Live";
    this.segmentService.saveLiveSegment(this.liveSegment).subscribe(
      (response) => {
        this.messageService.addSuccessMessage("Live segment Created Successfully");
      },
      (error) => {
        this.messageService.addDangerMessage("There is an issue creating live segment");
      }
    );
  }

  initSegment() {
    if (!this.liveSegment.segment) {
      this.liveSegment.segment = new Segment();
      this.liveSegment.segment.didEvents = new DidEvents();
      this.liveSegment.segment.didEvents.joinCondition = new JoinCondition();
      this.liveSegment.segment.didEvents.joinCondition.conditionType = "AllOf";
      this.liveSegment.segment.didNotEvents = new DidEvents();
      this.liveSegment.segment.didNotEvents.joinCondition = new JoinCondition();
      this.liveSegment.segment.didNotEvents.joinCondition.conditionType = "AnyOf";
      this.liveSegment.segment.globalFilters = [];
      this.liveSegment.segment.geographyFilters = [];
      this.liveSegment.segment.type = "Live";
    }
  }

  openPopUp() {
    this.displaySegmentNameModal = true;
  }

  initSegmentModalForm() {
    this.segmentFormModel = this.fb.group({
      segmentName: [null, [Validators.required]]
    });
  }

  closeModal() {
    this.displaySegmentNameModal = false;
  }

  get segmentNameControl(): FormControl {
    return <FormControl>this.segmentFormModel.get('segmentName')
  }
}
