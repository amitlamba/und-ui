import {Component, OnInit} from '@angular/core';
import {SegmentService} from "../../../_services/segment.service";
import {Router} from "@angular/router";
import {
  Country,
  DateFilter, DateOperator, DidEvents, Event, Geography, GlobalFilter, JoinCondition, NumberOperator, PropertyFilter,
  RegisteredEvent,
  RegisteredEventProperties,
  Segment, State,
  WhereFilter
} from "../../../_models/segment";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../../_services/message.service";
import {DaterangepickerConfig} from "ng2-daterangepicker";
import * as moment from "moment";

@Component({
  selector: 'app-create-reactive-segment',
  templateUrl: './create-reactive-segment.component.html',
  styleUrls: ['./create-reactive-segment.component.scss']
})
export class CreateReactiveSegmentComponent implements OnInit {

  segment: Segment;
  segmentErrors: string[] = [];
  segmentForm: FormGroup;

  registeredEvents: RegisteredEvent[] = [];
  defaultProperties: RegisteredEventProperties[];
  eventProperties: RegisteredEventProperties[];
  public singleDate: any;

  hidePropertySumFilter=true;

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
    if (this.registeredEvents == null || this.registeredEvents.length == 0) {
      this.messageService.addDangerMessage("No Events Metadata available. Showing Dummy data.");
      this.registeredEvents = this.segmentService.sampleEvents;
    }
    this.defaultProperties = this.segmentService.defaultEventProperties;
    this.eventProperties = this.registeredEvents[0].properties;


    this.segmentService.getCountries().subscribe(response=>this.segmentService.countries=response);
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
      globalFilters: this.fb.array(this.createGlobalFiltersForm(this.segment.globalFilters)),
      // geoLocations: this.fb.array(this.segment.geographyFilters)
      geoLocations: this.fb.array(this.createGeographyFiltersForm(this.segment.geographyFilters))
    });
  }

  createGeographyFiltersForm(geographies: Geography[]): FormGroup[] {
    if(geographies && geographies.length) {
      return geographies.map((v,i,a)=> {
        return this.createGeographyFilterForm(v);
      })
    } else return [];
  }

  createGeographyFilterForm(geography: Geography): FormGroup {
    return this.fb.group({
      country: [null,Validators.required],
      state: [null,Validators.required],
      city: [null,Validators.required]
    });
  }

  createGlobalFiltersForm(globalFilters: GlobalFilter[]): FormGroup[] {
    if (globalFilters && globalFilters.length)
      return globalFilters.map((v, i, a) => {
        return this.createGlobalFilterForm(v);
      });
    else return [];
  }

  createGlobalFilterForm(globalFilter: GlobalFilter): FormGroup {
    return this.fb.group({
      globalFilterType: [globalFilter.globalFilterType],
      name: [globalFilter.name],
      type: [globalFilter.type],
      operator: [globalFilter.operator],
      values: [globalFilter.values],
      valueUnit: [globalFilter.valueUnit]
    });
  }

  createEventsForm(events: Event[]): FormGroup[] {
    if (events && events.length) {
      return events.map<FormGroup>((v, i, a) => {
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
      return this.createPropertyFilter(v);
    });
  }

  createPropertyFilter(propertyFilter: PropertyFilter): FormGroup {
    return this.fb.group({
      propertyFilterName: [propertyFilter.name],
      propertyFIlterType: [propertyFilter.type],
      propertyFilterOperator: [propertyFilter.operator],
      propertyFilterValues: [propertyFilter.values]
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
    newEvent.name = this.registeredEvents[0].name;
    newEvent.dateFilter = new DateFilter();
    newEvent.dateFilter.operator = DateOperator.Before;
    newEvent.dateFilter.values = [this.getCurrentFormattedDate()];
    newEvent.propertyFilters = [];
    newEvent.whereFilter = new WhereFilter();
    newEvent.whereFilter.operator = NumberOperator.GreaterThan;
    newEvent.whereFilter.values = [0];
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

  didEventPropertyFilterArray(index): FormArray {
    return <FormArray>(this.didEventArray.at(index).get('propertyFilters'));
  }

  get globalFilterArray(): FormArray {
    return <FormArray>this.segmentForm.get('globalFilters');
  }

  addGlobalFilter() {
    let gf = new GlobalFilter();
    this.globalFilterArray.push(this.createGlobalFilterForm(gf));
  }

  removeGlobalFilter(index) {
    this.globalFilterArray.removeAt(index);
  }

  get geograpgyFilterArray(): FormArray {
    return <FormArray>this.segmentForm.get('geoLocations');
  }

  addGeoLocation() {
    let gl = new Geography();
    this.geograpgyFilterArray.push(this.createGeographyFilterForm(gl));
  }

  removeGeoLocation(index) {
    this.geograpgyFilterArray.removeAt(index);
  }

  addDidEventPropertyFilter(didEventIndex) {
    let propertyFilter = new PropertyFilter();
    this.didEventPropertyFilterArray(didEventIndex).push(this.createPropertyFilter(propertyFilter));
  }

  removeDidEventPropertyFilter(didEventIndex, propFilterIndex) {
    this.didEventPropertyFilterArray(didEventIndex).removeAt(propFilterIndex);
  }

  eventNameChanged(val) {
    console.log(val);
  }

  private getCurrentFormattedDate(): string {
    return moment().format('YYYY-MM-DD')
  }
  private getNumberTypeEventProperties(): RegisteredEventProperties[] {
    return this.eventProperties.filter((data)=>{return data.dataType=='number'});
  }
}
