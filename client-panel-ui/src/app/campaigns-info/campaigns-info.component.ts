import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Segment} from "../_models/segment";
import {SegmentService} from "../_services/segment.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Campaign} from "../_models/campaign";
import cronstrue from 'cronstrue';
import {TemplatesService} from "../_services/templates.service";
import {EmailTemplate} from "../_models/email";
import {CampaignService} from "../_services/campaign.service";

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
        this.templatesService.getEmailTemplateById(this.campaignInfoObject.templateID).subscribe(
          (emailTemplate: EmailTemplate) => {
            console.log("Email Template Object" + this.emailTemplate);
            this.emailTemplate = emailTemplate;
          }, (error: HttpErrorResponse) => {
            console.error(error)
          }
        )
      }, (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  getCronExpressionSummary() {
    try {
      return cronstrue.toString(this.campaignInfoObject.schedule.recurring.cronExpression);
    } catch (e) {
      return "<span class='text-danger'> Invalid recurring campaign schedule. " + e + "</span>";
    }
  }
}
