import {Component, OnInit, ViewChild} from '@angular/core';
import {SmsTemplate} from "../../../_models/sms";
import {TemplatesService} from "../../../_services/templates.service";
import {MessageService} from "../../../_services/message.service";

@Component({
  selector: 'app-create-sms-template-form',
  templateUrl: './create-sms-template-form.component.html',
  styleUrls: ['./create-sms-template-form.component.scss']
})
export class CreateSmsTemplateFormComponent implements OnInit {

  smsTemplate: SmsTemplate = new SmsTemplate();
  @ViewChild("f") form: any;

  constructor(private templatesService: TemplatesService, private messageService: MessageService) { }

  ngOnInit() {
    this.templatesService.castSmsTemplateForEdit.subscribe((smsTemplateForEdit) => {
      this.smsTemplate=smsTemplateForEdit;
    });
  }

  onSave(form: FormData) {
    if (this.form.valid) {
      if (this.smsTemplate.id) {
        this.templatesService.saveSmsTemplate(this.smsTemplate)
          .subscribe(
            response => {
              this.templatesService.editSmsTemplate(this.smsTemplate);
              this.messageService.addSuccessMessage("Sms Template Edited Successfully");
            }
          );
      } else {
        this.templatesService.saveSmsTemplate(this.smsTemplate)
          .subscribe(
            response => {
              console.log(response);
              this.smsTemplate.id=response
              this.templatesService.addSmsTemplate(this.smsTemplate);
              this.messageService.addSuccessMessage("Sms Template Created Successfully");
            }
          );
      }
    }
  }
}
