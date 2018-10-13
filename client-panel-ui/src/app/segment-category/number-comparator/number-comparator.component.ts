import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SegmentService} from "../../_services/segment.service";
import {NumberOperator} from "../../_models/segment";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-number-comparator',
  templateUrl: './number-comparator.component.html',
  styleUrls: ['./number-comparator.component.scss']
})
export class NumberComparatorComponent implements OnInit {

  @Input() options: string[];
  numberComparatorMetadata: any;
  @Input() numberComparatorOperators: string[];
  private singleFieldRequiredComparators: string[] = ["Equals", "NotEquals", "GreaterThan", "LessThan"];
  private doubleFieldRequiredComparators: string[] = ["Between"];
  private noFieldRequiredComparators: string[] = ["Exists", "DoesNotExist"];
  field1Required: boolean = true;
  field2Required: boolean = false;

  private localOperator: NumberOperator;
  @Input() get operator(): NumberOperator {
    return this.localOperator;
  }
  set operator(operator: NumberOperator) {
    this.localOperator = operator;
    this.operatorChange.emit(this.localOperator);
  }
  @Output() operatorChange = new EventEmitter();

  private localValues: any[] = [];
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

  constructor(public segmentService: SegmentService) {
    this.numberComparatorMetadata = this.segmentService.numberComparatorMetadata;
  }

  ngOnInit() {
    if(!this.numberComparatorOperators)
      this.numberComparatorOperators = Object.keys(this.segmentService.numberComparatorMetadata);
  }

  dropdownChanged(comparator: string) {
    console.log(comparator);
    this.operator = NumberOperator[comparator];
    if (this.doubleFieldRequiredComparators.includes(comparator)) {
      this.field1Required = this.field2Required = true;
    } else if (this.singleFieldRequiredComparators.includes(comparator)) {
      this.field2Required = false;
      this.field1Required = true;
    } else {
      this.field2Required = this.field1Required = false;
    }
    this.values = [];
  }
}
