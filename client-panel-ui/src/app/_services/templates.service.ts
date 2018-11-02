import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EmailTemplate} from "../_models/email";
import {AppSettings} from "../_settings/app-settings";
import {Observable} from "rxjs/Observable";
import {SmsTemplate} from "../_models/sms";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {forEach} from "@angular/router/src/utils/collection";
import {AndroidTemplate, KeyValuePair, NotificationTemplate, WebPushTemplate} from "../_models/notification";
import {map} from "rxjs/operators";

@Injectable()
export class TemplatesService {
  private emailTemplates = new BehaviorSubject<EmailTemplate[]>(new Array<EmailTemplate>());
  castEmailTemplates = this.emailTemplates.asObservable();
  emailTemplateForEdit = new BehaviorSubject<EmailTemplate>(new EmailTemplate());
  castEmailTemplateForEdit = this.emailTemplateForEdit.asObservable();

  private smsTemplates = new BehaviorSubject<SmsTemplate[]>(new Array<SmsTemplate>());
  castSmsTemplates = this.smsTemplates.asObservable();
  smsTemplateForEdit = new BehaviorSubject<SmsTemplate>(new SmsTemplate());
  castSmsTemplateForEdit = this.smsTemplateForEdit.asObservable();

  androidTemplateForEdit = new BehaviorSubject<AndroidTemplate>(new AndroidTemplate());
  castAndroidTemplateForEdit = this.androidTemplateForEdit.asObservable();
  webPushTemplateForEdit = new BehaviorSubject<WebPushTemplate>(new WebPushTemplate());
  castWebPushTemplateForEdit = this.webPushTemplateForEdit.asObservable();

  // closeModalDialogBox:boolean = false;

  constructor(private httpClient: HttpClient) {
  }

  editEmailTemplate(emailTemplate: EmailTemplate) {
    var emailTempletesArray = this.emailTemplates.getValue();
    emailTempletesArray.forEach((et, index, array) => {
      if (et.id === emailTemplate.id) {
        array[index] = emailTemplate;
      }
    });
  }

  addEmailTemplate(emailTemplate: EmailTemplate) {
    var emailTempletesArray = this.emailTemplates.getValue();
    emailTempletesArray.push(emailTemplate);
  }

  addEmailTemplates(emailTemplates: EmailTemplate[]) {
    this.emailTemplates.next(emailTemplates);
  }

  editSmsTemplate(smsTemplate: SmsTemplate) {
    var smsTempletesArray = this.smsTemplates.getValue();
    smsTempletesArray.forEach((st, index, array) => {
      if (st.id === smsTemplate.id) {
        array[index] = smsTemplate;
      }
    });
  }

  addSmsTemplate(smsTemplate: SmsTemplate) {
    var smsTempletesArray = this.smsTemplates.getValue();
    smsTempletesArray.push(smsTemplate);
  }

  addSmsTemplates(smsTemplates: SmsTemplate[]) {
    this.smsTemplates.next(smsTemplates);
  }

  getEmailTemplates(): Observable<EmailTemplate[]> {
    return this.httpClient.get<EmailTemplate[]>(AppSettings.API_ENDPOINT_CLIENT_CLIENT_EMAIL_TEMPLATES);
  }

  getEmailTemplateById(id: number): Observable<EmailTemplate> {
    return this.httpClient.get<EmailTemplate>(AppSettings.API_ENDPOINT_CLIENT_CLIENT_GET_EMAIL_TEMPLATE_BY_ID +"/" +id);
  }

  saveEmailTemplate(emailTemplate: EmailTemplate): Observable<any> {
    return this.httpClient.post(AppSettings.API_ENDPOINT_CLIENT_CLIENT_EMAIL_SAVE_TEMPLATES, emailTemplate);
  }

  getSmsTemplates(): Observable<SmsTemplate[]> {
    return this.httpClient.get<SmsTemplate[]>(AppSettings.API_ENDPOINT_CLIENT_CLIENT_SMS_TEMPLATES);
  }

  saveSmsTemplate(smsTemplate: SmsTemplate): Observable<any> {
    return this.httpClient.post(AppSettings.API_ENDPOINT_CLIENT_CLIENT_SMS_SAVE_TEMPLATES, smsTemplate);
  }

  getAndroidTemplates(): Observable<AndroidTemplate[]> {
    return this.httpClient.get<any[]>(AppSettings.API_ENDPOINT_CLIENT_ANDROID_TEMPLATES).pipe(
      map((res: any) => {
        console.log(res);
        return res.map((v)=> {
          let hm = v['customKeyValuePair'] as Object; //it is a hash map at the backend
          console.log(hm);
          let keys = Object.keys(hm);
          console.log(keys);
          let kvpl: KeyValuePair[] = [];
          keys.forEach((v1, i1, a1) => kvpl.push({key: v1, value: hm[v1]}));
          v['customKeyValuePair'] = kvpl; // hash map converted to a list
          console.log(v);
          return v as AndroidTemplate;
        });
        // return res;
      })
    );
    //Object.entries(data).map(([key, value]) => ({key,value}))
  }

  saveAndroidTemplate(androidTemplate: AndroidTemplate): Observable<any> {
    if(androidTemplate.customKeyValuePair && androidTemplate.customKeyValuePair.length) {
      let list = androidTemplate.customKeyValuePair;
      androidTemplate.customKeyValuePair = list.reduce<any>((p,v,i,a)=>{
        p[v.key] = v.value;
        return p;
      }, {});
    } else {
      androidTemplate.customKeyValuePair = null;
    }
    console.log("Saving: ");
    console.log(androidTemplate);
    return this.httpClient.post(AppSettings.API_ENDPOINT_CLIENT_ANDROID_SAVE, androidTemplate);
  }

  getWebPushTemplates(): Observable<WebPushTemplate[]> {
    return this.httpClient.get<any[]>(AppSettings.API_ENDPOINT_CLIENT_WEBPUSH_TEMPLATES).pipe(
      map((res: any) => {
        console.log(res);
        return res.map((v)=> {
          let hm = v['customDataPair'] as Object; //it is a hash map at the backend
          console.log(hm);
          let keys = Object.keys(hm);
          console.log(keys);
          let kvpl: KeyValuePair[] = [];
          keys.forEach((v1, i1, a1) => kvpl.push({key: v1, value: hm[v1]}));
          v['customDataPair'] = kvpl; // hash map converted to a list
          console.log(v);
          return v as WebPushTemplate;
        });
        // return res;
      })
    );
  }

  saveWebPushTemplate(webPushTemplate: WebPushTemplate): Observable<any> {
    if(webPushTemplate.customDataPair && webPushTemplate.customDataPair.length) {
      let list = webPushTemplate.customDataPair;
      webPushTemplate.customDataPair = list.reduce<any>((p,v,i,a)=>{
        p[v.key] = v.value;
        return p;
      }, {});
    } else {
      webPushTemplate.customDataPair = null;
    }
    console.log("Saving: ");
    console.log(webPushTemplate);
    return this.httpClient.post(AppSettings.API_ENDPOINT_CLIENT_WEBPUSH_SAVE, webPushTemplate);
  }
}
