import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {SegmentService} from "../../_services/segment.service";
import {DateTimeComponent} from "./date-time/date-time.component";
import {
  AbCampaign,
  Campaign,
  CampaignDateTime,
  CampaignType,
  ClientEmailSettIdFromAddrSrp,
  LiveSchedule,
  Now,
  RunType,
  Schedule,
  ScheduleEnd,
  ScheduleEndType,
  ScheduleMultipleDates,
  ScheduleOneTime,
  ScheduleRecurring,
  ScheduleType, typeOfCampaign,
  Variant
} from "../../_models/campaign";
import {CronOptions} from "../../cron-editor/CronOptions";
import {TemplatesService} from "../../_services/templates.service";
import {SmsTemplate} from "../../_models/sms";
import {RegisteredEvent, SegmentMini} from "../../_models/segment";
import * as moment from "moment";
import {ActivatedRoute, Router} from "@angular/router";
import {EmailTemplate} from "../../_models/email";
import {CampaignService} from "../../_services/campaign.service";
import {MessageService} from "../../_services/message.service";
import cronstrue from "cronstrue";
import {FormArray, FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
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
// take variable for normal and A/B testing
  isNotAbTesting = true;
  ReminD = false;
  abCampaignFB: FormGroup;

  // showScheduleForm: boolean = false;
  setupCampaignPage: number = 1; //1,2 and 3
  showCloseButton: boolean = false;
  disableSubmit: boolean = false;
  invalidCron: boolean = false;
  occurencesValueFalse: boolean = false;
  cronExpression = '0 0 10 1 1/1 ? *'; //FIXME
  isCronDisabled: boolean = false;
  advanced: boolean = false;
  conversionEvents: string[] = [];
  serviceProviders: ServiceProviderCredentials[] = [];
  emailServiceProviders: ServiceProviderCredentials[] = [];
  clientEmailSettings: ClientEmailSettIdFromAddrSrp[] = [];
  clientFromAddress: string[];
  emailcmp: boolean = false;
  fromuser: string;
  cEvent: string = "None";
  srpId: string = "None";
  cesid: number;
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
  abCampaign: AbCampaign;
  campaignName: string = "";
  segmentsList: SegmentMini[] = [];

  private _selectedSegment: SegmentMini;
  get selectedSegment(): SegmentMini {
    return this._selectedSegment;
  }

  set selectedSegment(value: SegmentMini) {
    this._selectedSegment = value;
    this.campaign.segmentationID = value.id;
  }

  liveSegmentEnds: string = 'NeverEnds';

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
              private settingsService: SettingsService) {
  }

  ngOnInit() {
    var variant = new Variant();
    variant.name = "Variant A";
    variant.templateId = null;
    variant.percentage = 50;


    this.schedule = new Schedule();
    this.scheduleType = ScheduleType.oneTime;
    this.schedule.oneTime = new ScheduleOneTime();
    this.schedule.oneTime.nowOrLater = Now.Now;
    this.schedule.oneTime.campaignDateTime = new CampaignDateTime();
    this.currentPath = this.route.snapshot.url[0].path;
    //TODO if register event are null fetch from api
    let re: RegisteredEvent[] = JSON.parse(localStorage.getItem("registeredEvents"));
    this.conversionEvents = re.map<string>((value) => {
      return value.name
    });
    this.conversionEvents.push("None");
    // Segments List
    this.segmentsList = this.segmentService.segmentMini;
    if (!this.segmentsList) {
      this.segmentService.getSegments().subscribe(
        (segments) => {
          this.segmentService.segments = segments;
          this.segmentsList = this.segmentService.segmentMini;
        }
      );
    }

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
      this.emailcmp = false;
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
          this.serviceProviders = response;
        }
      );
      this.emailcmp = false;
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
          this.serviceProviders = response;
        }
      );
      this.emailcmp = false;
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
          this.serviceProviders = response;
        }
      );
      this.campaignService.getEmailCampaignFromUserAndSrp().subscribe(
        response => {
          this.clientEmailSettings = response;
          // this.clientFromAddress=Object.keys(this.clientEmailSettings);
          this.cesid = response[0].ceid;
          console.log(this.cesid);
          console.log(this.clientEmailSettings);
        }
      );

      this.emailcmp = true;

    }
    this.campaign.segmentationID = parseInt(this.route.snapshot.queryParams['sid']) ? parseInt(this.route.snapshot.queryParams['sid']) : -1;
    this.campaign.templateID = parseInt(this.route.snapshot.queryParams['tid']) ? parseInt(this.route.snapshot.queryParams['tid']) : -1;
    if (variant.templateId && this.campaign && this.campaign.segmentationID) {
      this._selectedSegment = this.segmentsList.find(v => v.id == this.campaign.segmentationID);
    }

    var abcampaign = new AbCampaign();
    abcampaign.runType = RunType.AUTO;
    abcampaign.waitTime = 30;
    abcampaign.sampleSize = 500;
    abcampaign.remind = false;
    abcampaign.variants = [variant];
    this.buildAbCampaignFB(abcampaign);


  }

  buildAbCampaignFB(campaign: AbCampaign) {
    this.abCampaignFB = this.fb.group(
      {
        runType: [campaign.runType],
        waitTime: [campaign.waitTime],
        sampleSize: [campaign.sampleSize],
        remind: [campaign.remind],
        variants: this.fb.array(this.buildVariants(campaign.variants))
      }
    );

  }

  buildVariants(variants: Variant[]): FormGroup[] {

    if (variants && variants.length) {
      return variants.map((v) => {
        return this.buildVariant(v);
      });
    } else return [];
  }

  buildVariant(variant: Variant): FormGroup {
    return this.fb.group(
      {
        name: [variant.name, Validators.required],
        templateId: [variant.templateId, Validators.required],
        campaignId: [variant.campaignId],
        percentage: [variant.percentage, Validators.required]
      }
    )
  }

  isValidAbCampaign(): boolean {
    return !this.abCampaignFB.invalid;
  }

  validateVariantPercentage(): boolean {
    let totalPercentage = this.abCampaign.variants.map(v => v.percentage).reduce((p, c, ci, a) => p + c, 0);
    return totalPercentage === 100;
  }


  get variantsArray(): FormArray {
    return this.abCampaignFB.get('variants') as FormArray;
  }


  addVariant() {
    let v = new Variant();
    this.variantsArray.push(this.buildVariant(v));
  }

  removeVarriant(index) {
    this.variantsArray.removeAt(index);
  }

  continueToSchedule(): void {
    if (this.selectedSegment.type == 'Live') {
      this.campaign.liveSchedule = new LiveSchedule();
      this.campaign.liveSchedule.nowOrLater = Now.Now;
      this.campaign.liveSchedule.startTime = new CampaignDateTime();
    }
    this.setupCampaignPage = 2;
  }

  continueToSave(): void {
    this.setupCampaignPage = 3;
  }

  onSubmit(): void {
    if (this.disableSubmit)
      this.messageService.addDangerMessage("Can not submit. Please correct and Submit");
    this.campaign.name = this.campaignName;
    if (this.scheduleType === ScheduleType.recurring) {
      this.schedule.recurring.cronExpression = this.cronExpression;
    }
    if (this.selectedSegment.type == 'Live') {
      this.campaign.schedule = null;
    } else {
      this.campaign.schedule = this.schedule;
    }
    this.checkCampaignType();
    if (this.campaign.campaignType == CampaignType.EMAIL && this.cesid) {
      this.campaign.fromUser = this.clientEmailSettings.find(value => value.ceid == this.cesid).fromAddress;
    }
    // if(this.srpId!="None")this.campaign.serviceProviderId=parseInt(this.srpId);
    if (this.cEvent != "None") this.campaign.conversionEvent = this.cEvent;

    if (this.cesid) {
      this.campaign.clientEmailSettingId = this.cesid;

    }
    console.log(JSON.stringify(this.campaign));
    console.log(this.abCampaignFB.value);
    if (this.isNotAbTesting) {
      this.campaignService.saveCampaign(this.campaign).subscribe(
        (campaign) => {
          this.campaignService.campaigns.push(campaign);
          this.router.navigate(["/campaigns"]);
        },
        error => {
          this.messageService.addDangerMessage(error.error.error.split(".")[0]);
        }
      );
    } else {
      this.abCampaign = JSON.parse(JSON.stringify(this.abCampaignFB.value))
      this.abCampaign.campaign = this.campaign;
      console.log(this.abCampaign);
      if (!this.validateVariantPercentage())
        this.messageService.addDangerMessage("Percentage of all variants must sum to 100");
      else
        this.campaignService.saveAbCampaign(this.abCampaign).subscribe(
          (response) => {
            this.messageService.addSuccessMessage("AbCampaign created successfully.");
            this.router.navigate(["/campaigns"]);
          },
          error => {
            console.error(error.error);
            this.messageService.addDangerMessage(error.error.error.split(".")[0]);
          }
        );
    }
  }

  checkCampaignType() {
    if (this.currentPath === 'androidpush') {
      this.campaign.campaignType = CampaignType.PUSH_ANDROID;
    } else if (this.currentPath === 'webpush') {
      this.campaign.campaignType = CampaignType.PUSH_WEB;
    } else if (this.currentPath === 'sms') {
      this.campaign.campaignType = CampaignType.SMS;
    } else {
      this.campaign.campaignType = CampaignType.EMAIL;
    }
  }

  advancedSelected() {
    this.advanced = true;
    this.campaign.conversionEvent = this.cEvent;
    this.campaign.serviceProviderId = parseInt(this.srpId);
  }

  conversionEventChanged() {
    this.campaign.conversionEvent = this.cEvent;
  }

  srProviderChanged() {
    this.campaign.serviceProviderId = parseInt(this.srpId);
  }

  campaignStartDateSelect(value: any): void {
    this.schedule.recurring.scheduleStartDate = moment(value.end.valueOf()).format("YYYY-MM-DD");
  }

  campaignEndDateSelect(value: any): void {
    this.schedule.recurring.scheduleEnd.endsOn = moment(value.end.valueOf()).format("YYYY-MM-DD");
    if (this.schedule.recurring.scheduleEnd.endsOn >= this.schedule.recurring.scheduleStartDate) {
      this.disableSubmit = false;
    } else {
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
    } else {
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

  getCronExpressionSummary() {
    return cronstrue.toString(this.cronExpression);
  }

  selectTemplate(value) {
    this.isNotAbTesting = value;
    if (this.isNotAbTesting === false) {
      this.campaign.templateID = null;
      this.campaign.typeOfCampaign = typeOfCampaign.AB_TEST;
    } else {
    }
  }

  RuntypeChange(event) {
    if (event.target.value == 'AUTO') {
      this.ReminD = false;
    } else if (event.target.value == 'MANUAL') {
      this.ReminD = true;
    }
  }


}
















