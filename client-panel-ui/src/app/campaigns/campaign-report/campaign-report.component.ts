import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Campaign} from "../../_models/campaign";
import {ActivatedRoute} from "@angular/router";
import {CampaignService} from "../../_services/campaign.service";
import {CampaignReach, ChartSeriesData, FunnelReportFilter} from "../../_models/reports";
import {ReportsService} from "../../_services/reports.service";
import {ChartModel} from "../../eventreport/eventreport-demographics/eventreport-demographics.component";

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

  conversionFunnel: FunnelReportFilter;
  conversionFunnelChartData: ChartModel;

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

  getConversionFunnel() {
    this.conversionFunnel = new FunnelReportFilter();
    this.conversionFunnel.segmentid = this.campaign.segmentationID;
    this.conversionFunnel.steps = [{order: 2, eventName: "Notification_Sent"},{order: 2, eventName: this.campaign.conversionEvent}]
    this.reportsService.getFunnelResult(this.conversionFunnel).subscribe(
      response => {
        this.setCoversionFunnelChartData(response);
      },
      error => {
        console.error("error occur in funnel report");
        console.error(error);
      }
    );
  }

  setCoversionFunnelChartData(data: any) {
    this.conversionFunnelChartData.yAxisTitle = "Number of users";
    this.conversionFunnelChartData.xAxisTitle = "Events";
    console.log(data);
  }
}
