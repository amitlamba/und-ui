import {
  Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {GeographyFilterComponent} from "./geography-filter/geography-filter.component";
import {SegmentService} from "../../_services/segment.service";
import {Country, Geography} from "../../_models/segment";

@Component({
  selector: 'app-geography-filters',
  templateUrl: './geography-filters.component.html',
  styleUrls: ['./geography-filters.component.scss']
})
export class GeographyFiltersComponent implements OnInit {

  localGeographyFilters: Geography[] = [];
  @Input() get geographyFilters(): Geography[] {
    return this.localGeographyFilters;
  }
  set geographyFilters(geographyFilters: Geography[]) {
    this.localGeographyFilters = geographyFilters;
    this.geographyFiltersChange.emit(this.localGeographyFilters);
  }
  @Output() geographyFiltersChange = new EventEmitter();

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  components = [];

  addUserLocationDisabled: boolean;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private segmentService: SegmentService) {
  }

  ngOnInit() {
  }

  addUserLocation() {
    this.addUserLocationDisabled = true;
    if (this.segmentService.countries) {
      this.addComponent();
    } else {
      this.segmentService.getCountries().subscribe(
        countries => {
          this.segmentService.countries=countries;
          this.addComponent();
        }
      );
    }
    this.addUserLocationDisabled = false;
  }

  addComponent() {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(GeographyFilterComponent);
    const component = this.container.createComponent(componentFactory);

    component.instance._ref = component;
    component.instance._parentRef = this;
    let geography = new Geography();
    this.geographyFilters.push(geography);
    component.instance.geographyFilter = geography;

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }
}
