import {Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {PropertyFilter, PropertyType, RegisteredEventProperties} from "../../../../_models/segment";
import {FormControl, FormGroup} from "@angular/forms";
import {operators} from "rxjs/Rx";

@Component({
  selector: 'app-filter-reactive',
  templateUrl: './filter-reactive.component.html',
  styleUrls: ['./filter-reactive.component.scss']
})
export class FilterReactiveComponent implements OnInit {

  @Input() defaultProperties: RegisteredEventProperties[] = [];
  @Input() eventProperties: RegisteredEventProperties[];
  @Input() filterForm: FormGroup;
  @Input() filterIndex: number;
  @Output() remove: EventEmitter<number> = new EventEmitter();


  private _propertyFilterOperator: string;
  private _propertyFilterValues: string[];
  private _propertyFilterOptions: any[];

  public select2Options: Select2Options;

  private _selectedProperty: RegisteredEventProperties = null;

  get selectedProperty(): RegisteredEventProperties {
    return this._selectedProperty;
  }

  set selectedProperty(value: RegisteredEventProperties) {
    this._selectedProperty = value;
    if(this._selectedProperty) {
      this.filterForm.get('type').setValue(PropertyType[this._selectedProperty.dataType]);
      if (this._selectedProperty['options']) {
        console.log(this._selectedProperty['options']);
        this.propertyFilterOptions = this._selectedProperty['options'];
      } else {
        this.propertyFilterOptions = [];
      }
    }
  }

  get propertyFilterOperator(): string {
    return this._propertyFilterOperator;
  }

  set propertyFilterOperator(pfo: string) {
    this._propertyFilterOperator = pfo;
    this.filterForm.get('operator').setValue(pfo);
  }


  get propertyFilterValues(): string[] {
    return this._propertyFilterValues;
  }

  set propertyFilterValues(value: string[]) {
    this._propertyFilterValues = value;
    this.filterForm.get('values').setValue(value);
  }

  set propertyFilterValue(value) {
    this.propertyFilterValues = [value];
  }

  get propertyFilterOptions(): any[] {
    return this._propertyFilterOptions;
  }

  set propertyFilterOptions(value: any[]) {
    this._propertyFilterOptions = value;
  }

  @Input() filter: PropertyFilter;


  constructor() {

  }

  ngOnInit() {

    console.log("filter");
    console.log(this.filterForm);

    if (!this.filterForm.get('name').value){
      let name = (this.eventProperties && this.eventProperties.length)?this.eventProperties[0].name:this.defaultProperties[0].name
      this.filterForm.get('name').setValue(name);
    }
    this.select2Options = {
      multiple: true,
      placeholder: "Please Select a Value"
    };
    if(!this.filterForm.get('operator').value){
      this.propertyFilterOperator='Equals';
    }else{
      this._propertyFilterOperator=this.filterForm.get('operator').value;
    }
    if(!this.filterForm.get('values').value){
      this.propertyFilterValues=[];
    }else{
      this._propertyFilterValues=this.filterForm.get('values').value;
    }
    this.setSelectedProperty();
  }

  ngOnChanges(change: SimpleChanges) {
    // console.log("change ");
    // console.log(change);
    // this.eventProperties.forEach(data => console.log(data.name));

    this.setSelectedProperty();
  }

  private setSelectedProperty() {
    if (this.filterForm.get('name').value) {
      this.selectedProperty = this.eventProperties.find(data => data.name === this.filterForm.get('name').value);
      if (!this.selectedProperty) {
        console.log(this.defaultProperties.find(data => data.name === this.filterForm.get('name').value));
        this.selectedProperty = this.defaultProperties.find(data => data.name === this.filterForm.get('name').value);
      }
      console.log(this.filterForm.get('name').value);
    }
  }

  get propertyFilterType() {
    if (!this.selectedProperty)
      return "string";
    else
      return this.selectedProperty.dataType;
  }

  removeFilter() {
    this.remove.emit(this.filterIndex);
  }

  property(event) {
    // console.log("inside peroperty");
    // console.log(event.target.value);
    this.selectedProperty = this.eventProperties.find(data => data.name === event.target.value);
    if(!this.selectedProperty) {
      this.selectedProperty = this.defaultProperties.find(data => data.name === event.target.value);
    }
    this.filterForm.get('type').setValue(PropertyType[this.selectedProperty.dataType]);
    console.log(this.selectedProperty.dataType);
  }

  getSelectedPropertyOptions(): any[] {
    let options = this.selectedProperty.options
      .map((option, index) => {
        return {'id': option, 'text': option}
      });
    return options;
  }

  select2ValueChanged(val: any, selectedProperty: any) {
    console.log("Select 2 Value Changed: " + JSON.stringify(val) + ", Selected Property: " + JSON.stringify(this.selectedProperty));
    this.propertyFilterValues = val["value"];
  }

  timeRangeValueChanged($event) {
    console.log($event);
    this.propertyFilterValues = $event;
  }
}
