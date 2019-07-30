import {Component, OnInit} from '@angular/core';
import {CampaignService} from "../_services/campaign.service";
import {MessageService} from "../_services/message.service";
import {TestCampaignService} from "../_services/test-campaign.service";
import {SettingsService} from "../_services/settings.service";
import {ServiceProviderCredentials} from "../_models/client";
import {CampaignType, ClientEmailSettIdFromAddrSrp} from "../_models/campaign";

@Component({
  selector: 'app-test-campaign',
  templateUrl: './test-campaign.component.html',
  styleUrls: ['./test-campaign.component.scss']
})
export class TestCampaignComponent implements OnInit {

  private _testUsers: string;
  get testUsers(): string {
    return this._testUsers;
  }
  set testUsers(value: string) {
    this._testUsers = value;
    if(this._testUsers == 'allTestUsers') {
      this.testCampaignService.testCampaign.toAddresses = null;
      this.testCampaignService.testCampaign.findByType = null;
      this.testCampaignService.testCampaign.segmentationID = -2;
    } else if (this._testUsers == 'usersByID') {
      this.testCampaignService.testCampaign.segmentationID = null;
    }
  }

  constructor(private campaignService: CampaignService, private messageService: MessageService,
              public testCampaignService: TestCampaignService,
              private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.testCampaignService.getServiceProviders();
  }



  set srpId(value: number) {
    this.testCampaignService.testCampaign.serviceProviderId = value;
  }

  get srpId(): number {
    return this.testCampaignService.testCampaign.serviceProviderId;
  }

  set cesid(value: number) {
    this.testCampaignService.testCampaign.clientEmailSettingId = value;
  }

  get cesid(): number {
    return this.testCampaignService.testCampaign.clientEmailSettingId;
  }

  get emailcmp(): boolean {
    return this.testCampaignService.testCampaign.campaignType == CampaignType.EMAIL;
  }

  set findByType(value: string) {
    this.testCampaignService.testCampaign.findByType = value;
  }

  get findByType(): string {
    return this.testCampaignService.testCampaign.findByType;
  }

  set toAddresses(value: string) {
    this.testCampaignService.testCampaign.toAddresses = value;
  }

  get toAddresses(): string {
    return this.testCampaignService.testCampaign.toAddresses;
  }

  get testCampaignAvailable(): boolean {
    if(this.testCampaignService.testCampaign)
      return true;
    return false;
  }

  sendTestCampaign() {
    // this.testCampaignService.testCampaign.toAddresses = "jogender.live@gmail.com";
    // this.testCampaignService.testCampaign.fromUser = "userndot19@gmail.com";
    // this.testCampaignService.testCampaign.findByType = "Email";
    this.campaignService.sendTestCampaign(this.testCampaignService.testCampaign).subscribe(
      response => {
        this.messageService.addSuccessMessage("Test Campaign executed successfully.");
      },
      error => {
        this.messageService.addDangerMessage("Issue Executing Test Campaign. " + error.error.message);
      }
    )
  }
}
