import {Component, OnInit} from '@angular/core';
import {SendersInfo} from "../../_models/client";
import {SettingsService} from "../../_services/settings.service";

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit {
  sendersInfo: SendersInfo = new SendersInfo();
  sendersInfoList: SendersInfo[] = [];

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.settingsService.getSendersInfoList().subscribe(
      (sendersInfoList) => {
        this.sendersInfoList = sendersInfoList;
      }
    )
  }

  addSendersInfo() {
    // console.log(JSON.stringify(this.sendersInfo));
    this.settingsService.saveSendersInfo(JSON.stringify(this.sendersInfo))
      .subscribe(
        (response) => {
          this.settingsService.getSendersInfoList().subscribe(
            (sendersInfoList) => {
              this.sendersInfoList = sendersInfoList;
              this.sendersInfo = new SendersInfo();
            }
          )
        }
      );

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
