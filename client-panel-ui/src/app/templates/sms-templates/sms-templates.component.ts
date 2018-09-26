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

  constructor(private templatesService: TemplatesService,
              private router: Router) {
    this.state = router.routerState.snapshot;
  }

  ngOnInit() {
    this.templatesService.castSmsTemplates.subscribe(
      (smsTemplates) => {
        this.smsTemplates = smsTemplates;
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
    this.templatesService.smsTemplateForEdit.next(JSON.parse(JSON.stringify(smsTemplate)));
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
