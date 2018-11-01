import { Component, OnInit } from '@angular/core';
import {WebPushTemplate} from "../../_models/notification";
import {Router, RouterStateSnapshot} from "@angular/router";
import {TemplatesService} from "../../_services/templates.service";

@Component({
  selector: 'app-notification-templates-web-push',
  templateUrl: './notification-templates-web-push.component.html',
  styleUrls: ['./notification-templates-web-push.component.scss']
})
export class NotificationTemplatesWebPushComponent implements OnInit {

  webPushTemplates: WebPushTemplate[] = [];
  state: RouterStateSnapshot;

  searchFilteredWebPushTemplates: WebPushTemplate[];

  private _searchfilterby: string;
  get searchfilterby(): string {
    return this._searchfilterby;
  }

  set searchfilterby(value: string) {
    this._searchfilterby = value;
    if (!value)
      this.searchFilteredWebPushTemplates = this.webPushTemplates;
    else
      this.searchFilteredWebPushTemplates = this.webPushTemplates.filter((v, i, a) => {
        return v.name.toLowerCase().indexOf(this._searchfilterby.toLowerCase()) > -1
      });
  }

  constructor(private templatesService: TemplatesService,
              private router: Router) {
    this.state = router.routerState.snapshot;
  }

  ngOnInit() {
    this.getWebPushTemplates();
  }

  getWebPushTemplates() {
    this.templatesService.getWebPushTemplates().subscribe(
      (result) => {
        this.searchFilteredWebPushTemplates = this.webPushTemplates = result;
      }
    );
  }

  onEdit(notificationTemplate: WebPushTemplate) {
    this.templatesService.webPushTemplateForEdit.next(JSON.parse(JSON.stringify(notificationTemplate)));
    this.router.navigate(['create-notification-template-web-push',false], {queryParams: {returnUrl: this.state.url}});
  }

  onCreateNew() {
    this.templatesService.webPushTemplateForEdit.next(new WebPushTemplate());
    this.router.navigate(['create-notification-template-web-push',true], {queryParams: {returnUrl: this.state.url}});
  }
}
