import { Component, OnInit } from '@angular/core';
import {AndroidTemplate, NotificationTemplate} from "../../_models/notification";
import {TemplatesService} from "../../_services/templates.service";
import {Router, RouterStateSnapshot} from "@angular/router";
import {CampaignType, TestCampaign} from "../../_models/campaign";
import {TestCampaignService} from "../../_services/test-campaign.service";

@Component({
  selector: 'app-notification-templates-android',
  templateUrl: './notification-templates-android.component.html',
  styleUrls: ['./notification-templates-android.component.scss']
})
export class NotificationTemplatesAndroidComponent implements OnInit {

  androidTemplates: AndroidTemplate[] = [];
  state: RouterStateSnapshot;

  searchFilteredAndroidTemplates: AndroidTemplate[];

  private _searchfilterby: string;
  get searchfilterby(): string {
    return this._searchfilterby;
  }

  set searchfilterby(value: string) {
    this._searchfilterby = value;
    if (!value)
      this.searchFilteredAndroidTemplates = this.androidTemplates;
    else
      this.searchFilteredAndroidTemplates = this.androidTemplates.filter((v, i, a) => {
        return v.name.toLowerCase().indexOf(this._searchfilterby.toLowerCase()) > -1
      });
  }

  constructor(private templatesService: TemplatesService,
              private router: Router,
              private testCampaignService: TestCampaignService) {
    this.state = router.routerState.snapshot;
  }

  ngOnInit() {
    this.getAndroidTemplates();
  }

  getAndroidTemplates() {
    this.templatesService.getAndroidTemplates().subscribe(
      (result) => {
        this.searchFilteredAndroidTemplates = this.androidTemplates = result;
      }
    );
  }

  onClone(notificationTemplate: AndroidTemplate) {
    this.templatesService.androidTemplateForEdit.next(JSON.parse(JSON.stringify(notificationTemplate)));
    this.router.navigate(['create-notification-template-android',false], {queryParams: {returnUrl: this.state.url}});
  }

  onCreateNew() {
    this.templatesService.androidTemplateForEdit.next(new AndroidTemplate());
    this.router.navigate(['create-notification-template-android',true], {queryParams: {returnUrl: this.state.url}});
  }

  setTestCampaign(nt: AndroidTemplate) {
    console.log(nt);
    this.testCampaignService.testCampaign = new TestCampaign();
    this.testCampaignService.testCampaign.campaignType = CampaignType.PUSH_ANDROID;
    this.testCampaignService.testCampaign.androidTemplate = nt;
  }
}
