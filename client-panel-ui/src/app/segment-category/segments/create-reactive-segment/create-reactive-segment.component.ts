import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {SegmentService} from "../../../_services/segment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {
  City,
  Country,
  DateFilter, DateOperator, DidEvents, Event, Geography, GlobalFilter, JoinCondition, NumberOperator, PropertyFilter,
  RegisteredEvent,
  RegisteredEventProperties,
  Segment, State,
  WhereFilter, WhereFilterName
} from "../../../_models/segment";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../../_services/message.service";
import {DaterangepickerConfig} from "ng2-daterangepicker";
import * as moment from "moment";

@Component({
  selector: 'app-create-reactive-segment',
  templateUrl: './create-reactive-segment.component.html',
  styleUrls: ['./create-reactive-segment.component.scss']
})
export class CreateReactiveSegmentComponent implements OnInit, OnDestroy {

  @ViewChild('segmentNameModal')segmentNameModel:ElementRef;
  display=false;
  segment:Segment;
  type:string='Process';
  validatedSegment:Segment;
  private segmentFormModel: FormGroup;

  constructor(private fb:FormBuilder,
              private segmentService:SegmentService,
              private router:Router) {

    this.segment=segmentService.cloneSegment;

    this.initSegmentModalForm();
  }

  ngOnInit() {}
  ngOnDestroy() {}

  save() {
    // this.validatedSegment.name=this.segmentFormModel.get('segmentName').value;
    this.validatedSegment.name="Test";
    this.segmentFormModel.reset();
    console.log(this.validatedSegment);
    this.segmentService.saveSegment(this.validatedSegment).subscribe(
      (segment) => {
        this.segmentService.segments.push(this.validatedSegment);
        this.router.navigate(['segment/segments']);
      }
    );
    this.display=false;
  }

  openPopUp(segment:Segment){
    this.validatedSegment=segment;
    console.log("segment");
    console.log(this.validatedSegment);
    this.display=true;
  }
  initSegmentModalForm() {
    this.segmentFormModel = this.fb.group({
      segmentName: [null, [Validators.required]]
    });
  }

  closeModal(){
    this.display=false;
  }
  get segmentNameControl(): FormControl {
    return <FormControl>this.segmentFormModel.get('segmentName')
  }
}
