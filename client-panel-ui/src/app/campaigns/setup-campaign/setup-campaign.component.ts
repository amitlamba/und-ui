import {ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {Component, OnInit, ViewChild} from '@angular/core';
import {SegmentService} from "../../_services/segment.service";
import {DateTimeComponent} from "./date-time/date-time.component";
import {
  Campaign, CampaignDateTime, CampaignType, Now, Schedule, ScheduleEnd, ScheduleEndType, ScheduleMultipleDates,
  ScheduleOneTime, ScheduleRecurring,
  ScheduleType
} from "../../_models/campaign";
import {CronOptions} from "../../cron-editor/CronOptions";
import {TemplatesService} from "../../_services/templates.service";
import {SmsTemplate} from "../../_models/sms";
import {Segment} from "../../_models/segment";
import * as moment from "moment";
import {ActivatedRoute, Router} from "@angular/router";
import {Email, EmailTemplate} from "../../_models/email";
import {CampaignService} from "../../_services/campaign.service";

@Component({
  selector: 'app-setup-campaign',
  templateUrl: './setup-campaign.component.html',
  styleUrls: ['./setup-campaign.component.scss']
})
export class SetupCampaignComponent implements OnInit {
  currentPath: string;
  showScheduleForm: boolean = false;
  showCloseButton: boolean = false;
  disableSubmit: boolean = false;
  occurencesValueFalse: boolean = false;
  cronExpression = '4 3 2 LW 1/1 ? *'; //FIXME
  isCronDisabled: boolean = false;
  // schedule: Schedule = new Schedule();
  schedule: Schedule;
  // scheduleType: ScheduleType = ScheduleType.oneTime;
  scheduleType: ScheduleType;

  //Campaign
  smsTemplatesList: SmsTemplate[] = [];
  emailTemplatesList: EmailTemplate[] = [];
  campaign: Campaign = new Campaign();
  campaignName: string = "";
  segmentsList: Segment[] = [];


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
      format: "DD/MM/YYYY"
    }
  };

  @ViewChild('parent', {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(private _cfr: ComponentFactoryResolver,
              public segmentService: SegmentService,
              private templatesService: TemplatesService,
              private route: ActivatedRoute,
              private router: Router,
              private campaignService: CampaignService) {
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

    // Segments List
    this.segmentService.getSegments().subscribe(
      (segments) => {
        this.segmentService.segments = segments;
        this.segmentsList = this.segmentService.segments;
      }
    );
    // SmsTemplates List
    if (this.currentPath === 'sms') {
      this.templatesService.getSmsTemplates().subscribe(
        (response) => {
          this.smsTemplatesList = response;
        }
      );
    }
    // EmailTemplates List
    else {
      this.templatesService.getEmailTemplates().subscribe(
        (response) => {
          this.emailTemplatesList = response;
        }
      );
    }
    console.log(this.segmentsList);
  }

  continueToSchedule(): void {
    this.showScheduleForm = true;
  }

  onSubmit(): void {
    this.campaign.name = this.campaignName;
    if (this.scheduleType === "recurring") {
      this.schedule.recurring.cronExpression = this.cronExpression;
    }
    this.campaign.schedule = this.schedule;
    this.checkCampaignType();
    console.log(JSON.stringify(this.campaign));
    this.campaignService.saveCampaign(this.campaign).subscribe(
      (campaign) => {
        this.campaignService.campaigns.push(campaign);
        this.router.navigate(["/campaigns"]);
      }
    );
  }

  checkCampaignType() {
    if (this.currentPath === 'sms') {
      this.campaign.campaignType = CampaignType.SMS;
    }
    else {
      this.campaign.campaignType = CampaignType.EMAIL;
    }
  }

  saveSegmentID(segmentID: number): void {
    this.campaign.segmentationID = segmentID;
  }

  saveTemplateID(templateID: number): void {
    this.campaign.templateID = templateID;
  }

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

}
















