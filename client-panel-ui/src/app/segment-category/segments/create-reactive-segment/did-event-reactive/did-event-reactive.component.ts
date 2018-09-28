import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {
  DateFilter, DateOperator, NumberOperator, PropertyFilter, RegisteredEvent,
  RegisteredEventProperties
} from "../../../../_models/segment";
import {SegmentService} from "../../../../_services/segment.service";
import {moment} from "ngx-bootstrap/chronos/test/chain";

@Component({
  selector: 'app-did-event-reactive',
  templateUrl: './did-event-reactive.component.html',
  styleUrls: ['./did-event-reactive.component.scss']
})
export class DidEventReactiveComponent implements OnInit ,OnChanges{

  @Input() didEventForm: FormGroup;
  @Input() didEventIndex: number;
  @Input() registeredEvents:RegisteredEvent[];

  hidewhere:boolean;
  @Input() didNotSelected:boolean=false;

  hidePropertySumFilter=true;

  propertyFilter:RegisteredEventProperties[]=[];

  private _numberOperator:NumberOperator;


  get numberOperator(): NumberOperator {
    return this._numberOperator;
  }

  set numberOperator(value: NumberOperator) {
    this._numberOperator = value;
    this.didEventForm.get('eventWhereFilter').get('whereFilterOperator').setValue(this._numberOperator);
  }

  private _numberValues:number[];


  get numberValues(): number[] {
    return this._numberValues;
  }

  set numberValues(value: number[]) {
    this._numberValues = value;
    this.didEventForm.get('eventWhereFilter').get('whereFilterValues').setValue(this._numberValues);
  }

  private _operator:DateOperator;

  get operator(): DateOperator {
    return this._operator;
  }

  set operator(value: DateOperator) {
    this._operator = value;
    this.didEventForm.get('eventDateFilter').get('dateFilterOperator').setValue(this._operator);
  }

  private _values:string[];

  get values(): string[] {
    return this._values;
  }

  set values(value: string[]) {
    this._values = value;
    this.didEventForm.get('eventDateFilter').get('dateFilterValues').setValue(this._values);
  }

  get valueUnit(): string {
    return this._valueUnit;
  }

  set valueUnit(value: string) {
    this._valueUnit = value;
  }

  private _valueUnit:string;

  dateFilter=new DateFilter();

  @Output() remove: EventEmitter<number> = new EventEmitter();

  constructor(private fb: FormBuilder,private segmentService:SegmentService) {
    //list of date operator default is before
    // this._operator=DateOperator.Before;
    // //values  ==current date
    // this._values=[moment().format('YYYY-MM-DD')];
    // //valueUnitthis._numberValues=this.didEventForm.get('eventWhereFilter').get('whereFilterValues').value;
    this._valueUnit=this.dateFilter.valueUnit;

    // this._numberValues=[0];
    // this._numberOperator=NumberOperator.GreaterThan;

  }

  ngOnInit() {


    console.log("insied did event");
    console.log(this.didEventForm);

    if(this.didEventForm.get('eventDateFilter').get('dateFilterOperator')){
      this._operator=this.didEventForm.get('eventDateFilter').get('dateFilterOperator').value;
    }else{
      this._operator=DateOperator.Before;
    }

    //values  ==current date
    if(this.didEventForm.get('eventDateFilter').get('dateFilterValues')){
      this._values=this.didEventForm.get('eventDateFilter').get('dateFilterValues').value;
    }else{
      this._values=[moment().format('YYYY-MM-DD')];
    }

    //valueUnitthis._numberValues=this.didEventForm.get('eventWhereFilter').get('whereFilterValues').value;
    this._valueUnit=this.dateFilter.valueUnit;

    if(this.didEventForm.get('eventWhereFilter').get('whereFilterName')){
      console.log("where filter");
      console.log(this.didEventForm.get('eventWhereFilter').get('whereFilterOperator').value);
      this._numberOperator=this.didEventForm.get('eventWhereFilter').get('whereFilterOperator').value;
    }else{
      this._numberOperator=NumberOperator.GreaterThan;
    }
    if(this.didEventForm.get('eventWhereFilter').get('whereFilterValues')){
      console.log(this.didEventForm.get('eventWhereFilter').get('whereFilterValues').value);
      this._numberValues=this.didEventForm.get('eventWhereFilter').get('whereFilterValues').value;
    }else{
      this._numberValues=[0];
    }



    this.didEventForm.get('eventDateFilter').get('dateFilterOperator').setValue(this._operator);
    this.didEventForm.get('eventDateFilter').get('dateFilterValues').setValue(this._values);

    var eventName=this.didEventForm.get('eventName').value;

    var registerEvent=this.registeredEvents.find(data=>data.name==eventName);
    this.propertyFilter=registerEvent.properties;

  }

  ngOnChanges(){

    if(this.didNotSelected) {
      this.hidewhere = true;
    }else {
      this.hidewhere=false;
    }

  }
  get didEventPropertyFilterArray(): FormArray {
    return <FormArray>(this.didEventForm.get('propertyFilters'));
  }

  addDidEventPropertyFilter() {
    let propertyFilter = new PropertyFilter();

    // propertyFilter.values = [];
    // propertyFilter.name='';
    this.didEventPropertyFilterArray.push(this.createPropertyFilter(propertyFilter));

    // var eventName=this.didEventForm.get('eventName').value;
    // var registerEvent=this.registeredEvents.find(data=>data.name==eventName);
    // this.propertyFilter=registerEvent.properties;
  }

  removeDidEventPropertyFilter(propFilterIndex) {
    this.didEventPropertyFilterArray.removeAt(propFilterIndex);
  }

  createPropertyFilter(propertyFilter: PropertyFilter): FormGroup {
    return this.fb.group({
      propertyFilterName: [propertyFilter.name],
      propertyFilterType: [propertyFilter.type],
      propertyFilterOperator: [propertyFilter.operator],
      propertyFilterValues: [propertyFilter.values]
    });
  }

  removeMe() {
    this.remove.emit(this.didEventIndex);
  }
  change(event){
    var registerEvent=this.registeredEvents.find(data=>data.name==event.target.value);
    this.propertyFilter=registerEvent.properties;

  }
  private getNumberTypeEventProperties(): RegisteredEventProperties[] {
    return this.propertyFilter.filter((data)=>{return data.dataType=='number'});
  }

  wherePropertyChange(event){
    if(event.target.value==='SumOfValuesOf'){
      this.hidePropertySumFilter=false;
    }
  }
}
