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
  accountSettings: AccountSettings = new AccountSettings();
  UnSubscribeLink: UnSubscribeLink = new UnSubscribeLink();
  protocol: string = 'https://';
  websiteURL: string;
  protocolsArray: string[] = ['http://', 'https://'];
  codeSnippet: string;
  tokenValue: string;
  unSubscribeLink: string='';

  // ng2-timezone-picker is used from https://samuelnygaard.github.io/ng2-timezone-selector/docs/
  placeholderString = 'Select timezone';

  constructor(private settingsService: SettingsService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.accountSettings.timezone = "Asia/Kolkata";
    this.accountSettings.urls = [];
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
        }
      );
    this.settingsService.refreshToken().subscribe(
      (response) => {
        console.log(response.data.value.token);
        this.tokenValue = response.data.value.token;
        this.codeSnippet = "var _und = _und || {event: [], profile: [], account: [], onUserLogin: [], notifications: []};\n" +
          "    // replace with the UND_ACCOUNT_ID with the actual ACCOUNT ID value from your Dashboard -> Settings page\n" +
          "    _und.account.push({\"id\":" + this.tokenValue + "});\n" +
          "    (function () {\n" +
          "        var dsft = document.createElement('script');\n" +
          "        dsft.type = 'text/javascript';\n" +
          "        dsft.async = true;\n" +
          "//                dsft.src =  ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';\n" +
          "        dsft.src = 'build/main.min.js';\n" +
          "        var s = document.getElementsByTagName('script')[0];\n" +
          "        s.parentNode.insertBefore(dsft, s);\n" +
          "    })();"
      }
    );
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
    this.showCodeBlock = true;
    this.accountSettings.urls.push(this.protocol + this.websiteURL);
    this.settingsService.saveAccountSettings(this.accountSettings)
      .subscribe(
        (response) => {
          this.messageService.addSuccessMessage('Website Url Added Succesfully');
          this.accountSettings.urls = [];
        },
        (error: HttpErrorResponse) => {
          this.messageService.addDangerMessage('Error in Adding Website Url,Please try again')
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
