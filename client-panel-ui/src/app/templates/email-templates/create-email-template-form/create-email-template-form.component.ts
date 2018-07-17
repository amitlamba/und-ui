import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {EditorSelected, EmailTemplate} from "../../../_models/email";
import {TemplatesService} from "../../../_services/templates.service";
import {isNullOrUndefined} from "util";
import {Router} from "@angular/router";
import {MessageService} from "../../../_services/message.service";
import {UserFields} from "../../../_settings/app-settings";
import {UserParams} from "../../../_models/user";
import {SettingsService} from "../../../_services/settings.service";
import {SendersInfo} from "../../../_models/client";

@Component({
  selector: 'app-create-email-template-form',
  templateUrl: './create-email-template-form.component.html',
  styleUrls: ['./create-email-template-form.component.scss']
})
export class CreateEmailTemplateFormComponent implements OnInit, OnChanges {
  emailTemplate: EmailTemplate;
  createNewTemplate: boolean = false;
  unsubscribeButtonText = "Add Unsubscribe";

  sendersInfoList: SendersInfo[] = [];
  @ViewChild("emailTemplateForm") form: any;

  userFields = UserFields.USER_DETAIILS;
  public mentionItems: string[] = UserParams.params;


  constructor(private templatesService: TemplatesService, private messageService: MessageService,
              private settingsService: SettingsService, private router: Router) {
  }

  ngOnChanges() {
  }

  ngOnInit() {
    this.templatesService.castEmailTemplateForEdit.subscribe((emailTemplateForEdit) => {
      this.emailTemplate = emailTemplateForEdit;
    });
    if(this.settingsService.sendersInfoList.length > 1) {
      this.sendersInfoList = this.settingsService.sendersInfoList;
    } else {
      this.settingsService.getSendersInfoList().subscribe(
        (sendersInfoList) => {
          this.settingsService.sendersInfoList = sendersInfoList;
          this.sendersInfoList = this.settingsService.sendersInfoList;
        }
      );
    }
    if (this.createNewTemplate) {
      this.emailTemplate.from = "";                             // to set default value of Fromdropdown
      this.emailTemplate.messageType = "";                    // to set default value of MessageTypedropdown
      this.emailTemplate.editorSelected = EditorSelected.tinymceEditor;
    }
    this.setUpUnsubscribeButtonText()
  }

  onSave(form: FormData) {
    // console.log(JSON.stringify(this.emailTemplate));
    if (this.form.valid) {
      if (this.emailTemplate.id) {
        this.templatesService.saveEmailTemplate(this.emailTemplate)
          .subscribe(
            response => {
              this.templatesService.editEmailTemplate(this.emailTemplate);
              this.messageService.addSuccessMessage("Email Template Edited Successfully");
            }
          );
      } else {
        this.templatesService.saveEmailTemplate(this.emailTemplate)
          .subscribe(
            response => {
              console.log(response);
              this.emailTemplate.id = response
              this.templatesService.addEmailTemplate(this.emailTemplate);
              this.messageService.addSuccessMessage("Email Template Created Successfully");
            }
          );
      }
    }
  }

  addUnsubscribeLink(event) {
    if (this.emailTemplate.emailTemplateBody.indexOf('##UND_UNSUBSCRIBE_LINK##') < 0) {
      // document.querySelector('textarea').value = document.querySelector('textarea').value + '<a href="##UND_UNSUBSCRIBE_LINK##">Unsubscribe</a>';
      this.emailTemplate.emailTemplateBody = this.emailTemplate.emailTemplateBody + '<a href="##UND_UNSUBSCRIBE_LINK##">Unsubscribe</a>';
      event.srcElement.textContent = 'Remove Unsubscribe';
    }
    else {
      // document.querySelector('textarea').value = document.querySelector('textarea').value.replace('<a href="##UND_UNSUBSCRIBE_LINK##">Unsubscribe</a>', '');
      this.emailTemplate.emailTemplateBody = this.emailTemplate.emailTemplateBody.replace('<a href="##UND_UNSUBSCRIBE_LINK##">Unsubscribe</a>','');
      event.srcElement.textContent = 'Add Unsubscribe';
    }
  }

  changeEditorType($event) {
    let changeTextEditor = confirm("Are you sure you want to change the text editor, the message body will be lost?");
    if (changeTextEditor == true) {
      this.emailTemplate.emailTemplateBody = '';
      this.emailTemplate.editorSelected = $event;
      this.setUpUnsubscribeButtonText()
    }
    else {
      return false;
    }
  }

  redirectToSendersInfoPage() {
    // this.emailTemplateModalReference.nativeElement.className='modal hide';
    $('body').removeClass('modal-open');
    $('body').addClass('pr-0');
    $('.modal-backdrop').remove();
    this.router.navigate(['settings/email-list']);
  }

  setUpUnsubscribeButtonText() {
    if(this.emailTemplate && this.emailTemplate.emailTemplateBody && this.emailTemplate.emailTemplateBody.indexOf('##UND_UNSUBSCRIBE_LINK##') >= 0) {
      this.unsubscribeButtonText = "Remove Unsubscribe";
    } else {
      this.unsubscribeButtonText = "Add Unsubscribe";
    }
  }
}
