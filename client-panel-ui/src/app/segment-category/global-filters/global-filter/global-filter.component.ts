import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SegmentService} from "../../../_services/segment.service";
import {GlobalFilter, GlobalFilterType} from "../../../_models/segment";
import {GlobalFiltersComponent} from "../global-filters.component";

@Component({
  selector: 'app-global-filter',
  templateUrl: './global-filter.component.html',
  styleUrls: ['./global-filter.component.scss']
})
export class GlobalFilterComponent implements OnInit {

  localGlobalFilter: GlobalFilter;
  @Input() get globalFilter(): GlobalFilter {
    return this.localGlobalFilter;
  }
  set globalFilter(globalFilter: GlobalFilter) {
    this.localGlobalFilter = globalFilter;
    this.globalFilterChange.emit(this.localGlobalFilter);
  }
  @Output() globalFilterChange = new EventEmitter();

  globalFiltersMetadata: any;
  firstDropDown: string[];
  secondDropDown: any[];
  firstFilterSelected: string;
  secondFilterSelected: string;
  secondFilterDataType: string;
  options: any[];
  maxOrder: number = 0;

  _parentRef: GlobalFiltersComponent;
  _ref: any;

  removeObject(){
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

    const index = this._parentRef.globalFilters.indexOf(this.globalFilter);
    if (index != -1) {
      this._parentRef.globalFilters.splice(index, 1);
    }
  }

  constructor(private segmentService: SegmentService) {
    this.globalFiltersMetadata = this.segmentService.globalFiltersMetadata;
  }

  ngOnInit() {
    this.firstDropDown = Object.keys(this.globalFiltersMetadata);
    console.log(this.firstDropDown);
  }

  getSecondFilters(): string[] {
    return Object.keys(this.globalFiltersMetadata[this.firstFilterSelected]);
  }

  firstFilterChanged(name: string) {
    this.firstFilterSelected = name;
    this.globalFilter.globalFilterType = GlobalFilterType[name];
    this.secondDropDown = this.getDropdownList(1);
    this.secondFilterSelected = this.secondDropDown[0]['propertyName'];
    this.globalFilter.name = this.secondFilterSelected;
    this.maxOrder = 1;
  }

  secondFilterChanged(name: string) {
    this.secondFilterSelected = name;
    this.globalFilter.name = name;
    this.globalFilter.values = [];
    // console.log(this.globalFilter.values);
    for(let filter of this.globalFiltersMetadata[this.firstFilterSelected]) {
      if(filter["propertyName"] == this.secondFilterSelected) {
        this.secondFilterDataType = filter["propertyType"];
        this.options = filter["options"];
        this.globalFilter.type = this.secondFilterDataType;
      }
    }
    this.maxOrder = 2;
  }


  getDropdownList(order: number): any[] {
    switch (order) {
      case 0:
        return Object.keys(this.globalFiltersMetadata);
      case 1:
        // if(this.firstFilterSelected == "Geography")
        //   return this.segmentService.getCountries().subscribe();
        var filters = this.globalFiltersMetadata[this.firstFilterSelected];
        console.log(filters);
        return filters;
    }
  }
}
