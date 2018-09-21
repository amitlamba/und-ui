import {Component, OnInit} from '@angular/core';
import {SegmentService} from "../../../_services/segment.service";
import {Router} from "@angular/router";
import {
  DateFilter, DidEvents, Event, GlobalFilter, JoinCondition, PropertyFilter, RegisteredEvent, RegisteredEventProperties,
  Segment,
  WhereFilter
} from "../../../_models/segment";
import {Form, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MessageService} from "../../../_services/message.service";
import {DaterangepickerConfig} from "ng2-daterangepicker";

@Component({
  selector: 'app-create-reactive-segment',
  templateUrl: './create-reactive-segment.component.html',
  styleUrls: ['./create-reactive-segment.component.scss']
})
export class CreateReactiveSegmentComponent implements OnInit {

  segment: Segment;
  segmentErrors: string[] = [];
  segmentForm: FormGroup;

  registeredEvents:RegisteredEvent[] = [];
  defaultProperties: RegisteredEventProperties[];
  eventProperties: RegisteredEventProperties[];
  public singleDate: any;

  constructor(private segmentService: SegmentService, private fb: FormBuilder,
              private messageService: MessageService,
              private daterangepickerOptions: DaterangepickerConfig) {

  }

  ngOnInit() {
    this.segment = new Segment();
    this.segment.didEvents = new DidEvents();
    this.segment.didEvents.joinCondition = new JoinCondition();
    this.segment.didEvents.joinCondition.conditionType = "AllOf";
    this.segment.didNotEvents = new DidEvents();
    this.segment.didNotEvents.joinCondition = new JoinCondition();
    this.segment.didNotEvents.joinCondition.conditionType = "AnyOf";
    this.segment.globalFilters = [];
    this.segment.geographyFilters = [];
    this.createForm();

    this.daterangepickerOptions.settings = {
      locale: {format: 'YYYY-MM-DD'},
      alwaysShowCalendars: false
    };
    this.singleDate = Date.now();
    this.registeredEvents = this.segmentService.cachedRegisteredEvents;
    if(this.registeredEvents == null || this.registeredEvents.length==0) {
      this.messageService.addDangerMessage("No Events Metadata available. Showing Dummy data.");
      this.registeredEvents = this.segmentService.sampleEvents;
    }
    this.defaultProperties = this.segmentService.defaultEventProperties;
    this.eventProperties = this.registeredEvents[0].properties;
  }

  createForm() {
    this.segmentForm = this.fb.group({
      didEvents: this.fb.group({
        joinCondition: this.fb.group({
          conditionType: [this.segment.didEvents.joinCondition.conditionType],
          anyOfCount: [this.segment.didEvents.joinCondition.anyOfCount]
        }),
        events: this.fb.array(this.createEventsForm(this.segment.didEvents.events)),
      }),
      didNotEvents: this.fb.group({
        joinCondition: this.fb.group({
          conditionType: [this.segment.didNotEvents.joinCondition.conditionType],
          anyOfCount: [this.segment.didNotEvents.joinCondition.anyOfCount]
        }),
        events: this.fb.array(this.createEventsForm(this.segment.didNotEvents.events)),
      }),
      userProperties: this.fb.array(this.segment.globalFilters),
      geoLocations: this.fb.array(this.segment.geographyFilters)
    });
  }

  /*
  globalFilterType: GlobalFilterType;
  name: string;
  type: string;
  operator: string;
  values: any[] = [];
  valueUnit: string;
   */
  createGlobalFiltersForm(globalFilters: GlobalFilter[]): FormGroup[] {
    if (globalFilters && globalFilters.length)
      return globalFilters.map((v, i, a) => {
        return this.fb.group({
          globalFilterType: [v.globalFilterType],
          name: [v.name],
          type: [v.type],
          operator: [v.operator],
          values: [v.values]
        });
      });
    else return [];
  }

  createEventsForm(events: Event[]): FormGroup[] {
    if (events && events.length) {
      return events.map((v, i, a) => {
        return this.createEventForm(v);
      });
    }
    else return [];
  }

  createEventForm(v: Event): FormGroup {
    return this.fb.group({
      eventName: [v.name],
      eventDateFilter: this.fb.group({
        dateFilterOperator: [v.dateFilter.operator],
        dateFilterValues: [v.dateFilter.values]
      }),
      propertyFilters: this.fb.array(this.createPropertyFilters(v.propertyFilters)),
      eventWhereFilter: this.fb.group({
        whereFilterName: [v.whereFilter.whereFilterName],
        whereFilterPropertyName: [v.whereFilter.propertyName],
        whereFilterOperator: [v.whereFilter.operator],
        whereFilterValues: [v.whereFilter.values]
      })
    });
  }

  createPropertyFilters(propertyFilters: PropertyFilter[]): FormGroup[] {
    return propertyFilters.map((v, i, a) => {
      return this.fb.group({
        propertyFilterName: [v.name],
        propertyFilterOperator: [v.operator],
        propertyFilterValues: [v.values]
      })
    });
  }

  addDidEvent() {
    if (!this.segment.didEvents) {
      this.segment.didEvents = new DidEvents();
      this.segment.didEvents.events = [];
    }
    if (!this.segment.didEvents.events)
      this.segment.didEvents.events = [];

    let newEvent = new Event();
    newEvent.whereFilter = new WhereFilter();
    newEvent.dateFilter = new DateFilter();
    newEvent.propertyFilters = [];
    this.segment.didEvents.events.push(newEvent);

    let newEventForm = this.createEventForm(newEvent);
    this.didEventArray.push(newEventForm);
    console.log(this.segment);
    console.log(this.segmentForm);
  }

  removeDidEvent(index) {
    this.didEventArray.removeAt(index);
    this.segment.didEvents.events.splice(index, 1);
    console.log(this.segment);
    console.log(this.segmentForm);
  }

  get didEventArray(): FormArray {
    return <FormArray>(<FormGroup>this.segmentForm.get('didEvents')).get('events');
  }

  eventNameChanged(val) {
    console.log(val);
  }
}
