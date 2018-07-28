import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DaterangepickerConfig} from "ng2-daterangepicker";
import {
  DateFilter,
  DateOperator,
  Event,
  NumberOperator,
  PropertyFilter,
  RegisteredEvent,
  RegisteredEventProperties,
  WhereFilter,
  WhereFilterName
} from "../../../_models/segment";
import {SegmentService} from "../../../_services/segment.service";
import {FilterComponent} from "./filter/filter.component";
import {DidEventsComponent} from "../did-events.component";
import * as moment from "moment";
import {MessageService} from "../../../_services/message.service";

@Component({
  selector: 'app-did-event',
  templateUrl: './did-event.component.html',
  styleUrls: ['./did-event.component.scss']
})
export class DidEventComponent implements OnInit {

  @Input() hideWhere: boolean = false;

  private localDidEvent: Event;
  @Input() get didEvent(): Event {
    return this.localDidEvent;
  }

  set didEvent(didEvent: Event) {
    this.localDidEvent = didEvent;
    this.didEventChange.emit(this.localDidEvent);
  }

  // the name is an Angular convention, @Input variable name + "Change" suffix
  @Output() didEventChange = new EventEmitter();

  registeredEvents:RegisteredEvent[] = [];
  defaultProperties: RegisteredEventProperties[];
  eventProperties: RegisteredEventProperties[];
  hideElementDatepicker = false;
  hideElementDaterangepicker = true;
  hideElementDaySelector = true;
  removeElement = false;
  hideElementInput = true;
  public singleDate: any;
  eventSelected: boolean = true;

  _ref:any;
  _parentRef: DidEventsComponent;
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  components = [];

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

    const index = this._parentRef.didEvents.events.indexOf(this.didEvent);
    if (index != -1) {
      this._parentRef.didEvents.events.splice(index, 1);
    }
  }

  constructor(private daterangepickerOptions: DaterangepickerConfig, private segmentService: SegmentService,
              private componentFactoryResolver: ComponentFactoryResolver, private messageService: MessageService) {
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

  ngOnInit() {
    this.eventNameChanged(0);
  }

  // private getCachedRegisteredEvents(): RegisteredEvent[] {
  //   if(!this.segmentService.cachedRegisteredEvents) {
  //     this.segmentService.getEvents().subscribe(
  //       (response) => {
  //         this.segmentService.cachedRegisteredEvents = response;
  //         this.registeredEvents = this.segmentService.cachedRegisteredEvents;
  //       }
  //     );
  //   }
  //   return this.segmentService.cachedRegisteredEvents;
  // }

  eventNameChanged(val:any) {
    this.eventProperties = this.registeredEvents[val].properties;
    this.removeAllPropertyFilters();
    this.eventSelected = true;
    console.log(this.registeredEvents[val].name);
    this.didEvent.name = this.registeredEvents[val].name;
    this.didEvent.dateFilter = new DateFilter();
    this.didEvent.dateFilter.operator = DateOperator.Before;
    this.didEvent.dateFilter.values = [this.getCurrentFormattedDate()];
    this.didEvent.propertyFilters = [];
    if (!this.hideWhere) {
      this.didEvent.whereFilter = new WhereFilter();
      this.didEvent.whereFilter.operator = NumberOperator.GreaterThan;
      this.didEvent.whereFilter.values = [0];
      this.countDropdown("Count");
    }
  }

  private getCurrentFormattedDate(): string {
    return moment().format('YYYY-MM-DD')
  }

  addPropertyFilter() {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FilterComponent);
    const component = this.container.createComponent(componentFactory);

    component.instance._ref = component;
    component.instance.defaultProperties = this.defaultProperties;
    component.instance.eventProperties = this.eventProperties;
    component.instance._parentRef = this;

    var propertyFilter = new PropertyFilter();
    this.didEvent.propertyFilters.push(propertyFilter);
    component.instance.propertyFilter = propertyFilter;

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }

  removeAllPropertyFilters() {
    for(let fc of this.components) {
      fc.destroy();
    }
    this.components=[];
  }

  public singlePicker = {
    singleDatePicker: true,
    showDropdowns: true,
    opens: "right"
  };

  model: any = {
    beginDate: {year: 2018, month: 10, day: 9},
    endDate: {year: 2018, month: 10, day: 19}
  };

  hidePropertySumFilter = true;

  countDropdown(val: any) {
    if (val == 'SumOfValuesOf') {
      this.localDidEvent.whereFilter.whereFilterName = WhereFilterName.SumOfValuesOf;
      this.hidePropertySumFilter = false;
    }
    else {
      this.localDidEvent.whereFilter.whereFilterName = WhereFilterName.Count;
      this.hidePropertySumFilter = true;
    }
  }

  getNumberTypeEventProperties(): RegisteredEventProperties[] {
    return this.eventProperties.filter((data)=>{return data.dataType=='number'});
  }
}
