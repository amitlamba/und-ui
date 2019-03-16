import {Component, Input, OnInit} from "@angular/core";
import {Campaign} from "../../_models/campaign";
import {ActivatedRoute} from "@angular/router";
import {CampaignService} from "../../_services/campaign.service";
import {CampaignReach, ChartSeriesData, FunnelOrder, FunnelReportFilter, FunnelStep} from "../../_models/reports";
import {ReportsService} from "../../_services/reports.service";
import {ChartModel} from "../../eventreport/eventreport-demographics/eventreport-demographics.component";
import {GlobalFilter, GlobalFilterType} from "../../_models/segment";
import * as moment from "moment";

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
          this.getConversionFunnel()
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
    this.getConversionFunnel()
  }

  getConversionFunnel() {
    this.conversionFunnel = new FunnelReportFilter();
    this.conversionFunnel.segmentid = this.campaign.segmentationID;
    let conversionE: string = this.campaign.conversionEvent?this.campaign.conversionEvent:"Charged";
    this.conversionFunnel.steps = [{order: 1, eventName: "Notification Sent"},{order: 2, eventName: conversionE}];
    if(this.campaign.dateCreated){
      this.conversionFunnel.days=moment().dayOfYear()-moment(this.campaign.dateCreated).dayOfYear();
      this.conversionFunnel.conversionTime=this.conversionFunnel.days*24*60*60;
    }
    // this.conversionFunnel.splitProperty=null;
    this.conversionFunnel.funnelOrder=FunnelOrder.default;
    /*
    globalFilterType: GlobalFilterType;
  name: string;
  type: string;
  operator: string;
  values: any[] = [];
  valueUnit: string;
     */

    let gf: GlobalFilter = JSON.parse(JSON.stringify({
      globalFilterType: GlobalFilterType.EventAttributeProperties,
      name: "campaign_id",
      type: "number",
      operator: "Equals",
      values: [this.campaignId]
    }));
    this.conversionFunnel.filters = [gf];
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
    this.conversionFunnelChartData= new ChartModel();
    this.initializeGraph(data);
    console.log(data);
  }
  initializeGraph(data:FunnelStep[]){

    if(true) {
      this.conversionFunnelChartData.category = data.map(v => v.property).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
      console.log(this.conversionFunnelChartData.category);

      this.conversionFunnelChartData.dataSeries = [];

      data.forEach(v => {
        this.conversionFunnelChartData.dataSeries.push({
          showInLegend: true,
          seriesName: v.step.eventName,
          data: [v.count]
        });
      })
    } else {
      console.log(data);
      let category = data.map(v => v.property).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
      let categorized = [];
      data.forEach((v,i)=>{
        let found = categorized.find((v1)=> v1.name === v.step.eventName);
        if(!found) {
          let n: any = {};
          n['name'] = v.step.eventName;
          n['data'] = {};
          n['data'][v.property] = v.count;
          categorized.push(n);
        } else {
          found.data[v.property] = v.count;
        }
      });
      console.log(categorized);
      let dataSeries = []
      categorized.forEach((v) => {
        let d = {};
        d['seriesName'] = v['name'];
        let data = [];
        category.forEach((v1, i)=> {
          data[i] = (v['data'][v1] == undefined) ? 0 : v['data'][v1];
        })
        d['data'] = data;
        d['showInLegend'] = true;
        dataSeries.push(d);
      });
      this.conversionFunnelChartData.yAxisTitle = "Number of users";
      this.conversionFunnelChartData.xAxisTitle = "Events";
      this.conversionFunnelChartData.category = category;
      this.conversionFunnelChartData.dataSeries = dataSeries;
      console.log(this.conversionFunnelChartData);
    }
    // data.map(v=>v.count)
  }
}
