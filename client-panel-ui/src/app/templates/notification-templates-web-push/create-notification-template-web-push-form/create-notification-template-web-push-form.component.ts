import {Component, OnInit} from '@angular/core';
import {KeyValuePair, Priority, WebPushAction, WebPushTemplate} from "../../../_models/notification";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TemplatesService} from "../../../_services/templates.service";
import {MessageService} from "../../../_services/message.service";

@Component({
  selector: 'app-create-notification-template-web-push-form',
  templateUrl: './create-notification-template-web-push-form.component.html',
  styleUrls: ['./create-notification-template-web-push-form.component.scss']
})
export class CreateNotificationTemplateWebPushFormComponent implements OnInit {

  createNewTemplate: boolean;
  state: RouterStateSnapshot;
  webPushTemplate: WebPushTemplate;
  returnUrl: string;

  advanced: boolean = false;

  webPushTemplateFormModel: FormGroup;

  loading = false;
  success = false;

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
    this.templatesService.castWebPushTemplateForEdit.subscribe((webPushTemplateForEdit) => {
      this.webPushTemplate = webPushTemplateForEdit;
      this.initWebPushTemplateForm();
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/templates/notification-web-push';
  }

  /*
  name: string;
  notificationTemplateTitle: string;
  notificationTemplateBody: string;
  parentID: number;
  messageType: MessageType;
  tags: string;
   */
  private initWebPushTemplateForm() {
    this.webPushTemplateFormModel = this.fb.group({
      name: [this.webPushTemplate.name, [Validators.required]],
      title: [this.webPushTemplate.title, [Validators.required]],
      body: [this.webPushTemplate.body, [Validators.required]],
      lang: [this.webPushTemplate.lang],
      badgeUrl: [this.webPushTemplate.badgeUrl],
      iconUrl: [this.webPushTemplate.iconUrl],
      imageUrl: [this.webPushTemplate.imageUrl],
      tag: [this.webPushTemplate.tag],
      requireInteraction: [this.webPushTemplate.requireInteraction],
      actionGroup: this.fb.array(
        this.createActionGroup(this.webPushTemplate.actionGroup)
      ),
      urgency: [this.webPushTemplate.urgency],
      ttl: [this.webPushTemplate.ttl],
      link: [this.webPushTemplate.link],
      customDataPair: this.fb.array(
        this.createCustomKeyValuePairsForm(this.webPushTemplate.customDataPair)
      )
    });
  }

  createActionGroup(actionGroup: WebPushAction[]): FormGroup[] {
    if (actionGroup && actionGroup.length) {
      return actionGroup.map((v, i, a) => {
        return this.createAction(v);
      })
    } else return [];
  }

  createAction(wpAction: WebPushAction): FormGroup {
    return this.fb.group({
      action: [wpAction.action],
      title: [wpAction.title],
      iconUrl: [wpAction.iconUrl]
    });
  }

  get actionGroup(): FormArray {
    return <FormArray>this.webPushTemplateFormModel.get('actionGroup');
  }

  addAction() {
    let action = new WebPushAction();
    this.actionGroup.push(this.createAction(action));
  }

  removeAction(index) {
    this.actionGroup.removeAt(index);
  }

  createCustomKeyValuePairsForm(keyValuePairs: KeyValuePair[]): FormGroup[] {
    if (keyValuePairs && keyValuePairs.length) {
      return keyValuePairs.map((v, i, a) => {
        return this.createCustomKeyValuePairForm(v);
      })
    } else return [];
  }

  createCustomKeyValuePairForm(keyValuePair: KeyValuePair): FormGroup {
    return this.fb.group({
      key: [keyValuePair.key, [Validators.required]],
      value: [keyValuePair.value, [Validators.required]]
    });
  }

  get customKeyValuePairsArray(): FormArray {
    return <FormArray>this.webPushTemplateFormModel.get('customDataPair');
  }

  addCustomKeyValuePair() {
    let kvp = new KeyValuePair();
    this.customKeyValuePairsArray.push(this.createCustomKeyValuePairForm(kvp));
  }

  removeCustomKeyValuePair(index) {
    this.customKeyValuePairsArray.removeAt(index);
  }

  onCancel() {
    this.router.navigateByUrl(this.returnUrl);
  }

  get priorities(): any[] {
    let p = Object.keys(Priority).map(key => {
      return {key: key, value: Priority[key]}
    });
    return p;
  }

  get name(): FormControl {
    return <FormControl>this.webPushTemplateFormModel.get('name');
  }

  get title(): FormControl {
    return <FormControl>this.webPushTemplateFormModel.get('title');
  }

  get body(): FormControl {
    return <FormControl>this.webPushTemplateFormModel.get('body');
  }

  getKeyControl(i): FormControl {
    return <FormControl>((<FormGroup>this.customKeyValuePairsArray.controls[i]).controls['key']);
  }

  getValueControl(i): FormControl {
    return <FormControl>((<FormGroup>this.customKeyValuePairsArray.controls[i]).controls['value']);
  }

  save() {
    this.loading = true;
    let wpt = <WebPushTemplate>this.webPushTemplateFormModel.value
    if (this.createNewTemplate == false)
      wpt.id = this.webPushTemplate.id;
    console.log(wpt);
    this.templatesService.saveWebPushTemplate(wpt).subscribe(
      response => {
        this.messageService.addSuccessMessage("Web Push Template Added Successfully");
        this.router.navigateByUrl(this.returnUrl);
        this.success = true;
        this.loading = false;
      },
      error => {
        this.success = false;
        this.loading = false;
        if (error.error.error)
          this.messageService.addDangerMessage(error.error.error);
        if (error.error && error.error.length) {
          error.error.forEach(v => {
              this.messageService.addDangerMessage(
                v.field + " : " + v.message
              )
            }
          );
        }
      }
    );
  }

}
