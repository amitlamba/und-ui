import { Injectable } from '@angular/core';
import {CampaignType, ClientEmailSettIdFromAddrSrp, TestCampaign} from "../_models/campaign";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {SettingsService} from "./settings.service";
import {ServiceProviderCredentials} from "../_models/client";
import {CampaignService} from "./campaign.service";

@Injectable()
export class TestCampaignService {
  get testCampaign(): TestCampaign {
    return this._testCampaign;
  }

  set testCampaign(value: TestCampaign) {
    this._testCampaign = value;
    this.testCampaignObject.next(this._testCampaign);
  }

  //To be used for sending test campaign
  private _testCampaign: TestCampaign;
  testCampaignObject = new BehaviorSubject<TestCampaign>(new TestCampaign());
  testCampaignObjectObservable = this.testCampaignObject.asObservable();

  serviceProviders: ServiceProviderCredentials[];
  clientEmailSettings: ClientEmailSettIdFromAddrSrp[];

  constructor(private settingsService: SettingsService, private campaignService: CampaignService) { }

  getServiceProviders() {
    this.serviceProviders = null;
    if(this.testCampaign) {
      switch (this.testCampaign.campaignType) {
        case CampaignType.SMS:
          this.settingsService.getSmsServiceProviders().subscribe(
            (response) => {
              this.serviceProviders=response;
            }
          );
          break;
        case CampaignType.PUSH_WEB:
          this.settingsService.getWebServiceProviders().subscribe(
            (response) => {
              this.serviceProviders = response;
            }
          );
          break;
        case CampaignType.PUSH_ANDROID:
          this.settingsService.getAndroidServiceProviders().subscribe(
            (response) => {
              this.serviceProviders=response;
            }
          );
          break;
        case CampaignType.PUSH_IOS:
          break;
        case CampaignType.EMAIL:
          this.settingsService.getEmailServiceProviders().subscribe(
            (response) => {
              this.serviceProviders=response;
            }
          );
          this.campaignService.getEmailCampaignFromUserAndSrp().subscribe(
            response =>{
              this.clientEmailSettings=response;
              // this.clientFromAddress=Object.keys(this.clientEmailSettings);
              this.testCampaign.clientEmailSettingId=response[0].ceid;
              // console.log(this.cesid);
              // console.log(this.clientEmailSettings);
            }
          );
          break;
      }
    }

  }
}
