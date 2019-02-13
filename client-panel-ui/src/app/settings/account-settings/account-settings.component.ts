import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AccountSettings, UnSubscribeLink} from "../../_models/client";
import {SettingsService} from "../../_services/settings.service";
import {MessageService} from "../../_services/message.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  showCodeBlock: boolean = false;
  showIosCodeBlock:boolean=false;
  showAndroidCodeBlock:boolean=false;
  accountSettings: AccountSettings = new AccountSettings();
  UnSubscribeLink: UnSubscribeLink = new UnSubscribeLink();
  protocol: string = 'https://';
  websiteURL: string="";
  androidAppId:string="";
  iosAppId:string;
  protocolsArray: string[] = ['http://', 'https://'];
  codeSnippet: string;
  webToken: string;
  androidToken:string;
  iosToken:string;

  unSubscribeLink: string='';

  // ng2-timezone-picker is used from https://samuelnygaard.github.io/ng2-timezone-selector/docs/
  placeholderString = 'Select timezone';

  constructor(private settingsService: SettingsService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.accountSettings.timezone = "Asia/Kolkata";
    this.accountSettings.urls = [];
    this.accountSettings.andAppId=[];
    this.accountSettings.iosAppId=[];
    console.log(this.UnSubscribeLink);
    this.settingsService.getAccountSettings()
      .subscribe(
        (accountSettings) => {
          console.log(accountSettings);
          if (accountSettings && accountSettings !== 'null' && typeof accountSettings.urls[0] !== "undefined") {
            this.accountSettings.id = accountSettings.id;
            if (accountSettings.urls[0].substring(0, accountSettings.urls[0].indexOf("/") + 2) == 'https://') {
              this.protocol = accountSettings.urls[0].substring(0, accountSettings.urls[0].indexOf("/") + 2);
            }
            else {
              this.protocol = accountSettings.urls[0].substring(0, accountSettings.urls[0].indexOf("/") + 2)
            }

            this.websiteURL = accountSettings.urls[0].substring(accountSettings.urls[0].indexOf("/") + 2);
          }
          if (accountSettings && accountSettings !== 'null' && typeof accountSettings.andAppId[0] !== "undefined") {
            this.androidAppId=accountSettings.andAppId[0]
          }
          if (accountSettings && accountSettings !== 'null' && typeof accountSettings.iosAppId[0] !== "undefined") {
            this.iosAppId=accountSettings.iosAppId[0]
          }
        }
      );
    // this.settingsService.refreshToken().subscribe(
    //   (response) => {
    //     console.log(response.data.value.token);
    //     this.tokenValue = response.data.value.token;
    //     this.codeSnippet =
    //       "<script>(function(i,s,o,g,r,a,m){i['UserNDotObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*newDate();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//userndot.com/sdk/js/a.js','_und');\n" +
    //       "      _und('create', '"+this.tokenValue+"', {\n" +
    //       "      sites: ['"+this.protocol+"://"+this.websiteURL+"']\n" +
    //       "    });\n" +
    //       "</script>";
    //   }
    // );
    this.settingsService.getUnSubscribeLink()
      .subscribe(
        (unSubscribeLink:UnSubscribeLink) => {
          if (unSubscribeLink && unSubscribeLink.unSubscribeLink !== 'null') {
            this.unSubscribeLink = unSubscribeLink.unSubscribeLink;
          }
        }
      )
  }


  getJSIntegrationCode() {
    if(this.websiteURL && this.websiteURL.trim()) this.accountSettings.urls.push(this.protocol + this.websiteURL);
    if(this.androidAppId && this.androidAppId.trim()) this.accountSettings.andAppId.push(this.androidAppId);
    if(this.iosAppId && this.iosAppId.trim()) this.accountSettings.iosAppId.push(this.iosAppId);
    this.settingsService.saveAccountSettings(this.accountSettings)
      .subscribe(
        (response) => {
          this.messageService.addSuccessMessage('Account Setting Added Succesfully');
          this.accountSettings.urls = [];
          this.accountSettings.andAppId = [];
          this.accountSettings.iosAppId = [];
          let a;
          if(response['android'])  a=response['android'].data.value.token;
          let w;
          if(response['web']) w=response['web'].data.value.token;
          let i;
          if(response['ios'])i=response['ios'].data.value.token;
          if(a) {this.androidToken=a ; this.showAndroidCodeBlock=true;}
          if(w) {this.webToken=w ; this.showCodeBlock=true;}
          if(i) {this.iosToken=i ; this.showIosCodeBlock=true;}
        },
        (error: HttpErrorResponse) => {
          this.messageService.addDangerMessage('Error in Adding Account Setting,Please try again')
        }
      );
  }

  changeTimezone(timezone) {
    this.accountSettings.timezone = timezone;
  }

  addUnSubscribeLink() {
    this.UnSubscribeLink.unSubscribeLink=this.unSubscribeLink;
    console.log(this.UnSubscribeLink);
    this.settingsService.saveUnSubscribeLink(this.UnSubscribeLink)
      .subscribe(
        (response) => {
          this.messageService.addSuccessMessage('Unsubscribe Link Added Successfully.');
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          this.messageService.addDangerMessage('Error in adding Unsubscribe URL, Please try again.')
        }
      )
  }
}
