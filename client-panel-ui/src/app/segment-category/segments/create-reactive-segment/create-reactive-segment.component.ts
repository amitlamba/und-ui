import {Component, OnInit} from '@angular/core';
import {SegmentService} from "../../../_services/segment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {
  City,
  Country,
  DateFilter, DateOperator, DidEvents, Event, Geography, GlobalFilter, JoinCondition, NumberOperator, PropertyFilter,
  RegisteredEvent,
  RegisteredEventProperties,
  Segment, State,
  WhereFilter, WhereFilterName
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

  didNotSelected: boolean = true;
  hidePropertySumFilter = true;

  constructor(private segmentService: SegmentService, private fb: FormBuilder,
              private messageService: MessageService,
              private daterangepickerOptions: DaterangepickerConfig, private route: Router) {

    this.segmentService.getEvents().subscribe(
      (response) => {
        this.segmentService.cachedRegisteredEvents = response;
      }
    );
    //
    // if (!(this.segmentService.countries && this.segmentService.countries.length))
    //   this.segmentService.getCountries().subscribe(response => this.segmentService.countries = response);
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

    this.daterangepickerOptions.settings = {
      locale: {format: 'YYYY-MM-DD'},
      alwaysShowCalendars: false
    };
    this.singleDate = Date.now();

    setTimeout(() => {
      this.registeredEvents = this.segmentService.cachedRegisteredEvents;
    }, 2000);
    this.registeredEvents = this.segmentService.cachedRegisteredEvents;
    if (this.registeredEvents == null || this.registeredEvents.length == 0) {
      this.messageService.addDangerMessage("No Events Metadata available. Showing Dummy data.");
      this.registeredEvents = this.segmentService.sampleEvents;
    }
    this.defaultProperties = this.segmentService.defaultEventProperties;
    this.eventProperties = this.registeredEvents[0].properties;




    this.segment = JSON.parse("{\n" +
      "  \"id\" : 1005,\n" +
      "  \"name\" : \"EditTest\",\n" +
      "  \"type\" : \"Behaviour\",\n" +
      "  \"creationDate\" : \"2018-09-26T12:20:47.006\",\n" +
      "  \"conversionEvent\" : null,\n" +
      "  \"didEvents\" : {\n" +
      "    \"description\" : null,\n" +
      "    \"joinCondition\" : {\n" +
      "      \"anyOfCount\" : null,\n" +
      "      \"conditionType\" : \"AllOf\"\n" +
      "    },\n" +
      "    \"events\" : [ {\n" +
      "      \"name\" : \"Charged\",\n" +
      "      \"dateFilter\" : {\n" +
      "        \"operator\" : \"Before\",\n" +
      "        \"values\" : [\"2018-09-26\"],\n" +
      "        \"valueUnit\" : \"NONE\"\n" +
      "      },\n" +
      "      \"propertyFilters\" : [ ],\n" +
      "      \"whereFilter\" : {\n" +
      "        \"whereFilterName\" : \"Count\",\n" +
      "        \"propertyName\" : \"\",\n" +
      "        \"operator\" : \"Equals\",\n" +
      "        \"values\" : [ 1 ]\n" +
      "      }\n" +
      "    } ]\n" +
      "  },\n" +
      "  \"didNotEvents\" : {\n" +
      "    \"description\" : null,\n" +
      "    \"joinCondition\" : {\n" +
      "      \"anyOfCount\" : null,\n" +
      "      \"conditionType\" : \"AnyOf\"\n" +
      "    },\n" +
      "    \"events\" : [ {\n" +
      "      \"name\" : \"Added to cart\",\n" +
      "      \"dateFilter\" : {\n" +
      "        \"operator\" : \"Before\",\n" +
      "        \"values\" : [ \"2018-09-26\" ],\n" +
      "        \"valueUnit\" : \"NONE\"\n" +
      "      },\n" +
      "      \"propertyFilters\" : [ {\n" +
      "        \"name\" : \"Product\",\n" +
      "        \"type\" : \"string\",\n" +
      "        \"filterType\" : \"eventproperty\",\n" +
      "        \"operator\" : \"DoesNotContain\",\n" +
      "        \"values\" : [ \"jkkj\" ],\n" +
      "        \"valueUnit\" : \"NONE\"\n" +
      "      } ],\n" +
      "      \"whereFilter\" : {\n" +
      "        \"whereFilterName\" : null,\n" +
      "        \"propertyName\" : \"\",\n" +
      "        \"operator\" : \"NONE\",\n" +
      "        \"values\" : null\n" +
      "      }\n" +
      "    } ]\n" +
      "  },\n" +
      "  \"globalFilters\" : [ {\n" +
      "    \"globalFilterType\" : \"Technographics\",\n" +
      "    \"name\" : \"Browser\",\n" +
      "    \"type\" : \"string\",\n" +
      "    \"operator\" : \"Contains\",\n" +
      "    \"values\" : [ \"Chrome\",\"Opera\" ],\n" +
      "    \"valueUnit\" : \"NONE\"\n" +
      "  } ],\n" +
      "  \"geographyFilters\" : [ {\n" +
      "    \"country\" : {\n" +
      "      \"id\" : 1,\n" +
      "      \"name\" : \"Afghanistan\"\n" +
      "    },\n" +
      "    \"state\" : {\n" +
      "      \"id\" : 43,\n" +
      "      \"name\" : \"Badgis\"\n" +
      "    },\n" +
      "    \"city\" : {\n" +
      "      \"id\" : 5914,\n" +
      "      \"name\" : \"Bala Morghab\"\n" +
      "    }\n" +
      "  } ]\n" +
      "}");



    this.createForm(this.segment);

  }


  createForm(segment: Segment) {
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
      geographyFilters: this.fb.array(this.createGeographyFiltersForm(this.segment.geographyFilters))
    });
  }

  createGeographyFiltersForm(geographies: Geography[]): FormGroup[] {
    if (geographies && geographies.length) {
      return geographies.map((v, i, a) => {
        return this.createGeographyFilterForm(v);
      })
    } else return [];
  }

  createGeographyFilterForm(geography: Geography): FormGroup {
    return this.fb.group({
      country: [geography.country, Validators.required],
      state: [geography.state, Validators.required],
      city: [geography.city, Validators.required]
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
    var fg= this.fb.group({
      propertyFilterName: [propertyFilter.name],
      propertyFilterOperator: [propertyFilter.operator],
      propertyFilterValues: [propertyFilter.values],
      propertyFilterType: [propertyFilter.type]
    });
    return fg;
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
    newEvent.whereFilter.whereFilterName = WhereFilterName.Count;
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

  removeDidNotEvent(event) {
    this.didNotEventArray.removeAt(event);
  }

  addDidNotEvent() {
    this.didNotSelected = true;

    if (!this.segment.didNotEvents) {
      this.segment.didNotEvents = new DidEvents();
      this.segment.didNotEvents.events = [];
    }
    if (!this.segment.didNotEvents.events)
      this.segment.didNotEvents.events = [];

    let newEvent = new Event();
    newEvent.name = this.registeredEvents[0].name;
    newEvent.dateFilter = new DateFilter();
    newEvent.dateFilter.operator = DateOperator.Before;
    newEvent.dateFilter.values = [this.getCurrentFormattedDate()];
    newEvent.propertyFilters = [];
    newEvent.whereFilter = new WhereFilter();
    newEvent.whereFilter.whereFilterName = null;
    newEvent.whereFilter.operator =null ;
    newEvent.whereFilter.values = null;

    this.segment.didNotEvents.events.push(newEvent);

    let newEventForm = this.createEventForm(newEvent);
    this.didNotEventArray.push(newEventForm);
    console.log(this.segment);
    console.log(this.segmentForm);
  }

  get didNotEventArray(): FormArray {
    return <FormArray>(<FormGroup>this.segmentForm.get('didNotEvents')).get('events');
  }


  get didEventArray(): FormArray {
    return <FormArray>(<FormGroup>this.segmentForm.get('didEvents')).get('events');
  }

  didEventPropertyFilterArray(index): FormArray {
    return <FormArray>(this.didEventArray.at(index).get('propertyFilters'));
  }

  didNotEventPropertyFilterArray(index): FormArray {
    return <FormArray>(this.didNotEventArray.at(index).get('propertyFilters'));
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
    return <FormArray>this.segmentForm.get('geographyFilters');
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

  addDidNotEventPropertyFilter(didEventIndex) {
    let propertyFilter = new PropertyFilter();
    this.didNotEventPropertyFilterArray(didEventIndex).push(this.createPropertyFilter(propertyFilter));
  }

  removeDidNotEventPropertyFilter(didEventIndex, propFilterIndex) {
    this.didNotEventPropertyFilterArray(didEventIndex).removeAt(propFilterIndex);
  }

  eventNameChanged(val) {
    console.log(val);
  }

  private getCurrentFormattedDate(): string {
    return moment().format('YYYY-MM-DD')
  }

  private getNumberTypeEventProperties(): RegisteredEventProperties[] {
    return this.eventProperties.filter((data) => {
      return data.dataType == 'number'
    });
  }

  submit() {
    //redirect to segment list
    let segment=new Segment();
    console.log(this.segmentForm['value']);
    Object.assign(segment, this.segmentForm['value']);
    console.log("segment");
    console.log(segment);
    console.log(JSON.parse(JSON.stringify(segment)));
  }

}
