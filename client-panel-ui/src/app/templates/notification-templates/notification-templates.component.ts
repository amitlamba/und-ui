import { Component, OnInit } from '@angular/core';
import {NotificationTemplate} from "../../_models/notification";
import {TemplatesService} from "../../_services/templates.service";
import {Router, RouterStateSnapshot} from "@angular/router";

@Component({
  selector: 'app-notification-templates',
  templateUrl: './notification-templates.component.html',
  styleUrls: ['./notification-templates.component.scss']
})
export class NotificationTemplatesComponent implements OnInit {

  notificationTemplates: NotificationTemplate[] = [];
  state: RouterStateSnapshot;

  searchFilteredNotificationTemplates: NotificationTemplate[];

  private _searchfilterby: string;
  get searchfilterby(): string {
    return this._searchfilterby;
  }

  set searchfilterby(value: string) {
    this._searchfilterby = value;
    if (!value)
      this.searchFilteredNotificationTemplates = this.notificationTemplates;
    else
      this.searchFilteredNotificationTemplates = this.notificationTemplates.filter((v, i, a) => {
        return v.name.toLowerCase().indexOf(this._searchfilterby.toLowerCase()) > -1
      });
  }

  constructor(private templatesService: TemplatesService,
              private router: Router) {
    this.state = router.routerState.snapshot;
  }

  ngOnInit() {
  }

  getNotificationTemplates() {
    this.templatesService.getNotificationTemplates().subscribe(
      (result) => {
        this.searchFilteredNotificationTemplates = this.notificationTemplates = result;
      }
    );
  }

  onEdit(notificationTemplate: NotificationTemplate) {
    this.templatesService.notificationTemplateForEdit.next(JSON.parse(JSON.stringify(notificationTemplate)));
    this.router.navigate(['create-notification-template',false], {queryParams: {returnUrl: this.state.url}});
  }

  onCreateNew() {
    this.templatesService.notificationTemplateForEdit.next(new NotificationTemplate());
    this.router.navigate(['create-notification-template',true], {queryParams: {returnUrl: this.state.url}});
  }
}
