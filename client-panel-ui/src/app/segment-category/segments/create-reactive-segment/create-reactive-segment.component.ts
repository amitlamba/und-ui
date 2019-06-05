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
import {UndTrackingService} from "../../../_services/und-tracking.service";

@Component({
  selector: 'app-create-reactive-segment',
  templateUrl: './create-reactive-segment.component.html',
  styleUrls: ['./create-reactive-segment.component.scss']
})
export class CreateReactiveSegmentComponent implements OnInit, OnDestroy {

  @ViewChild('segmentNameModal') segmentNameModel: ElementRef;
  display = false;
  segment: Segment;
  SegmentType: string;
  type: string = 'Process';
  validatedSegment: Segment;
  segmentFormModel: FormGroup;

  withAction: boolean = false;
  withInaction: boolean = false;
  withUserProperties: boolean = false;

  constructor(private fb: FormBuilder,
              private segmentService: SegmentService,
              private router: Router,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private undtrackingService: UndTrackingService) {

    if (this.segmentService.cloneSegment) {
      this.segment = segmentService.cloneSegment;
    }

    this.initSegmentModalForm();
  }

  ngOnInit() {
    this.withAction = this.route.snapshot.queryParams["a"] == 1;
    this.withInaction = this.route.snapshot.queryParams["i"] == 1;
    this.withUserProperties = this.route.snapshot.queryParams["u"] == 1;
    this.compareSegmentType();
  }

  ngOnDestroy() {
  }

  save() {
    this.validatedSegment.name = this.segmentFormModel.get('segmentName').value.trim();
    this.segmentFormModel.reset();
    console.log(this.validatedSegment);
    this.segmentService.saveSegment(this.validatedSegment).subscribe(
      (segment) => {
        this.segmentService.segments.push(this.validatedSegment);
        this.router.navigate(['segment/segments']);
      },
      (error) => {
        console.log(error);
        this.messageService.addDangerMessage(error.error.error);
      }
    );
    this.display = false;
    this.undtrackingService.trackEvent("Segment", {
      'Action': 'Create Begin', 'Segment Type': this.SegmentType,
      'Segment Category': this.validatedSegment.type,
      'SegmentId': this.validatedSegment.id,
      'SegmentName': this.validatedSegment.name
    })
    console.log(this.SegmentType);
  }

  openPopUp(segment: Segment) {
    this.validatedSegment = segment;
    console.log("segment");
    console.log(this.validatedSegment);
    this.display = true;
  }

  initSegmentModalForm() {
    this.segmentFormModel = this.fb.group({
      segmentName: [null, [Validators.required]]
    });
  }

  closeModal() {
    this.display = false;
  }

  compareSegmentType() {
    if (this.withInaction) {
      return this.SegmentType = "Based On Inaction";
    } else if (this.withAction) {
      return this.SegmentType = "Based On Action";
    } else if (this.withUserProperties) {
      return this.SegmentType = "Based On Properties";
    }
  }

  get segmentNameControl(): FormControl {
    return <FormControl>this.segmentFormModel.get('segmentName')
  }
}
