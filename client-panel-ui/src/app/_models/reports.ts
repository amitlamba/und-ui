import {GlobalFilter, GlobalFilterType} from "./segment";

export class TrendByTime {
  usercount: number;
  time: number;
}

export class TrendTimeSeries {
  date: string;
  trenddata: Array<TrendByTime>;
}

export class AggregateBy {
  globalFilterType: GlobalFilterType = GlobalFilterType.EventAttributeProperties;
  name: string = "";
  aggregationType: AggregationType = AggregationType.Sum;
}

enum AggregationType {
  Avg = "Avg",
  Sum = "Sum"
}

export class UserCountByTime {
  newusercount: number;
  oldusercount: number;
  time: number;
}

export class UserCountTimeSeries {
  date: string;
  userCountData: Array<UserCountByTime>;
}

export class UserCountByEvent {
  usercount: number;
  eventname: string;
}

export class UserCountByEventTimeSeries {
  date: string;
  userCountData: Array<UserCountByEvent>;
}

export class TrendCount {
  usercount: number;
  name: string;
}

export class UserCountForProperty {
  usercount: number;
  groupedBy: Map<string, any>;
}

export class UserCountTrendForDate {
  date: string;
  trenddata: Array<UserCountForTime>;
}

export class UserCountForTime {
  usercount: number;
  time: number;
}

export class UserTypeTrendForDate {
  date: string;
  userCountData: Array<UserCountByTypeForTime>;
}

export class UserCountByTypeForTime {
  newusercount: number;
  oldusercount: number;
  time: number;
}

export class UserCountByEventForDate {
  date: string;
  userCountData: Array<UserCountByEvent>;
}

export class EventUserTable {
  eventName: string;
  count: Array<number> = [];
}

export class FunnelReportFilter {
  segmentid: number;
  days: number;
  conversionTime: number;
  steps: Array<Step>;
  funnelOrder: FunnelOrder;
  splitProperty: string = "None";
  splitPropertyType = GlobalFilterType.EventAttributeProperties;
  filters: Array<GlobalFilter> = [];
}

export enum FunnelOrder {
  strict = "strict",
  default = "default"
}

export class Step {
  order: number;
  eventName: string;
}

export class FunnelStep {
  step: Step;
  count: number;
  property: string;
}

export class EventReportFilter {
  segmentid: number;
  fromDate: string;
  toDate: string;
  eventName: string;
  propFilter: Array<GlobalFilter>
}


export class EventCount {
  count: number;
  groupedBy: Map<string, any>
}

export class EventPeriodCount {
  count: number;
  period: Map<string, any>
}

export class EventUserFrequency {
  usercount: number;
  eventcount: number;
}

export class EventTimeFrequency {
  eventCount: number;
  hour: number;
}

export class Aggregate {
  sum: number;
  period: Map<string, any>;
}

export enum PERIOD {
  dayOfMonth = "daily", dayOfWeek = "weekly", month = "monthly"
}

export enum EntityType {
  event = "event", user = "user"
}

export class GroupBy {
  globalFilterType: string;
  name: string;
}

export interface ChartSeriesData {
  showInLegend: boolean;
  seriesName: string;
  data: number[];
}

export class Reachability {
  totalUser: number | null;
  email: number;
  sms: number;
  webpush: number;
  android: number;
  ios: number;
}

export class CampaignReach {
  delivered: number;
  failed: number;
  read: number;
  interacted: number;
}

/*
data class SegmentTrendCount(var date:String,var count:Count)

data class Count(val known:Int,val unknown:Int,val all:Int)
 */
export class SegmentCount {
  date: string;
  count: Count;
}

export class Count {
  known: number;
  unknown: number;
  all: number;
}

export class LiveSegmentReportCount {
  countPerDay: CountPerDay[];
  totalUsers: number;
  totalUniqueUsers: number;
}

export class CountPerDay {
  totalUsersPerDay: number;
  uniqueUsersPerDay: number;
  date: string;
}

export class LiveSegmentCount {
  known:number;
  unknown: number;
}
