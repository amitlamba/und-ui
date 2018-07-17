import {
  AfterContentInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {PropertyFilter, PropertyType, RegisteredEventProperties} from "../../../../_models/segment";
import {NgForm} from "@angular/forms";
import {SegmentService} from "../../../../_services/segment.service";
import {iterator} from "rxjs/symbol/iterator";
import {DidEventComponent} from "../did-event.component";
import {Select2OptionData} from "ng2-select2";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {


  _parentRef: DidEventComponent;
  _ref: any;


  @ViewChild('filterWidget') filterWidget: ViewContainerRef;

  selectedProperty: RegisteredEventProperties = null;

  public select2Options: Select2Options;

  @Input() eventProperties: RegisteredEventProperties[] = [];
  @Input() defaultProperties: RegisteredEventProperties[] = [];

  private localPropertyFilter: PropertyFilter;

  @Input() get propertyFilter(): PropertyFilter {
    return this.localPropertyFilter;
  }

  // the name is an Angular convention, @Input variable name + "Change" suffix
  @Output() propertyFilterChange = new EventEmitter();

  constructor(segmentService: SegmentService) {
  }

  set propertyFilter(propertyFilter: PropertyFilter) {
    if (!propertyFilter.values)
      propertyFilter.values = [];
    this.localPropertyFilter = propertyFilter;
    this.propertyFilterChange.emit(this.localPropertyFilter);
    this.localPropertyFilter.values = propertyFilter.values;
  }

  ngOnInit() {
    this.select2Options = {
      multiple: true,
      placeholder: "Please Select a Value"
    };
  }


  removeObject() {
    this.removeFromParentArr();
    this._ref.destroy();
  }

  removeFromParentArr() {
    // Find the component
    const componentIndex = this._parentRef.components.indexOf(this._ref);

    if (componentIndex !== -1) {
      // Remove component from both view and array
      this._parentRef.components.splice(componentIndex, 1);
    }

    const index = this._parentRef.didEvent.propertyFilters.indexOf(this.propertyFilter);
    if (index != -1) {
      this._parentRef.didEvent.propertyFilters.splice(index, 1);
    }
  }


  filterFirstDropdown(val: any) {
    this.selectedProperty = this.getPropertyByName(val);
    this.localPropertyFilter.name = this.selectedProperty.name;
    this.localPropertyFilter.type = PropertyType[this.selectedProperty.dataType];
    this.localPropertyFilter.values = [];
  }

  getPropertyByName(propName: string): RegisteredEventProperties {
    console.log(propName);
    for (let prop of this.eventProperties) {
      if (prop.name == propName)
        return prop;
    }
    for (let prop of this.defaultProperties) {
      if (prop.name == propName)
        return prop;
    }
    return null;
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
    this.propertyFilter.values = val["value"];
  }

  timeRangeValueChanged($event) {
    console.log($event);
    this.propertyFilter.values = $event;
  }
}
