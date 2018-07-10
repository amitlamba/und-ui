import { Component, OnInit } from '@angular/core';
import {SmsTemplate} from "../../_models/sms";
import {TemplatesService} from "../../_services/templates.service";

@Component({
  selector: 'app-sms-templates',
  templateUrl: './sms-templates.component.html',
  styleUrls: ['./sms-templates.component.scss']
})
export class SmsTemplatesComponent implements OnInit {

  smsTemplates = new Array<SmsTemplate>()

  constructor(private templatesService: TemplatesService) { }

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
  }

  onCancel() {
    this.templatesService.smsTemplateForEdit.next(new SmsTemplate());
  }

  onCreateNew() {
    this.templatesService.smsTemplateForEdit.next(new SmsTemplate());
  }
}
