import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
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
export class CampaignsInfoComponent implements OnInit {
  // @Input('campaignInfoObject') campaignInfoObject: Campaign;
  campaignInfoObject: Campaign;
  segment: Segment;
  emailTemplate: EmailTemplate;
  cronExpressionSummary: string;
  emailTemplateObjectPresent: boolean = false;
  segmentObjectPresent: boolean = false;

  constructor(private segmentsService: SegmentService,
              private templatesService: TemplatesService,
              private campaignService: CampaignService) {
  }

  ngOnInit() {
    this.campaignService.campaignObjectForInfoObservable.subscribe(
      (campaignInfoObject: Campaign) => {
        console.log(campaignInfoObject);
        this.campaignInfoObject = campaignInfoObject;
        this.segmentsService.getSegmentById(this.campaignInfoObject.segmentationID).subscribe(
          (segmentObject:Segment) => {
            console.log("Segment Object"+segmentObject);
            this.segment = segmentObject;
            this.segmentObjectPresent = true;
            this.templatesService.getEmailTemplateById(this.campaignInfoObject.templateID).subscribe(
              (emailTemplate:EmailTemplate) => {
                console.log("Email Template Object"+this.emailTemplate);
                this.emailTemplate = emailTemplate;
                this.emailTemplateObjectPresent = true;
              }, (error: HttpErrorResponse) => {
                console.log(error)
              }
            )
          }, (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
      }
    );
  }
  getCronExpressionSummary(){
    try {
      return cronstrue.toString(this.campaignInfoObject.schedule.recurring.cronExpression);
    } catch(e) {
      return "<span class='text-danger'> Invalid recurring campaign schedule. "+ e + "</span>";
    }
  }
}
