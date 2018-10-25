import {Component, OnInit} from '@angular/core';
import {TemplatesService} from "../../../_services/templates.service";
import {MessageService} from "../../../_services/message.service";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import {NotificationTemplate} from "../../../_models/notification";
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-notification-template-form',
  templateUrl: './create-notification-template-form.component.html',
  styleUrls: ['./create-notification-template-form.component.scss']
})
export class CreateNotificationTemplateFormComponent implements OnInit {

  createNewTemplate: boolean;
  state: RouterStateSnapshot;
  notificationTemplate: NotificationTemplate;
  returnUrl: string;

  notificationTemplateFormModel: FormGroup;

  constructor(private templatesService: TemplatesService, private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    this.route.params.subscribe((params) => {
      this.createNewTemplate = params['newTemplate'] === 'true';
    });
    this.state = this.router.routerState.snapshot;
  }

  ngOnInit() {
    this.templatesService.castNotificationTemplateForEdit.subscribe((notificationTemplateForEdit) => {
      this.notificationTemplate = notificationTemplateForEdit;
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/templates/notification';
  }

  /*
  name: string;
  notificationTemplateTitle: string;
  notificationTemplateBody: string;
  parentID: number;
  messageType: MessageType;
  tags: string;
   */
  private initNotificationTemplateForm() {
    this.notificationTemplateFormModel = this.fb.group({
      name: [this.notificationTemplate.name, [Validators.required]],
      notificationTemplateTitle: [this.notificationTemplate.notificationTemplateTitle],
      notificationTemplateBody: [this.notificationTemplate.notificationTemplateBody],
      messageType: [this.notificationTemplate.messageType]
    });
  }

  onCancel() {
    this.router.navigateByUrl(this.returnUrl);
  }
}
