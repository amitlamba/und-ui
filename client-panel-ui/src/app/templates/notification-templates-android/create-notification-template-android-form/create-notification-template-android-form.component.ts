import {Component, OnInit} from '@angular/core';
import {TemplatesService} from "../../../_services/templates.service";
import {MessageService} from "../../../_services/message.service";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import {
  AndroidAction, AndroidTemplate, BadgeIconType, KeyValuePair, NotificationTemplate,
  Priority
} from "../../../_models/notification";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-notification-template-form',
  templateUrl: './create-notification-template-android-form.component.html',
  styleUrls: ['./create-notification-template-android-form.component.scss']
})
export class CreateNotificationTemplateAndroidFormComponent implements OnInit {

  createNewTemplate: boolean;
  state: RouterStateSnapshot;
  androidTemplate: AndroidTemplate;
  returnUrl: string;

  advanced: boolean = false;

  androidTemplateFormModel: FormGroup;

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
    this.templatesService.castAndroidTemplateForEdit.subscribe((androidTemplateForEdit) => {
      this.androidTemplate = androidTemplateForEdit;
      this.initAndroidTemplateForm();
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/templates/notification-android';
  }

  /*
  name: string;
  notificationTemplateTitle: string;
  notificationTemplateBody: string;
  parentID: number;
  messageType: MessageType;
  tags: string;
   */
  private initAndroidTemplateForm() {
    this.androidTemplateFormModel = this.fb.group({
      name: [this.androidTemplate.name, [Validators.required]],
      title: [this.androidTemplate.title, [Validators.required]],
      body: [this.androidTemplate.body, [Validators.required]],
      channelId: [this.androidTemplate.channelId],
      channelName: [this.androidTemplate.channelName],
      imageUrl: [this.androidTemplate.imageUrl],
      largeIconUrl: [this.androidTemplate.largeIconUrl],
      deepLink: [this.androidTemplate.deepLink],
      actionGroup: this.fb.array(
        this.createActionGroup(this.androidTemplate.actionGroup)
      ),
      sound: [this.androidTemplate.sound],
      badgeIcon: [this.androidTemplate.badgeIcon],
      collapse_key: [this.androidTemplate.collapse_key],
      priority: [this.androidTemplate.priority],
      timeToLive: [this.androidTemplate.timeToLive],
      customKeyValuePair: this.fb.array(
        this.createCustomKeyValuePairsForm(this.androidTemplate.customKeyValuePair)
      )
    });
  }

  createActionGroup(actionGroup: AndroidAction[]): FormGroup[] {
    if(actionGroup && actionGroup.length) {
      return actionGroup.map((v,i,a) => {
        return this.createAction(v);
      })
    } else return [];
  }

  createAction(androidAction: AndroidAction): FormGroup {
    return this.fb.group({
      actionId: [androidAction.actionId],
      deepLink: [androidAction.deepLink],
      label: [androidAction.label],
      icon: [androidAction.icon],
      autoCancel: [androidAction.autoCancel]
    });
  }

  get actionGroup(): FormArray {
    return <FormArray>this.androidTemplateFormModel.get('actionGroup');
  }

  addAction() {
    let action = new AndroidAction();
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
    return <FormArray>this.androidTemplateFormModel.get('customKeyValuePair');
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
    let p = Object.keys(Priority).map(key => {return {key: key, value: Priority[key]}});
    return p;
  }

  get badgeIcons(): any[] {
    let bi = Object.keys(BadgeIconType).map(key => {return {key: key, value: BadgeIconType[key]}});
    return bi;
  }

  get name(): FormControl {
    return <FormControl>this.androidTemplateFormModel.get('name');
  }
  get title(): FormControl {
    return <FormControl>this.androidTemplateFormModel.get('title');
  }
  get body(): FormControl {
    return <FormControl>this.androidTemplateFormModel.get('body');
  }
  getKeyControl(i): FormControl {
    return <FormControl>((<FormGroup>this.customKeyValuePairsArray.controls[i]).controls['key']);
  }
  getValueControl(i): FormControl {
    return <FormControl>((<FormGroup>this.customKeyValuePairsArray.controls[i]).controls['value']);
  }

  save() {
    this.loading = true;
    let at = <AndroidTemplate>this.androidTemplateFormModel.value;
    if(this.createNewTemplate == false)
      at.id = this.androidTemplate.id;
    console.log(at);
    this.templatesService.saveAndroidTemplate(at).subscribe(
      response => {
        this.messageService.addSuccessMessage("Android Template Added Successfully");
        this.router.navigateByUrl(this.returnUrl);
        this.success = true;
        this.loading = false;
      },
      error => {
        this.success = false;
        this.loading = false;
      }
    );
  }
}
