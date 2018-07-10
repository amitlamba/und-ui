import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AmPm, CampaignDateTime} from "../../../_models/campaign";
import * as moment from "moment";

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit {
  showCloseButton: boolean;
  _ref: any;
  campaignTime: CampaignDateTime = new CampaignDateTime();
  date = new Date();
  campaignTimeAmpPmList: string[];
  time = {
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  };

  @Input() campaignTimesList: CampaignDateTime[] = [];
  localCampaignLaterTime;
  // Date Picker Options
  public singlePicker = {
    singleDatePicker: true,
    showDropdowns: true,
    opens: "right",
    minDate: moment(),
    locale: {
      format: "DD/MM/YYYY"
    }
  };
  @Output() campaignLaterTimeChange = new EventEmitter();

  @Input() get campaignLaterTime(): CampaignDateTime {
    return this.localCampaignLaterTime;
  }

  set campaignLaterTime(campaignLaterTime: CampaignDateTime) {
    this.localCampaignLaterTime = campaignLaterTime;
    this.campaignLaterTimeChange.emit(this.localCampaignLaterTime);
  }

  constructor() {
    this.campaignTimeAmpPmList = Object.keys(AmPm);
  }

  ngOnInit() {
    this.campaignTime.hours = this.date.getHours() > 12 ? this.date.getHours() - 12 : this.date.getHours();
    console.log(this.campaignTime.hours);
    // this.campaignTime.minutes = (this.date.getMinutes());
    this.campaignTime.minutes = 10;
    this.campaignTime.ampm = this.date.getHours() < 12 ? AmPm.AM : AmPm.PM;
    this.campaignTime.date = moment(Date.now()).format("YYYY-MM-DD");
    this.campaignTimesList.push(this.campaignTime);
    this.campaignLaterTime=this.campaignTime;
  }

  singleSelect(val: any): void {
    this.campaignTime.date = moment(val.end.valueOf()).format("YYYY-MM-DD");
  }

  removeObject(): void {
    this.removeCampaignTime();
    this._ref.destroy();
  }

  removeCampaignTime(): void {
    this.campaignTimesList.forEach((data, index) => {
      if (this.campaignTime == data) {
        this.campaignTimesList.splice(index, 1);
      }
    })
  }

}
