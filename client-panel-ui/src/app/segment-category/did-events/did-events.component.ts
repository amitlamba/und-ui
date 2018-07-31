import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  Type,
  ViewChild,
  ViewContainerRef, Input, Output, EventEmitter
} from '@angular/core';
import {DidEventComponent} from "./did-event/did-event.component";
import {DateFilter, DidEvents, Event, JoinCondition, WhereFilter} from "../../_models/segment";
import {SegmentService} from "../../_services/segment.service";
import {MessageService} from "../../_services/message.service";


@Component({
  selector: 'app-did-events',
  templateUrl: './did-events.component.html',
  styleUrls: ['./did-events.component.scss']
})
export class DidEventsComponent implements OnInit {

  private localDidEvents: DidEvents;

  @Input() get didEvents(): DidEvents {
    return this.localDidEvents;
  }

  set didEvents(didEvents: DidEvents) {
    this.localDidEvents = this.didEvents;
    this.didEventsChange.emit(this.localDidEvents);
  }

  // the name is an Angular convention, @Input variable name + "Change" suffix
  @Output() didEventsChange = new EventEmitter();

  @Input() didNotEvent: boolean = false;

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  components = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private segmentService: SegmentService,
              private messageService: MessageService) {
    // this.segmentService.getEvents().subscribe(
    //   (response) => {
    //     this.segmentService.cachedRegisteredEvents = response;
    //     this.registeredEvents = this.segmentService.cachedRegisteredEvents;
    //     if(this.registeredEvents == null || this.registeredEvents.length==0) {
    //       this.messageService.addDangerMessage("No Events Metadata available. Will be Dummy data.");
    //       this.registeredEvents = this.segmentService.sampleEvents;
    //     }
    //     this.defaultProperties = this.segmentService.defaultEventProperties;
    //     this.eventProperties = this.registeredEvents[0].properties;
    //     this.eventNameChanged(0);
    //   }
    // );
  }
  ngOnInit(){
    if(!this.didNotEvent) {
      this.localDidEvents = this.segmentService.editSegment.didEvents;
      this.localDidEvents.joinCondition = new JoinCondition();
      this.localDidEvents.joinCondition.conditionType = "AllOf";
    }
    else {
      this.localDidEvents = this.segmentService.editSegment.didNotEvents;
      this.localDidEvents.joinCondition = new JoinCondition();
      this.localDidEvents.joinCondition.conditionType = "AnyOf";
    }
  }
  addComponent() {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DidEventComponent);
    const component = this.container.createComponent(componentFactory);

    component.instance._ref = component;
    component.instance.hideWhere = this.didNotEvent;
    component.instance._parentRef = this;
    var newDidEvent = new Event();
    newDidEvent.dateFilter = new DateFilter();
    newDidEvent.whereFilter = new WhereFilter();
    this.didEvents.events.push(newDidEvent);
    component.instance.didEvent = newDidEvent;
    component.instance.didEventChange.subscribe((didEvent) => {
      console.log("didEventChange:" + JSON.stringify(didEvent))
    });

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }
  // removeComponent(componentClass: Type<any>) {
  //   console.log(componentClass);
  //   // Find the component
  //   const component = this.components.find((component) => component.instance instanceof componentClass);
  //   const componentIndex = this.components.indexOf(component);
  //
  //   if (componentIndex !== -1) {
  //     // Remove component from both view and array
  //     this.container.remove(this.container.indexOf(component));
  //     this.components.splice(componentIndex, 1);
  //   }
  // }
}
