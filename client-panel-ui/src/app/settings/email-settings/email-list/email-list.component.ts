import {Component, OnInit} from '@angular/core';
import {SendersInfo, ServiceProviderCredentials} from "../../../_models/client";
import {SettingsService} from "../../../_services/settings.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "../../../_services/message.service";

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit {
  sendersInfo: SendersInfo = new SendersInfo();
  sendersInfoList: SendersInfo[] = [];
  returnUrl: string;
  serviceProviders:ServiceProviderCredentials[]=[];
  srpId:string;

  constructor(private settingsService: SettingsService, private route: ActivatedRoute,
              private messageService: MessageService, private router: Router) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  ngOnInit() {
    this.settingsService.getSendersInfoList().subscribe(
      (sendersInfoList) => {
        this.sendersInfoList = sendersInfoList;
      }
    );
    this.settingsService.getEmailServiceProviders().subscribe(
      (response) => {
        this.serviceProviders = response;
        this.srpId=response[0].id;
      }
    );
  }

  addSendersInfo() {
    // console.log(JSON.stringify(this.sendersInfo));
    console.log(this.srpId);
    this.sendersInfo.serviceProviderId=parseInt(this.srpId);
    this.settingsService.saveSendersInfo(JSON.stringify(this.sendersInfo))
      .subscribe(
        (response) => {
          this.settingsService.getSendersInfoList().subscribe(
            (sendersInfoList) => {
              this.sendersInfoList = sendersInfoList;
              this.sendersInfo = new SendersInfo();
              if(this.returnUrl)
                this.router.navigateByUrl(this.returnUrl);
            }
          )
        }
      );

  }

  cancel() {
    if(this.returnUrl)
      this.router.navigateByUrl(this.returnUrl);
  }

  deleteSendersInfo(senderInfo) {
    this.settingsService.deleteSendersInfo(JSON.stringify(senderInfo))
      .subscribe(
        (response) => {
          this.settingsService.getSendersInfoList().subscribe(
            (sendersInfoList) => {
              this.sendersInfoList = sendersInfoList;
            }
          )
        }
      );
  }
}
