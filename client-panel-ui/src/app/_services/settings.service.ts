import {Injectable} from '@angular/core';
import {AccountSettings, SendersInfo, ServiceProviderCredentials, UnSubscribeLink} from "../_models/client";
import {Campaign} from "../_models/campaign";
import {Observable} from "rxjs/Observable";
import {AppSettings} from "../_settings/app-settings";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class SettingsService {

  serviceProvidersList: ServiceProviderCredentials[] = [];
  sendersInfoList: SendersInfo[] = [];

  constructor(private httpClient: HttpClient) {
  }

  saveServiceProviderCredentialEmail(serviceProviderCredentials: ServiceProviderCredentials): Observable<any> {
    return this.httpClient.post<ServiceProviderCredentials>(AppSettings.API_ENDPOINT_CLIENT_SETTING_EMAIL_SERVICE_PROVIDER_SAVE, serviceProviderCredentials);
  }

  saveServiceProviderCredentialsSms(serviceProviderCredentials: ServiceProviderCredentials): Observable<any> {
    return this.httpClient.post<ServiceProviderCredentials>(AppSettings.API_ENDPOINT_CLIENT_SETTING_SMS_SERVICE_PROVIDER_SAVE, serviceProviderCredentials);
  }

  saveServiceProviderCredentialsNotification(serviceProviderCredentials: ServiceProviderCredentials): Observable<any> {
    return this.httpClient.post<ServiceProviderCredentials>(AppSettings.API_ENDPOINT_CLIENT_SETTING_NOTIFICATION_SERVICE_PROVIDER_SAVE, serviceProviderCredentials);
  }

  saveServiceProviderCredentialsAndroidPush(serviceProviderCredentials: ServiceProviderCredentials): Observable<any> {
    return this.httpClient.post<ServiceProviderCredentials>(AppSettings.API_ENDPOINT_CLIENT_SETTING_NOTIFICATION_SERVICE_PROVIDER_SAVE, serviceProviderCredentials);
  }

  saveServiceProviderCredentialsWebPush(serviceProviderCredentials: ServiceProviderCredentials): Observable<any> {
    return this.httpClient.post<ServiceProviderCredentials>(AppSettings.API_ENDPOINT_CLIENT_SETTING_NOTIFICATION_SERVICE_PROVIDER_SAVE, serviceProviderCredentials);
  }

  saveServiceProviderCredentialsIOSPush(serviceProviderCredentials: ServiceProviderCredentials): Observable<any> {
    return this.httpClient.post<ServiceProviderCredentials>(AppSettings.API_ENDPOINT_CLIENT_SETTING_NOTIFICATION_SERVICE_PROVIDER_SAVE, serviceProviderCredentials);
  }

  getServiceProvidersList(): Observable<ServiceProviderCredentials[]> {
    return this.httpClient.get<ServiceProviderCredentials[]>(AppSettings.API_ENDPOINT_CLIENT_SETTING_ALL_SERVICE_PROVIDERS);
  }

  saveAccountSettings(accountSettings: AccountSettings): Observable<any> {
    return this.httpClient.post<AccountSettings>(AppSettings.API_ENDPOINT_CLIENT_SETTING_ACCOUNT_SETTINGS_SAVE, accountSettings);
  }

  getAccountSettings(): Observable<any> {
    return this.httpClient.get<AccountSettings>(AppSettings.API_ENDPOINT_CLIENT_SETTING_ACCOUNT_SETTINGS_GET);
  }

  saveUnSubscribeLink(unSubscribeLink: UnSubscribeLink): Observable<any> {
    return this.httpClient.post<UnSubscribeLink>(AppSettings.API_ENDPOINT_CLIENT_SETTING_ACCOUNT_SETTINGS_UNSUBSCRIBE_LINK_SAVE, unSubscribeLink);
  }

  getUnSubscribeLink(): Observable<any> {
    return this.httpClient.get<UnSubscribeLink>(AppSettings.API_ENDPOINT_CLIENT_SETTING_ACCOUNT_SETTINGS_UNSUBSCRIBE_LINK_GET);
  }

  // Do Check my Post Call
  refreshToken(): Observable<any> {
    return this.httpClient.post<null>(AppSettings.API_ENDPOINT_AUTH_SETTING_REFRESHTOKEN + "/false", null);
  }

  saveSendersInfo(sendersInfo): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<SendersInfo>(AppSettings.API_ENDPOINT_CLIENT_SETTING_SENDERS_EMAIL_ADD, sendersInfo, {headers: headers});
  }

  getSendersInfoList(): Observable<any> {
    return this.httpClient.get<SendersInfo>(AppSettings.API_ENDPOINT_CLIENT_SETTING_SENDERS_EMAIL_LIST);
  }

  deleteSendersInfo(sendersInfo): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<SendersInfo>(AppSettings.API_ENDPOINT_CLIENT_SETTING_SENDERS_EMAIL_DELETE, sendersInfo, {headers: headers});
  }

  readonly serviceProviders: any = {
    "Email Service Provider": {
      "name": "Email Service Provider",
      "displayName": "Email Service Provider",
      "providers": {
        "SMTP": {
          "name": "SMTP",
          "displayName": "SMTP",
          "fields": [
            {
              "fieldName": "url",
              "fieldDisplayName": "URL",
              "required": true,
              "fieldType": "string",
            },
            {
              "fieldName": "port",
              "fieldDisplayName": "Port",
              "required": true,
              "fieldType": "number",
            },
            {
              "fieldName": "username",
              "fieldDisplayName": "Username",
              "required": true,
              "fieldType": "string",
            },
            {
              "fieldName": "password",
              "fieldDisplayName": "Password",
              "required": true,
              "fieldType": "string",
            }
          ]
        },
        "AWS - Simple Email Service (API)": {
          "name": "AWS - Simple Email Service (API)",
          "displayName": "AWS - Simple Email Service (API)",
          "fields": [
            {
              "fieldName": "AWS_REGION",
              "fieldDisplayName": "AWS Region",
              "required": true,
              "fieldType": "string",
            },
            {
              "fieldName": "AWS_ACCESS_KEY_ID",
              "fieldDisplayName": "AWS Access Key ID",
              "required": true,
              "fieldType": "string",
            },
            {
              "fieldName": "AWS_SECRET_ACCESS_KEY",
              "fieldDisplayName": "AWS Secret Access Key",
              "required": true,
              "fieldType": "string",
            }
          ]
        },
        "AWS - Simple Email Service (SMTP)": {
          "name": "AWS - Simple Email Service (SMTP)",
          "displayName": "AWS - Simple Email Service (SMTP)",
          "fields": [
            {
              "fieldName": "url",
              "fieldDisplayName": "URL",
              "required": true,
              "fieldType": "string",
            },
            {
              "fieldName": "port",
              "fieldDisplayName": "Port",
              "required": true,
              "fieldType": "number",
            },
            {
              "fieldName": "username",
              "fieldDisplayName": "Username",
              "required": true,
              "fieldType": "string",
            },
            {
              "fieldName": "password",
              "fieldDisplayName": "Password",
              "required": true,
              "fieldType": "string",
            }
          ]
        }
      }
    },
    "SMS Service Provider": {
      "name": "SMS Service Provider",
      "displayName": "SMS Service Provider",
      "providers": {
        "AWS - Simple Notification Service": {
          "name": "AWS - Simple Notification Service",
          "displayName": "AWS - Simple Notification Service",
          "fields": [
            {
              "fieldName": "AWS_REGION",
              "fieldDisplayName": "AWS Region",
              "required": true,
              "fieldType": "string",
            },
            {
              "fieldName": "AWS_ACCESS_KEY_ID",
              "fieldDisplayName": "AWS Access Key ID",
              "required": true,
              "fieldType": "string",
            },
            {
              "fieldName": "AWS_SECRET_ACCESS_KEY",
              "fieldDisplayName": "AWS Secret Access Key",
              "required": true,
              "fieldType": "string",
            }
          ]
        },
        "Exotel": {
          "name": "Exotel",
          "displayName": "Exotel",
          "fields": [
            {
              "fieldName": "sid",
              "fieldDisplayName": "SID",
              "required": true,
              "fieldType": "string",
            },
            {
              "fieldName": "token",
              "fieldDisplayName": "Token",
              "required": true,
              "fieldType": "string",
            }
          ]
        }
      }
    },
    "Notification Service Provider": {
      "name": "Notification Service Provider",
      "displayName": "Notification Service Provider",
      "providers": {
        "Google - FCM": {
          "name": "Google - FCM",
          "displayName": "Google - FCM",
          "fields": [
            {
              "fieldName": "apiKey",
              "fieldDisplayName": "API Key",
              "required": true,
              "fieldType": "string"
            },
            {
              "fieldName": "senderId",
              "fieldDisplayName": "Sender ID",
              "required": true,
              "fieldType": "string"
            }
          ]
        }
      }
    },
    "Android Push Service Provider": {
      "name": "Android Push Service Provider",
      "displayName": "Android Push Service Provider",
      "providers": {
        "Google - FCM": {
          "name": "Google - FCM",
          "displayName": "Google - FCM",
          "fields": [
            {
              "fieldName": "apiKey",
              "fieldDisplayName": "API Key",
              "required": true,
              "fieldType": "string"
            },
            {
              "fieldName": "senderId",
              "fieldDisplayName": "Sender ID",
              "required": true,
              "fieldType": "string"
            }
          ]
        }
      }
    },
    "Web Push Service Provider": {
      "name": "Web Push Service Provider",
      "displayName": "Web Push Service Provider",
      "providers": {
        "Google - FCM": {
          "name": "Google - FCM",
          "displayName": "Google - FCM",
          "fields": [
            {
              "fieldName": "apiKey",
              "fieldDisplayName": "API Key",
              "required": true,
              "fieldType": "string"
            },
            {
              "fieldName": "senderId",
              "fieldDisplayName": "Sender ID",
              "required": true,
              "fieldType": "string"
            }
          ]
        }
      }
    },
    "iOS Push Service Provider": {
      "name": "iOS Push Service Provider",
      "displayName": "iOS Push Service Provider",
      "providers": {
        "Google - FCM": {
          "name": "Google - FCM",
          "displayName": "Google - FCM",
          "fields": [
            {
              "fieldName": "apiKey",
              "fieldDisplayName": "API Key",
              "required": true,
              "fieldType": "string"
            },
            {
              "fieldName": "senderId",
              "fieldDisplayName": "Sender ID",
              "required": true,
              "fieldType": "string"
            }
          ]
        }
      }
    }
  }
  ;

  /*
 export enum ServiceProvider {
   AWS_SES,
   AWS_SNS,
   GOOGLE_FCM
 }

 export enum ServiceProviderType {
   EMAIL_SERVICE_PROVIDER,
   SMS_SERVICE_PROVIDER,
   NOTIFICATIONS_SERVICE_PROVIDER
 }
  */
}
