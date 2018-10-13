import {EmailCampaign} from "./email";

export class Campaign {
  id: number;
  name: string;
  schedule: Schedule;
  campaignType: CampaignType;
  segmentationID: number;
  templateID: number;
  status: CampaignStatus;
  dateCreated: string;
  // createdOn: Date;
  // clientID: number;
  // appuserID: number;
  // frequencyType: FrequencyType;
  // campaignStatus: EmailDeliveryStatus;
  // campaignStatus: DeliveryStatus;
  // emailCampaign: EmailCampaign;
  // smsCampaign: SmsCampaign;
}

export enum CampaignStatus {
  PAUSED="PAUSED",
  RESUMED="RESUMED",
  CREATED="CREATED",
  ERROR="ERROR",
  SCHEDULE_PENDING="SCHEDULE_PENDING",
  SCHEDULE_ERROR="SCHEDULE_ERROR",
  DELETED="DELETED",
  STOPPED="STOPPED",
  COMPLETED="COMPLETED",
  FORCE_PAUSED="FORCE_PAUSED"

}
export enum DeliveryStatus {
  NOT_SCHEDULED,
  SCHEDULED,
  IN_PROCESS,
  DELIVERED
}

export enum FrequencyType {
  ONCE,
  REPETITIVE
}

export enum CampaignType {
  EMAIL="EMAIL",
  SMS="SMS",
  MOBILE_PUSH_NOTIFICATION="MOBILE_PUSH_NOTIFICATION"
}



//new
export class Schedule {
  oneTime: ScheduleOneTime;
  multipleDates: ScheduleMultipleDates;
  recurring: ScheduleRecurring;
}

export class ScheduleOneTime {
  nowOrLater: Now;
  campaignDateTime: CampaignDateTime;
}

export class ScheduleMultipleDates {
  campaignDateTimeList: CampaignDateTime[];
}

export class ScheduleRecurring {
  cronExpression: string;
  scheduleStartDate: string;
  scheduleEnd: ScheduleEnd;
}
//new end

export class ScheduleEnd {
  endType: ScheduleEndType;
  endsOn: string;
  occurrences: number;
}

export enum ScheduleEndType {
  "NeverEnd" = "NeverEnd",
  "EndsOnDate" = "EndsOnDate",
  "Occurrences" = "Occurrences"
}

export enum ScheduleType {
  oneTime = "oneTime",
  multipleDates = "multipleDates",
  recurring = "recurring"
}

export class CampaignDateTime {
  date: string;
  hours: number;
  minutes: number;
  ampm: AmPm;
}

export enum Now {
  "Now" = "Now",
  "Later" = "Later"
}

export enum AmPm {
  AM = "AM",
  PM = "PM"
}
