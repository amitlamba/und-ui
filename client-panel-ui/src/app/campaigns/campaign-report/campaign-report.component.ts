import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Campaign} from "../../_models/campaign";
import {ActivatedRoute} from "@angular/router";
import {CampaignService} from "../../_services/campaign.service";

@Component({
  selector:'app-campaign-report',
  templateUrl:'campaign-report.component.html',
  styleUrls:['./campaign-report.component.css']
})
export class CampaignReportComponent implements OnInit {

  @Input() campaign: Campaign;
  @Input() campaigns: Campaign[];
  campaignId: number;

  constructor(private campaignService: CampaignService, private activatedRoute: ActivatedRoute){}

  ngOnInit() {
    this.campaignId = this.activatedRoute.snapshot.queryParams['cid'];
    console.log("ngOnInit called");
    if(!this.campaigns) {
      this.campaignService.getCampaignList().subscribe((campaigns)=> {
        this.campaigns = campaigns;
        if(this.campaignId) {
          try{
            this.campaign = this.campaigns.filter(v=>v.id==this.campaignId)[0];
          } catch (e) {
            console.error(e);
          }
        }
      });
    }
  }

  campaignChange() {
    console.log(this.campaign);
  }

}
