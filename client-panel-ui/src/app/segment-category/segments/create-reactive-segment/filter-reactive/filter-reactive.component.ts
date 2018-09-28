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

  public select2Options: Select2Options;

  private _selectedProperty: RegisteredEventProperties = null;

  get selectedProperty(): RegisteredEventProperties {
    return this._selectedProperty;
  }

  set selectedProperty(value: RegisteredEventProperties) {
    this._selectedProperty = value;
    this.filterForm.get('propertyFilterType').setValue(value.dataType);
  }

  get propertyFilterOperator(): string {
    return this._propertyFilterOperator;
  }

  set propertyFilterOperator(pfo: string) {
    this._propertyFilterOperator = pfo;
    this.filterForm.get('propertyFilterOperator').setValue(pfo);
  }


  get propertyFilterValues(): string[] {
    return this._propertyFilterValues;
  }

  set propertyFilterValues(value: string[]) {
    this._propertyFilterValues = value;
    this.filterForm.get('propertyFilterValues').setValue(value);
  }

  @Input() filter: PropertyFilter;


  constructor() {

  }

  ngOnInit() {

    console.log("filter");
    console.log(this.filterForm);

    if (!this.filterForm.get('propertyFilterName').value){
      this.filterForm.get('propertyFilterName').setValue(this.eventProperties[0].name);
    }
    this.select2Options = {
      multiple: true,
      placeholder: "Please Select a Value"
    };
    if(!this.filterForm.get('propertyFilterOperator').value){
      this.propertyFilterOperator='Equals';
    }else{
      this._propertyFilterOperator=this.filterForm.get('propertyFilterOperator').value;
    }
    if(!this.filterForm.get('propertyFilterValues').value){
      this.propertyFilterValues=[];
    }else{
      this._propertyFilterValues=this.filterForm.get('propertyFilterValues').value;
    }

  }

  ngOnChanges(change: SimpleChanges) {
    // console.log("change ");
    // console.log(change);
    // this.eventProperties.forEach(data => console.log(data.name));

    this._selectedProperty = this.eventProperties.find(data => data.name === this.filterForm.get('propertyFilterName').value);
    console.log(this.filterForm.get('propertyFilterName').value);
  }

  get propertyFilterType() {
    if (!this._selectedProperty)
      return "string";
    else
      return this._selectedProperty.dataType;
  }

  removeFilter() {
    this.remove.emit(this.filterIndex);
  }

  property(event) {
    // console.log("inside peroperty");
    // console.log(event.target.value);
    this._selectedProperty = this.eventProperties.find(data => data.name === event.target.value);
    this.filterForm.get('propertyFilterType').setValue(this._selectedProperty.dataType);
    console.log(this._selectedProperty.dataType);
  }
}
