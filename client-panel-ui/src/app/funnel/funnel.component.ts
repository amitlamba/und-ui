import {Component, Input, OnInit} from '@angular/core';
import {RegisteredEvent, RegisteredEventProperties, Segment} from "../_models/segment";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FunnelOrder, FunnelReportFilter, Step} from "../_models/reports";
import {SegmentService} from "../_services/segment.service";

@Component({
  selector: 'app-funnel',
  templateUrl: './funnel.component.html',
  styleUrls: ['./funnel.component.scss']
})
export class FunnelComponent implements OnInit {

  technographics:string[]=['os','device','browser'];
  geography:string[]=['country','state','city'];
  registerdEventProperty:RegisteredEventProperties[];
  step1Event:RegisteredEvent;
  splitproperty:string;

  @Input() funnel:FunnelReportFilter
  error:string='';
  segmentId:number;
  segments:Segment[];
  days:number;
  funnelForm:FormGroup;
  showSplitProperty:boolean=false;
  splitPropertys:string[];
  splitPropertyTypes:string[];

  registeredEvents: RegisteredEvent[];

  globalFiltersMetadata:any;
  constructor(private fb:FormBuilder,private segmentService:SegmentService) {

    this.globalFiltersMetadata = this.segmentService.cachedUserProperties.reduce(
      (ac, p) => ({...ac, [p.name]: p.properties}), {}
    );
    if (!(this.globalFiltersMetadata && this.globalFiltersMetadata.length)) {
      this.globalFiltersMetadata = segmentService.globalFiltersMetadata;
    }

    this.registeredEvents = this.segmentService.cachedRegisteredEvents;
  }

  ngOnInit() {

    this.segmentService.getSegments().subscribe(response=>{
      this.segments=response;
    });
    this.splitPropertyTypes=Object.keys(this.globalFiltersMetadata);
    if(!this.funnel) {
      this.funnel = new FunnelReportFilter();
      this.funnel.segmentid=-1;
      this.funnel.steps = [];
      this.funnel.days = 30;
      this.funnel.conversionTime=5;
      this.funnel.funnelOrder=FunnelOrder.default;
    }

    this.createFunnelForm(this.funnel);

  }

  private createFunnelForm(funnel: FunnelReportFilter) {
    this.funnelForm = this.fb.group({
      segmentid: [funnel.segmentid, Validators.required],
      days: [funnel.days, Validators.required],
      steps: this.createSteps(funnel.steps),
      funnelOrder:[funnel.funnelOrder,Validators.required],
      conversionTime:[funnel.conversionTime,Validators.required],
      // splitProperty:[funnel.splitProperty,Validators.required],
      // splitPropertyType:[funnel.splitPropertyType,Validators.required]
    });
  }

  private createSteps(steps: Step[]): FormArray {
    if(!(steps && steps.length)) {
      let step=new Step();
      step.eventName = this.registeredEvents[0].name;
      steps.push(step);
    }
    return this.fb.array(steps.map<FormGroup>((v,i,a)=> {
      return this.createStep(v);
    })
    )
  }

  private createStep(step: Step): FormGroup {
    return this.fb.group({
      order: [step.order],
      eventName: [step.eventName]
    })
  }

  get stepArray():FormArray{
    return <FormArray>this.funnelForm.get('steps');
  }
  addStep(){
    let step=new Step();
    step.eventName = this.registeredEvents[0].name;
    this.stepArray.push(this.createStep(step));
  }
  removeStep(index:number){
    this.stepArray.removeAt(index);
  }

  splitPropertyTypeChange(event){
    console.log(event);
    this.showSplitProperty=true;
    var obj=this.globalFiltersMetadata.event;
    console.log(obj);
  }

  viewFunnel(){
    //call api
    this.showSplitProperty=true;
    console.log(this.funnelForm);
    this.step1Event=this.registeredEvents.find(events=> events.name===this.funnelForm.get('steps').value[0].eventName);
    console.log(this.step1Event);
    this.registerdEventProperty=this.step1Event.properties;

  }
}
