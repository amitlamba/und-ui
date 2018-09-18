import {GlobalFilter} from "./segment";

export class TrendByTime{
  usercount: number;
  time:number;
}

export class TrendTimeSeries{
  date: string;
  trenddata:Array<TrendByTime>
}

export class UserCountByTime{
  newusercount: number;
  oldusercount: number;
  time:number
}

export class UserCountTimeSeries{
  date:string;
  userCountData:Array<UserCountByTime>;
}

export class UserCountByEvent{
  usercount:number;
  eventname:string;
}

export class UserCountByEventTimeSeries{
  date:string;
  userCountData:Array<UserCountByEvent>;
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

export class EventUserTable{
  eventName:string;
  count:Array<number> = [];
}



export class EventReportFilter{segmentid:number; fromDate: string; toDate: string; eventName: string; propFilter: Array<GlobalFilter>}


export class EventCount{
  count:number;
  groupedBy: Map<string, any>
};
export class EventPeriodCount{
  count: number;
  period: Map<string, any>
}

export class EventUserFrequency{
  usercount:number;
  eventcount:number;
}
export class EventTimeFrequency {
  eventCount: number;
  hour: number;
}

export class Aggregate {
  sum: number;
  period: Map<string,any>;
}

export enum PERIOD {
  daily="daily", weekly="weekly", monthly="monthly"
};

export enum EntityType {
  event="event", user="user"
};

export class GroupBy {
  globalFilterType: string;
  name: string;
}

export interface ChartSeriesData {
  showInLegend:boolean;
  seriesName: string;
  data: number[];
}
