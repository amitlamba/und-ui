import { Component, OnInit } from '@angular/core';
import {ReportsService} from "../../_services/reports.service";

@Component({
  selector: 'app-eventreport-geographics',
  templateUrl: './eventreport-geographics.component.html',
  styleUrls: ['./eventreport-geographics.component.scss']
})
export class EventreportGeographicsComponent implements OnInit {

  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    var eventReportFilter;
    this.reportsService.getEventAggregateTrend(eventReportFilter, 5, null).subscribe(
      (result) => {

      },
      (error) => {

      }
    )
  }

}
