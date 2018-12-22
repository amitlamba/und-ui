import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Segment} from "../_models/segment";
import {SegmentService} from "../_services/segment.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Campaign, CampaignType} from "../_models/campaign";
import cronstrue from 'cronstrue';
import {TemplatesService} from "../_services/templates.service";
import {EmailTemplate} from "../_models/email";
import {CampaignService} from "../_services/campaign.service";
import {SmsTemplate} from "../_models/sms";
import {AndroidTemplate, WebPushTemplate} from "../_models/notification";

@Component({
  selector: 'app-campaigns-info',
  templateUrl: './campaigns-info.component.html',
  styleUrls: ['./campaigns-info.component.scss']
})
export class CampaignsInfoComponent implements OnInit, OnChanges {
  @Input('campaignInfoObject') campaignInfoObject: Campaign;
  // campaignInfoObject: Campaign;
  segment: Segment;
  emailTemplate: EmailTemplate;
  smsTemplate: SmsTemplate;
  androidTemplate: AndroidTemplate;
  webPushTemplate: WebPushTemplate;

  cronExpressionSummary: string;

  constructor(private segmentsService: SegmentService,
              private templatesService: TemplatesService,
              private campaignService: CampaignService) {
  }

  ngOnInit() {
    if (!this.campaignInfoObject)
      this.campaignService.campaignObjectForInfoObservable.subscribe(
        (campaignInfoObject: Campaign) => {
          console.log(campaignInfoObject);
          this.campaignInfoObject = campaignInfoObject;
          this.getCampaignInfo();
        }
      );
    else {
      this.getCampaignInfo();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    //Check if not the first time change
    if(!changes['campaignInfoObject'].isFirstChange()) {
      this.getCampaignInfo();
    }
  }

  private getCampaignInfo() {
    this.segmentsService.getSegmentById(this.campaignInfoObject.segmentationID).subscribe(
      (segmentObject: Segment) => {
        console.log(segmentObject);
        this.segment = segmentObject;
        this.getTemplate()
      }, (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  private getTemplate() {
    this.emailTemplate=this.smsTemplate=this.webPushTemplate=this.androidTemplate=null;
    if(this.campaignInfoObject.campaignType == CampaignType.EMAIL) {
      this.emailTemplate = null;
      this.templatesService.getEmailTemplateById(this.campaignInfoObject.templateID).subscribe(
        (emailTemplate: EmailTemplate) => {
          console.log("Email Template Object" + this.emailTemplate);
          this.emailTemplate = emailTemplate;
        }, (error: HttpErrorResponse) => {
          console.error(error)
        }
      )
    } else if(this.campaignInfoObject.campaignType == CampaignType.SMS) {
      this.smsTemplate = null;
      this.templatesService.getSmsTemplateById(this.campaignInfoObject.templateID).subscribe(
        (smsTemplate: SmsTemplate) => {
          console.log("SMS Template Object" + this.smsTemplate);
          this.smsTemplate = smsTemplate;
        }, (error: HttpErrorResponse) => {
          console.error(error)
        }
      )
    } else if(this.campaignInfoObject.campaignType == CampaignType.PUSH_ANDROID) {
      this.androidTemplate = null;
      this.templatesService.getAndroidTemplateById(this.campaignInfoObject.templateID).subscribe(
        (androidTemplate: AndroidTemplate) => {
          console.log("Android Template Object" + this.androidTemplate);
          this.androidTemplate = androidTemplate;
        }, (error: HttpErrorResponse) => {
          console.error(error)
        }
      )
    } else if(this.campaignInfoObject.campaignType == CampaignType.PUSH_WEB) {
      this.webPushTemplate = null;
      this.templatesService.getWebPushTemplateById(this.campaignInfoObject.templateID).subscribe(
        (webPushTemplate: WebPushTemplate) => {
          console.log("WebPush Template Object" + this.webPushTemplate);
          this.webPushTemplate = webPushTemplate;
        }, (error: HttpErrorResponse) => {
          console.error(error)
        }
      )
    }
  }

  getCronExpressionSummary() {
    try {
      return cronstrue.toString(this.campaignInfoObject.schedule.recurring.cronExpression);
    } catch (e) {
      return "<span class='text-danger'> Invalid recurring campaign schedule. " + e + "</span>";
    }
  }
}
