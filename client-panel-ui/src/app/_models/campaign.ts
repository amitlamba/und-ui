import {EmailCampaign, EmailTemplate} from "./email";
import {SmsTemplate} from "./sms";
import {AndroidTemplate, WebPushTemplate} from "./notification";

export class Campaign {
  id: number;
  name: string;
  schedule: Schedule;
  campaignType: CampaignType;
  segmentationID: number;
  templateID: number;
  status: CampaignStatus;
  dateCreated: string;
  conversionEvent: string;
  serviceProviderId: number;
  fromUser: string;
  clientEmailSettingId: number;
  liveSchedule: LiveSchedule;
  typeOfCampaign: string;
  abCampaign: AbCampaign;
  variants: Variant[] = [];
  // createdOn: Date;
  // clientID: number;
  // appuserID: number;
  // frequencyType: FrequencyType;
  // campaignStatus: EmailDeliveryStatus;
  // campaignStatus: DeliveryStatus;
  // emailCampaign: EmailCampaign;
  // smsCampaign: SmsCampaign;
}

export class AbCampaign {
  id: number;
  campaignId: number;
  campaign: Campaign;
  variants: Variant[] = [];
  runType: RunType;
  remind: boolean;
  waitTime: number;
  sampleSize: number;
}

export class Variant {
  id: number;
  campaignId: number;
  percentage: number;
  name: string;
  users: number;
  winner: boolean = false;
  templateId: number;
}

export enum RunType {
  MANUAL = "MANUAL",
  AUTO = "AUTO"
}

export enum typeOfCampaign {
  AB_TEST = "AB_TEST",
  NORMAL = "NORMAL"

}

export class LiveSchedule {
  nowOrLater: Now = Now.Now;
  startTime: CampaignDateTime;
  endTime: CampaignDateTime;
}

export enum CampaignStatus {
  PAUSED = "PAUSED",
  RESUMED = "RESUMED",
  CREATED = "CREATED",
  ERROR = "ERROR",
  SCHEDULE_PENDING = "SCHEDULE_PENDING",
  SCHEDULE_ERROR = "SCHEDULE_ERROR",
  DELETED = "DELETED",
  STOPPED = "STOPPED",
  COMPLETED = "COMPLETED",
  FORCE_PAUSED = "FORCE_PAUSED"

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
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH_ANDROID = "PUSH_ANDROID",
  PUSH_WEB = "PUSH_WEB",
  PUSH_IOS = "PUSH_IOS"
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

export class ClientFromAddressAndSrp {

  settings: Map<string, Array<number>>
}

export class ServiceProvider {
  id: number;
  name: string;
}

export class ClientEmailSettIdFromAddrSrp {
  fromAddress: string;
  ceid: number;
  srpName: string;
}

export class TestCampaign {
  emailTemplate: EmailTemplate = null;
  smsTemplate: SmsTemplate = null;
  androidTemplate: AndroidTemplate = null;
  webPushTemplate: WebPushTemplate = null;
  findByType: string = null; //Valid Values "Email", "UserNDot ID", "Mobile Number", "Client User ID", "TOKEN"
  toAddresses: string = null;
  campaignType: CampaignType;
  segmentationID: number = null;
  serviceProviderId: number = null;
  fromUser: string = null;
  clientEmailSettingId: number = null;
}
