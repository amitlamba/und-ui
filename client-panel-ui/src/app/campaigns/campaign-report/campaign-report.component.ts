import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Campaign} from "../../_models/campaign";
import {ActivatedRoute} from "@angular/router";
import {CampaignService} from "../../_services/campaign.service";
import {CampaignReach, ChartSeriesData} from "../../_models/reports";
import {ReportsService} from "../../_services/reports.service";

@Component({
  selector:'app-campaign-report',
  templateUrl:'campaign-report.component.html',
  styleUrls:['./campaign-report.component.scss']
})
export class CampaignReportComponent implements OnInit {

  @Input() campaign: Campaign;
  @Input() campaigns: Campaign[];
  campaignId: number;
  campaignReach: CampaignReach;
  campaignReachChartData: ChartSeriesData[] = [];

  constructor(private campaignService: CampaignService,
              private reportsService: ReportsService,
              private activatedRoute: ActivatedRoute){}

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
          this.getCampaignReach(this.campaignId);
        }
      });
    }
  }

  getCampaignReach(campaignId) {
    this.reportsService.getCampaignReach(campaignId).subscribe(
      response => {
        console.log(response);
        this.campaignReach = response;
        this.setCampaignReachChartData();
      }
    );
  }

  setCampaignReachChartData() {
    this.campaignReachChartData = [];
    this.campaignReachChartData.push({
      showInLegend: false,
      seriesName: "Count",
      data: [
        this.campaignReach.delivered,
        this.campaignReach.failed,
        this.campaignReach.read,
        this.campaignReach.interacted
      ]
    })
  }

  campaignChange() {
    console.log(this.campaign);
    this.getCampaignReach(this.campaign.id);
  }

}
