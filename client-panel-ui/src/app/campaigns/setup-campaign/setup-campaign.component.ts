import {ComponentFactoryResolver, OnChanges, SimpleChanges, ViewContainerRef} from '@angular/core';
import {Component, OnInit, ViewChild} from '@angular/core';
import {SegmentService} from "../../_services/segment.service";
import {DateTimeComponent} from "./date-time/date-time.component";
import {
  Campaign, CampaignDateTime, CampaignType, ClientEmailSettIdFromAddrSrp, ClientFromAddressAndSrp, Now, Schedule,
  ScheduleEnd, ScheduleEndType,
  ScheduleMultipleDates,
  ScheduleOneTime, ScheduleRecurring,
  ScheduleType, ServiceProvider
} from "../../_models/campaign";
import {CronOptions} from "../../cron-editor/CronOptions";
import {TemplatesService} from "../../_services/templates.service";
import {SmsTemplate} from "../../_models/sms";
import {RegisteredEvent, Segment, SegmentMini} from "../../_models/segment";
import * as moment from "moment";
import {ActivatedRoute, Router} from "@angular/router";
import {Email, EmailTemplate} from "../../_models/email";
import {CampaignService} from "../../_services/campaign.service";
import {MessageService} from "../../_services/message.service";
import cronstrue from "cronstrue";
import {FormBuilder} from "@angular/forms";
import {AndroidTemplate, WebPushTemplate} from "../../_models/notification";
import {ServiceProviderCredentials} from "../../_models/client";
import {SettingsService} from "../../_services/settings.service";

@Component({
  selector: 'app-setup-campaign',
  templateUrl: './setup-campaign.component.html',
  styleUrls: ['./setup-campaign.component.scss']
})
export class SetupCampaignComponent implements OnInit {
  currentPath: string;
  // showScheduleForm: boolean = false;
  setupCampaignPage: number = 1; //1,2 and 3
  showCloseButton: boolean = false;
  disableSubmit: boolean = false;
  invalidCron: boolean = false;
  occurencesValueFalse: boolean = false;
  cronExpression = '0 0 10 1 1/1 ? *'; //FIXME
  isCronDisabled: boolean = false;
  advanced:boolean=false;
  conversionEvents:string[]=[];
  serviceProviders:ServiceProviderCredentials[]=[];
  emailServiceProviders:ServiceProviderCredentials[]=[];
  clientEmailSettings:ClientEmailSettIdFromAddrSrp[]=[];
  clientFromAddress:string[];
  emailcmp:boolean=false;
  fromuser:string;
  cEvent:string="None";
  srpId:string="None";
  cesid:number;
  // schedule: Schedule = new Schedule();
  schedule: Schedule;
  // scheduleType: ScheduleType = ScheduleType.oneTime;
  scheduleType: ScheduleType;
  //Campaign
  smsTemplatesList: SmsTemplate[] = [];
  emailTemplatesList: EmailTemplate[] = [];
  webPushTemplatesList: WebPushTemplate[] = [];
  androidTemplatesList: AndroidTemplate[] = [];
  campaign: Campaign = new Campaign();
  campaignName: string = "";
  segmentsList: SegmentMini[] = [];


  cronOptions: CronOptions = {
    formInputClass: 'form-control cron-editor-input',
    formSelectClass: 'form-control cron-editor-select mx-1',
    formRadioClass: 'cron-editor-radio',
    formCheckboxClass: 'cron-editor-checkbox',

    defaultTime: "10:00:00",

    hideMinutesTab: false,
    hideHourlyTab: false,
    hideDailyTab: false,
    hideWeeklyTab: false,
    hideMonthlyTab: false,
    hideYearlyTab: false,
    hideAdvancedTab: false,

    use24HourTime: false,
    hideSeconds: true
  };

  // Date Picker Options
  public singlePicker = {
    singleDatePicker: true,
    showDropdowns: true,
    opens: "right",
    minDate: moment(),
    locale: {
      format: "YYYY-MM-DD"
    }
  };

  @ViewChild('parent', {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(private _cfr: ComponentFactoryResolver,
              public segmentService: SegmentService,
              private templatesService: TemplatesService,
              private route: ActivatedRoute,
              private router: Router,
              private campaignService: CampaignService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private settingsService:SettingsService) {
    // this.scheduleType = ScheduleType.oneTime;
    // this.schedule.oneTime = new ScheduleOneTime();
    // this.schedule.oneTime.nowOrLater = Now.Now;
    // this.schedule.oneTime.campaignTime = new CampaignTime();
    // this.currentPath = this.route.snapshot.url[0].path;
  }

  ngOnInit() {
    this.schedule = new Schedule();
    this.scheduleType = ScheduleType.oneTime;
    this.schedule.oneTime = new ScheduleOneTime();
    this.schedule.oneTime.nowOrLater = Now.Now;
    this.schedule.oneTime.campaignDateTime = new CampaignDateTime();
    this.currentPath = this.route.snapshot.url[0].path;
    //TODO if register event are null fetch from api
    let re:RegisteredEvent[]=JSON.parse(localStorage.getItem("registeredEvents"));
    this.conversionEvents=re.map<string>((value)=>{
       return value.name
    });
    this.conversionEvents.push("None");
    // Segments List
    this.segmentService.getSegments().subscribe(
      (segments) => {
        this.segmentService.segments = segments;
        this.segmentsList = this.segmentService.segmentMini;
      }
    );
    // Web Push Templates List
    if (this.currentPath === 'webpush') {
      this.templatesService.getWebPushTemplates().subscribe(
        (response) => {
          this.webPushTemplatesList = response;
        }
      );
      this.settingsService.getWebServiceProviders().subscribe(
        (response) => {
          this.serviceProviders = response;
        }
      );
      this.emailcmp=false;
    }
    // Android Push Templates List
    else if (this.currentPath === 'androidpush') {
      this.templatesService.getAndroidTemplates().subscribe(
        (response) => {
          this.androidTemplatesList = response;
        }
      );

      this.settingsService.getAndroidServiceProviders().subscribe(
        (response) => {
          this.serviceProviders=response;
        }
      );
      this.emailcmp=false;
    }
    // SmsTemplates List
    else if (this.currentPath === 'sms') {
      this.templatesService.getSmsTemplates().subscribe(
        (response) => {
          this.smsTemplatesList = response;
        }
      );

      this.settingsService.getSmsServiceProviders().subscribe(
        (response) => {
          this.serviceProviders=response;
        }
      );
      this.emailcmp=false;
    }
    // EmailTemplates List
    else {
      this.templatesService.getEmailTemplates().subscribe(
        (response) => {
          this.emailTemplatesList = response;
        }
      );
      this.settingsService.getEmailServiceProviders().subscribe(
        (response) => {
          this.serviceProviders=response;
        }
      );
      this.campaignService.getEmailCampaignFromUserAndSrp().subscribe(
        response =>{
          this.clientEmailSettings=response;
          // this.clientFromAddress=Object.keys(this.clientEmailSettings);
          this.cesid=response[0].ceid;
          console.log(this.cesid);
          console.log(this.clientEmailSettings);
        }
      );

      this.emailcmp=true;

    }
    this.campaign.segmentationID = parseInt(this.route.snapshot.queryParams['sid'])?parseInt(this.route.snapshot.queryParams['sid']):-1;
    this.campaign.templateID = parseInt(this.route.snapshot.queryParams['tid'])?parseInt(this.route.snapshot.queryParams['tid']):-1;
    console.log(this.campaign);
    console.log(this.segmentsList);
  }

  continueToSchedule(): void {
    this.setupCampaignPage = 2;
  }
  continueToSave(): void {
    this.setupCampaignPage = 3;
  }

  onSubmit(): void {
    if(this.disableSubmit)
      this.messageService.addDangerMessage("Can not submit. Please correct and Submit");
    this.campaign.name = this.campaignName;
    if (this.scheduleType === ScheduleType.recurring) {
      this.schedule.recurring.cronExpression = this.cronExpression;
    }
    this.campaign.schedule = this.schedule;
    this.checkCampaignType();
    if(this.campaign.campaignType==CampaignType.EMAIL && this.cesid){
      this.campaign.fromUser=this.clientEmailSettings.find(value => value.ceid==this.cesid).fromAddress;
    }
    // if(this.srpId!="None")this.campaign.serviceProviderId=parseInt(this.srpId);
    if(this.cEvent!="None")this.campaign.conversionEvent=this.cEvent;

    if(this.cesid) {
      this.campaign.clientEmailSettingId=this.cesid;

    }
    console.log(JSON.stringify(this.campaign));
    this.campaignService.saveCampaign(this.campaign).subscribe(
      (campaign) => {
        this.campaignService.campaigns.push(campaign);
        this.router.navigate(["/campaigns"]);
      },
      error => {
          this.messageService.addDangerMessage(error.error.error.split(".")[0]);
      }
    );
  }

  checkCampaignType() {
    if (this.currentPath === 'androidpush') {
      this.campaign.campaignType = CampaignType.PUSH_ANDROID;
    }
    else if (this.currentPath === 'webpush') {
      this.campaign.campaignType = CampaignType.PUSH_WEB;
    }
    else if (this.currentPath === 'sms') {
      this.campaign.campaignType = CampaignType.SMS;
    }
    else {
      this.campaign.campaignType = CampaignType.EMAIL;
    }
  }

  advancedSelected(){
    this.advanced=true;
    this.campaign.conversionEvent=this.cEvent;
    this.campaign.serviceProviderId=parseInt(this.srpId);
  }

  conversionEventChanged(){
    this.campaign.conversionEvent=this.cEvent;
  }
  srProviderChanged(){
    this.campaign.serviceProviderId=parseInt(this.srpId);
  }
  // saveSegmentID(segmentID: number): void {
  //   this.campaign.segmentationID = segmentID;
  // }
  //
  // saveTemplateID(templateID: number): void {
  //   this.campaign.templateID = templateID;
  // }

  campaignStartDateSelect(value: any): void {
    this.schedule.recurring.scheduleStartDate = moment(value.end.valueOf()).format("YYYY-MM-DD");
  }

  campaignEndDateSelect(value: any): void {
    this.schedule.recurring.scheduleEnd.endsOn = moment(value.end.valueOf()).format("YYYY-MM-DD");
    if (this.schedule.recurring.scheduleEnd.endsOn >= this.schedule.recurring.scheduleStartDate) {
      this.disableSubmit = false;
    }
    else {
      this.disableSubmit = true;
    }
    this.schedule.recurring.scheduleEnd.occurrences = null;
  }

  addAnotherDateTime(): void {
    this.showCloseButton = true;
    // check and resolve the component
    var comp = this._cfr.resolveComponentFactory(DateTimeComponent);
    // Create component inside container
    var dateTimeComponent = this.container.createComponent(comp);
    dateTimeComponent.instance._ref = dateTimeComponent;
    dateTimeComponent.instance.showCloseButton = this.showCloseButton;
    dateTimeComponent.instance.campaignTimesList = this.schedule.multipleDates.campaignDateTimeList;
  }

  makeOneTimeDateObject() {
    if (this.scheduleType !== ScheduleType.oneTime) {
      this.scheduleType = ScheduleType.oneTime;
      this.schedule = new Schedule();
      this.schedule.oneTime = new ScheduleOneTime();
      this.schedule.oneTime.nowOrLater = Now.Now;
      this.schedule.oneTime.campaignDateTime = new CampaignDateTime();
    }
  }

  makeMultipleDateObject() {
    if (this.scheduleType !== ScheduleType.multipleDates) {
      this.scheduleType = ScheduleType.multipleDates;
      this.schedule = new Schedule();
      this.schedule.multipleDates = new ScheduleMultipleDates();
      this.schedule.multipleDates.campaignDateTimeList = new Array<CampaignDateTime>();
    }
  }

  makeRecurringObject() {
    if (this.scheduleType !== ScheduleType.recurring) {
      this.scheduleType = ScheduleType.recurring;
      this.schedule = new Schedule();
      this.schedule.recurring = new ScheduleRecurring();
      this.schedule.recurring.scheduleStartDate = moment(Date.now()).format("YYYY-MM-DD");
      this.schedule.recurring.scheduleEnd = new ScheduleEnd();
      this.schedule.recurring.scheduleEnd.endType = ScheduleEndType.NeverEnd;
      this.schedule.recurring.scheduleEnd.endsOn = null;
      this.schedule.recurring.cronExpression = this.cronExpression;
      this.schedule.recurring.scheduleEnd.occurrences = null;
    }

  }

  checkOccurencesValue() {
    // Problem in assigning value
    this.schedule.recurring.scheduleEnd.occurrences = 2;
    this.schedule.recurring.scheduleEnd.endsOn = null;

  }

  checkOccurencesValidtation() {
    if (this.schedule.recurring.scheduleEnd.occurrences > 1000 || this.schedule.recurring.scheduleEnd.occurrences < 1) {
      this.occurencesValueFalse = true;
      this.disableSubmit = true;
    }
    else {
      this.occurencesValueFalse = false;
      this.disableSubmit = false;
    }
  }

  neverEndSelected() {
    this.occurencesValueFalse = false;
    this.disableSubmit = false;
    this.schedule.recurring.scheduleEnd.endsOn = null;
    this.schedule.recurring.scheduleEnd.occurrences = null;
  }

  endsOnDateSelected() {
    this.schedule.recurring.scheduleEnd.endsOn = moment(Date.now()).format("YYYY-MM-DD");
    this.occurencesValueFalse = false;
    this.disableSubmit = false;
    this.schedule.recurring.scheduleEnd.occurrences = null;
  }

  getCronExpressionSummary(){
    return cronstrue.toString(this.cronExpression);
  }

  // getServiceProviderOfFromUser(){
  //   console.log(this.fromuser);
  //   // this.emailServiceProviders= this.serviceProviders.find((value)=>{this.clientEmailSettings.get(from).includes(value.id)});
  //   let s=this.clientEmailSettings[this.fromuser];
  //   console.log(s);
  //   this.emailServiceProviders=this.serviceProviders.filter((value)=>{
  //     if(s.indexOf(parseInt(value.id))>-1){
  //       return value
  //     }
  //   });
  //   console.log(this.serviceProviders);
  //   console.log(this.emailServiceProviders);
  // }
}
















