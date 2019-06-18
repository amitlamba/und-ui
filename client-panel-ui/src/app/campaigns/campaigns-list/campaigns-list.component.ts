import {Component, OnInit, ViewChild} from '@angular/core';
import {CampaignService} from "../../_services/campaign.service";
import {Campaign, CampaignStatus} from "../../_models/campaign";
import {HttpErrorResponse} from "@angular/common/http";
import {SegmentService} from "../../_services/segment.service";
import {Segment} from "../../_models/segment";
import {Router} from "@angular/router";
import {UndTrackingService} from "../../_services/und-tracking.service";

@Component({
  selector: 'app-campaigns-list',
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.scss']
})
export class CampaignsListComponent implements OnInit {
  // @ViewChild('campaignInformationModal') campaignInformationModal;
  modalCampaignInfoObject: Campaign;
  showCampaignInfoModal: boolean = false;
  campaigns: Campaign[];
  campaignId: number;
  campaignConfirmationDialogText: string;
  initCampaignsInfoComponent: boolean = false;
  changeSegmentationId: boolean = false;
  campaignErrorMessage: string;
  showCampaignErrorMessage: boolean = false;

  campaignType: string = "Active";
  filteredCampaigns: Campaign[];
  searchFilteredCampaigns: Campaign[];

  private _searchfilterby: string;
  get searchfilterby(): string {
    return this._searchfilterby;
  }

  set searchfilterby(value: string) {
    this._searchfilterby = value;
    if (!value)
      this.searchFilteredCampaigns = this.campaigns;
    else
      this.searchFilteredCampaigns = this.campaigns.filter((v, i, a) => {
        return v.name.toLowerCase().indexOf(this._searchfilterby.toLowerCase()) > -1
      });
    this.filterCampaigns();
  }

  constructor(private undtrackingService: UndTrackingService, private campaignService: CampaignService, private router: Router) {
  }

  ngOnInit() {
    this.getCampaignsList();
  }


  getCampaignsList() {
    this.campaignService.getCampaignList().subscribe((campaigns) => {
      this.campaigns = this.searchFilteredCampaigns = campaigns;
      this.filterCampaigns();
    });
  }

  public model: any = {
    beginDate: {year: 2018, month: 10, day: 9},
    endDate: {year: 2018, month: 10, day: 19}
  };

  getCampaignItem(campaignItem: Campaign) {
    // this.campaignInformationModal.nativeElement.className = 'modal fade show';
    this.campaignService.campaignObjectForInfo.next(campaignItem);
    this.modalCampaignInfoObject = campaignItem;
    this.showCampaignInfoModal = true;
    // this.initCampaignsInfoComponent = true;
    console.log(campaignItem);
  }

  getCampaignError(campaignItem: Campaign) {
    this.campaignService.getCampaignError(campaignItem.id).subscribe(
      (response) => {
        console.log(response);
        this.campaignErrorMessage = response;
        this.showCampaignErrorMessage = true;
      },
      (error: HttpErrorResponse) => {
        console.log(JSON.stringify(error));
        this.campaignErrorMessage = error.error.text;
        this.showCampaignErrorMessage = true;
      }
    )
  }

  getCampaignId(campaignItem: Campaign, campaignConfirmationText: string) {
    this.campaignId = campaignItem.id;
    this.campaignConfirmationDialogText = campaignConfirmationText;
    // console.log(this.campaignConfirmationDialogText);
    // console.log(this.campaignId);
  }

  executeCampaignFunction() {
    console.log(this.campaignId);
    switch (this.campaignConfirmationDialogText) {
      case "resume": {
        console.log('inside resume');
        console.log(this.campaignId);
        this.campaignService.resumeCampaign(this.campaignId)
          .subscribe(
            (campaignId) => {
              console.log(campaignId);
              this.getCampaignsList();
            },
            (error: HttpErrorResponse) => {
              console.log("Error from resume Campaign" + error);
            }
          );
        break;
      }

      case "pause": {
        console.log('inside Pause');
        this.campaignService.pauseCampaign(this.campaignId)
          .subscribe(
            (campaignId) => {
              console.log(campaignId);
              this.getCampaignsList();
            },
            (error: HttpErrorResponse) => {
              console.log("Error from Pause Campaign Function" + error);
            }
          );
        //Campaign Event on Pause
        this.undtrackingService.trackEvent("Campaign", {
          'CampaignID': this.campaignId, 'Action': 'Pause',
          'CampaignName': this.campaigns.find(value => {
            return value.id == this.campaignId
          }).name,
          'CampaignType': this.campaigns.find(value => {
            return value.id == this.campaignId
          }).campaignType
        });
        break;
      }

      case "stop": {
        console.log('inside Stop');
        this.campaignService.stopCampaign(this.campaignId)
          .subscribe(
            (campaignId) => {
              console.log(campaignId);
              this.getCampaignsList();

            },
            (error: HttpErrorResponse) => {
              console.log("Error from Stop Campaign Function" + error);
            }
          );
        //Campaign Event on Stop
        this.undtrackingService.trackEvent("Campaign", {
          'CampaignID': this.campaignId, 'Action': 'Stop',
          'CampaignName': this.campaigns.find(value => {
            return value.id == this.campaignId
          }).name,
          'CampaignType': this.campaigns.find(value => {
            return value.id == this.campaignId
          }).campaignType
        });
        break;
      }

      case "delete": {
        console.log('inside delete');
        this.campaignService.deleteCampaign(this.campaignId)
          .subscribe(
            (campaignId) => {
              console.log(campaignId);
              this.getCampaignsList();

            },
            (error: HttpErrorResponse) => {
              console.log("Error from Delete Campaign Function" + error);
            }
          );
        //Campaign Event on Delete
        this.undtrackingService.trackEvent("Campaign", {
          'CampaignID': this.campaignId, 'Action': 'Delete',
          'CampaignName': this.campaigns.find(value => {
            return value.id == this.campaignId
          }).name,
          'CampaignType': this.campaigns.find(value => {
            return value.id == this.campaignId
          }).campaignType
        });
        break;
      }
    }

  }

  changeCampaignFilter(filter: string) {
    this.campaignType = filter;
    this.filterCampaigns();
  }

  filterCampaigns() {
    this.filteredCampaigns = this.searchFilteredCampaigns.filter(v => {
      if (this.campaignType == "Active") {
        return v.status != CampaignStatus.COMPLETED && v.status != CampaignStatus.ERROR
      } else if (this.campaignType == "Errors") {
        return v.status == CampaignStatus.ERROR
      } else {
        return v.status == CampaignStatus.COMPLETED
      }
    })
  }

  viewReportClicked(campaignId: number) {
    this.router.navigate(['/reports/campaign'], {queryParams: {cid: campaignId}});
  }

}
