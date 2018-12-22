import { Component, OnInit } from '@angular/core';
import {SmsTemplate} from "../../_models/sms";
import {TemplatesService} from "../../_services/templates.service";
import {Router, RouterStateSnapshot} from "@angular/router";

@Component({
  selector: 'app-sms-templates',
  templateUrl: './sms-templates.component.html',
  styleUrls: ['./sms-templates.component.scss']
})
export class SmsTemplatesComponent implements OnInit {

  smsTemplates = new Array<SmsTemplate>()
  state: RouterStateSnapshot;

  searchFilteredSmsTemplates: SmsTemplate[];

  private _searchfilterby: string;
  get searchfilterby(): string {
    return this._searchfilterby;
  }

  set searchfilterby(value: string) {
    this._searchfilterby = value;
    if (!value)
      this.searchFilteredSmsTemplates = this.smsTemplates;
    else
      this.searchFilteredSmsTemplates = this.smsTemplates.filter((v, i, a) => {
        return v.name.toLowerCase().indexOf(this._searchfilterby.toLowerCase()) > -1
      });
  }

  constructor(private templatesService: TemplatesService,
              private router: Router) {
    this.state = router.routerState.snapshot;
  }

  ngOnInit() {
    this.templatesService.castSmsTemplates.subscribe(
      (smsTemplates) => {
        this.searchFilteredSmsTemplates = this.smsTemplates = smsTemplates;
      }
    );
    this.getSmsTemplates();
  }

  getSmsTemplates() {
    this.templatesService.getSmsTemplates().subscribe(
      (response) => {
        this.templatesService.addSmsTemplates(response);
      }
    );
  }

  onEdit(smsTemplate: SmsTemplate) {
    let smsForClone = JSON.parse(JSON.stringify(smsTemplate)) as SmsTemplate;
    smsForClone.id = null;
    this.templatesService.smsTemplateForEdit.next(smsForClone);
    this.router.navigate(['create-sms-template',false], {queryParams: {returnUrl: this.state.url}});
  }

  onCancel() {
    this.templatesService.smsTemplateForEdit.next(new SmsTemplate());
  }

  onCreateNew() {
    this.templatesService.smsTemplateForEdit.next(new SmsTemplate());
    // this.addComponent(true);
    this.router.navigate(['create-sms-template',true], {queryParams: {returnUrl: this.state.url}});

  }

}
