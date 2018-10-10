export class Segment {
  id: number;
  name: string;
  type: string;
  creationDate: string;
  conversionEvent: string;
  didEvents: DidEvents;
  didNotEvents: DidEvents;
  globalFilters: GlobalFilter[];
  geographyFilters: Geography[];
}

export interface SegmentMini {
  id: number;
  name: string;
}

export class DidEvents {
  description: string;
  joinCondition: JoinCondition;
  events: Event[];
}

export class JoinCondition {
  anyOfCount: number;
  conditionType: string; // AllOf / AnyOf
}

export class Event {
  name: string;
  dateFilter: DateFilter;
  propertyFilters: PropertyFilter[];
  whereFilter: WhereFilter;
}

export class DateFilter {
  operator: DateOperator;
  values: string[];
  valueUnit: string;
}

export class PropertyFilter {
  name: string;
  type: PropertyType;
  filterType: PropertyFilterType;
  operator: string;
  values: string[];
  valueUnit: string;
}

export enum PropertyType {
  string = "string",
  number = "number",
  date = "date"
}

export enum PropertyFilterType {
  eventproperty = "eventproperty",
  genericproperty = "genericproperty",
  UTM = "UTM"
}

export class WhereFilter {
  whereFilterName: WhereFilterName;
  propertyName: string;
  operator: NumberOperator;
  values: number[]
}

export enum WhereFilterName {
  Count = "Count",
  SumOfValuesOf = "SumOfValuesOf"
}

export enum DateOperator {
  Before = "Before",
  After = "After",
  On = "On",
  Between = "Between",
  InThePast = "InThePast",
  WasExactly = "WasExactly",
  Today = "Today",
  InTheFuture = "InTheFuture",
  WillBeExactly = "WillBeExactly"
}

export enum NumberOperator {
  Equals = "Equals",
  Between = "Between",
  GreaterThan = "GreaterThan",
  LessThan = "LessThan",
  NotEquals = "NotEquals",
  Exists = "Exists",
  DoesNotExist = "DoesNotExist"
}

export enum StringOperator {
  Equals = "Equals",
  NotEquals = "NotEquals",
  Contains = "Contains",
  DoesNotContain = "DoesNotContain",
  Exists = "Exists",
  DoesNotExist = "DoesNotExist"
}

export class GlobalFilter {
  globalFilterType: GlobalFilterType;
  name: string;
  type: string;
  operator: string;
  values: any[] = [];
  valueUnit: string;
}

export enum GlobalFilterType {
  UserProperties = "UserProperties",
  Demographics = "Demographics",
  Technographics = "Technographics",
  Reachability = "Reachability",
  AppFields = "AppFields",
  UserIdentity = "UserIdentity",

  //FIXME: To be reviewed, if it wourk well in UI, copied from the BE
  EventProperties = "EventProperties",
  EventAttributeProperties = "EventAttributeProperties",
  EventTimeProperties = "EventTimeProperties",
  EventComputedProperties = "EventComputed",
  UserComputedProperties = "UserComputed"


}

export class Geography {
  country: Country;
  state: State;
  city: City;
}

export class Country {
  id: number;
  name: string;
}

export class State {
  id: number;
  name: string;
}

export class City {
  id: number;
  name: string;
}

export class RegisteredEvent {
  name: string;
  properties: RegisteredEventProperties[];
}

export class RegisteredEventProperties {
  name: string;
  dataType: string;
  regex: string;
  options: any[];
}

export class GlobalFilterItem {
  value: string;
  displayName: string;
  type: string;
}
