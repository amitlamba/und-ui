import {
  Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {SegmentService} from "../../_services/segment.service";
import {City, Country, GlobalFilter, GlobalFilterItem, State} from "../../_models/segment";
import {GlobalFilterComponent} from "./global-filter/global-filter.component";

@Component({
  selector: 'app-global-filters',
  templateUrl: './global-filters.component.html',
  styleUrls: ['./global-filters.component.scss']
})
export class GlobalFiltersComponent implements OnInit {

  localGlobalFilters: GlobalFilter[] = [];
  @Input() get globalFilters(): GlobalFilter[] {
    return this.localGlobalFilters;
  }
  set globalFilters(globalFilters: GlobalFilter[]) {
    this.localGlobalFilters = this.globalFilters;
    this.globalFiltersChange.emit(this.localGlobalFilters);
  }
  @Output() globalFiltersChange = new EventEmitter();

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  components = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  addComponent() {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(GlobalFilterComponent);
    const component = this.container.createComponent(componentFactory);

    component.instance._ref = component;
    component.instance._parentRef = this;
    var globalFilter = new GlobalFilter();
    this.globalFilters.push(globalFilter);
    component.instance.globalFilter = globalFilter;

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }
}
