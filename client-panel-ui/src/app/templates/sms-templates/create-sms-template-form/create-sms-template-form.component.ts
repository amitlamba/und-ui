import {Component, OnInit, ViewChild} from '@angular/core';
import {SmsTemplate} from "../../../_models/sms";
import {TemplatesService} from "../../../_services/templates.service";
import {MessageService} from "../../../_services/message.service";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";

@Component({
  selector: 'app-create-sms-template-form',
  templateUrl: './create-sms-template-form.component.html',
  styleUrls: ['./create-sms-template-form.component.scss']
})
export class CreateSmsTemplateFormComponent implements OnInit {

  smsTemplate: SmsTemplate = new SmsTemplate();
  @ViewChild("f") form: any;

  createNewTemplate: boolean;
  returnUrl: string;
  state: RouterStateSnapshot;

  constructor(private templatesService: TemplatesService, private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.createNewTemplate = params['newTemplate'] === 'true';
    });
    this.state = this.router.routerState.snapshot;
  }

  ngOnInit() {
    this.templatesService.castSmsTemplateForEdit.subscribe((smsTemplateForEdit) => {
      this.smsTemplate=smsTemplateForEdit;
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/templates/sms';
  }

  onSave(form: FormData) {
    if (this.form.valid) {
      if (this.smsTemplate.id) {
        this.templatesService.saveSmsTemplate(this.smsTemplate)
          .subscribe(
            response => {
              this.templatesService.editSmsTemplate(this.smsTemplate);
              this.messageService.addSuccessMessage("Sms Template Edited Successfully");
              this.router.navigateByUrl(this.returnUrl);
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
              this.router.navigateByUrl(this.returnUrl);
            }
          );
      }
    }
  }

  onCancel() {
    this.router.navigateByUrl(this.returnUrl);
  }
}
