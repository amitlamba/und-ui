import { Component, OnInit } from '@angular/core';
import {AndroidTemplate, NotificationTemplate} from "../../_models/notification";
import {TemplatesService} from "../../_services/templates.service";
import {Router, RouterStateSnapshot} from "@angular/router";

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
              private router: Router) {
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

  onEdit(notificationTemplate: AndroidTemplate) {
    this.templatesService.androidTemplateForEdit.next(JSON.parse(JSON.stringify(notificationTemplate)));
    this.router.navigate(['create-notification-template-android',false], {queryParams: {returnUrl: this.state.url}});
  }

  onCreateNew() {
    this.templatesService.androidTemplateForEdit.next(new AndroidTemplate());
    this.router.navigate(['create-notification-template-android',true], {queryParams: {returnUrl: this.state.url}});
  }
}
