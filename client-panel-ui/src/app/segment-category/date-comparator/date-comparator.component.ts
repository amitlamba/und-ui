import {
  AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit,
  Output, ViewChild
} from '@angular/core';
import {SegmentService} from "../../_services/segment.service";
import {DaterangepickerConfig} from "ng2-daterangepicker";
import * as moment from "moment";
import {DateFilter, DateOperator} from "../../_models/segment";
import {createViewChild} from "@angular/compiler/src/core";
import {FormGroup} from "@angular/forms";

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-date-comparator',
  templateUrl: './date-comparator.component.html',
  styleUrls: ['./date-comparator.component.scss']
})
export class DateComparatorComponent implements OnInit {


  hideElementDatepicker = false;
  hideElementDaterangepicker = true;
  hideElementDaySelector = true;
  hideWasExactlyDaySelector = true;
  hideWillBeExactlyDaySelector = true;
  removeElement = false;

  private localOperator: DateOperator;

  @Input() get operator(): DateOperator {
    return this.localOperator;
  }

  set operator(operator: DateOperator) {
    this.localOperator = operator;

    this.operatorChange.emit(this.localOperator);
  }

  @Output() operatorChange = new EventEmitter();

  private localValues: any[];

  @Input() get values(): any[] {
    return this.localValues;
  }

  set values(values: any[]) {
    this.localValues = values;
    this.valuesChange.emit(this.localValues);
  }

  @Output() valuesChange = new EventEmitter();

  private localValueUnit: string;

  @Input() get valueUnit(): string {
    return this.localValueUnit;
  }

  set valueUnit(valueUnit: string) {
    this.localValueUnit = valueUnit;
    this.valueUnitChange.emit(this.localValueUnit);
  }

  @Output() valueUnitChange = new EventEmitter();

  @Input() removeComparators = [];

  dateComparatorMetadata: any;
  absoluteDateComparatorMetadata: string[];
  relativeDateComparatorMetadata: string[];
  timePeriodVars: string[];

  constructor(public segmentService: SegmentService, private daterangepickerOptions: DaterangepickerConfig,
              private changeDetectorRef: ChangeDetectorRef) {


    this.dateComparatorMetadata = this.segmentService.dateComparatorMetadata;
    this.absoluteDateComparatorMetadata = Object.keys(this.segmentService.dateComparatorMetadata.Absolute);
    this.relativeDateComparatorMetadata = Object.keys(this.segmentService.dateComparatorMetadata.Relative);
    this.timePeriodVars = Object.keys(this.segmentService.timePeriod);

    this.daterangepickerOptions.settings = {
      locale: {format: 'YYYY-MM-DD'},
      alwaysShowCalendars: false
    };

  }

  public multiPicker = {
    singleDatePicker: false,
    showDropdowns: true,
    opens: "center",
    startDate: moment(),
    maxDate: moment(),
    ranges: {
      "Today": [moment(), moment().add("0", "day")],
      "Yesterday": [moment().subtract("1", "day"), moment().subtract("1","day")],
      "Last 7 Days": [moment().subtract("7", "day"), moment().subtract("1","day")],
      "Last 30 Days": [moment().subtract("30", "day"), moment().subtract("1","day")],
      "Last Month": [moment().subtract("1", "month").subtract(moment().date() - 1, "day"), moment().subtract(moment().date(), "day")],
    }
  };

  public singlePicker = {
    singleDatePicker: true,
    showDropdowns: true,
    maxDate: moment(),
    opens: "right",
    locale: {
      format: "YYYY-MM-DD"
    }
  };
  @ViewChild('singleDatePicker') singleDatePicker;

  selectedDate(value, daterange) {
    console.log(value);
    console.log(daterange);
    let values = [];
    values[0] = (<moment.Moment>value.start).format("YYYY-MM-DD");
    values[1] = (<moment.Moment>value.end).format("YYYY-MM-DD");
    this.localValues = values;
    this.values = this.localValues;
  }
  singleSelect(value: any) {
    console.log(value);
    let values = [];
    console.log("inside single select");
    values[0] = (<moment.Moment>value.start).format("YYYY-MM-DD");
    console.log(values[0]);
    this.localValues = values;
    this.values = this.localValues;
  }

  ngOnInit() {
    if(!this.localValues){
      this.values = [moment().startOf('day').format("YYYY-MM-DD")];
      console.log(this.values);
    }
    if(!this.localOperator)
    {
      this.operator = DateOperator.Before;

    }else{
      this.dropdownChanged(this.operator);
    }

    this.changeDetectorRef.detectChanges();
    console.log(moment().startOf('day').format("YYYY-MM-DD"));

    this.relativeDateComparatorMetadata = this.relativeDateComparatorMetadata.filter((v)=>{return !this.removeComparators.includes(v)});
    this.absoluteDateComparatorMetadata = this.absoluteDateComparatorMetadata.filter((v)=>{return !this.removeComparators.includes(v)});
  }

  resetOperatorValuesArray() {
    this.values = [];
    this.values[0] = 1;
  }

  dropdownChanged(val: string) {
    if (val == 'Between') {
      this.hideElementDaterangepicker = false;
      this.hideElementDatepicker = true;
      this.hideElementDaySelector = true;
      this.hideWasExactlyDaySelector = true;
      this.hideWillBeExactlyDaySelector = true;
      if(this.values.length>0) {
        this.selectedDate({start: moment(this.values[0]), end: moment(this.values[1])}, null);
      }else {
        this.selectedDate({start: moment().startOf('day'), end: moment().endOf('day')}, null);
      }
    } else if (this.absoluteDateComparatorMetadata.includes(val)) {
      this.hideElementDaterangepicker = true;
      this.hideElementDatepicker = false;
      this.hideElementDaySelector = true;
      this.hideWasExactlyDaySelector = true;
      this.hideWillBeExactlyDaySelector = true;
      if(this.values.length>0){
        this.values = this.values;
        this.singleSelect({start: moment(this.values[0])});
      }else{
        this.values = [];
        this.singleSelect({start: moment().startOf('day')});
      }

    } else if (["Today"].includes(val)) {
      this.hideElementDaySelector = true;
      this.hideElementDatepicker = true;
      this.hideElementDaterangepicker = true;
      this.hideWasExactlyDaySelector = true;
      this.hideWillBeExactlyDaySelector = true;
      this.values = [];
    } else if (["WasExactly"].includes(val)) {
      this.hideElementDaySelector = true;
      this.hideElementDatepicker = true;
      this.hideElementDaterangepicker = true;
      this.hideWasExactlyDaySelector = false;
      this.hideWillBeExactlyDaySelector = true;
      this.resetOperatorValuesArray();
    } else if (["WillBeExactly"].includes(val)) {
      this.hideElementDaySelector = true;
      this.hideElementDatepicker = true;
      this.hideElementDaterangepicker = true;
      this.hideWasExactlyDaySelector = true;
      this.hideWillBeExactlyDaySelector = false;
      this.resetOperatorValuesArray();
    } else {
      this.hideElementDaySelector = false;
      this.hideElementDatepicker = true;
      this.hideElementDaterangepicker = true;
      this.hideWasExactlyDaySelector = true;
      this.hideWillBeExactlyDaySelector = true;
      this.resetOperatorValuesArray();
    }
    this.operator = DateOperator[val];
  }

}
