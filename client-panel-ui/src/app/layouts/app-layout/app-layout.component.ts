import {Component, OnInit} from '@angular/core';
import {UndTrackingService} from "../../_services/und-tracking.service";

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  hideLeftSidebar = false;

  constructor(private undtrackingService: UndTrackingService) {
  }

  ngOnInit() {
  }

  //Event on menu
  campaignEvent() {
    this.undtrackingService.trackMenuEvent({'Menu Name': 'Campaign'});
  }

  emailTemplateEvent() {
    this.undtrackingService.trackMenuEvent({'Menu Name': 'Email'});
  }

  smsTemplateEvent() {
    this.undtrackingService.trackMenuEvent({'Menu Name': 'Sms'});
  }

  androidTemplateEvent() {
    this.undtrackingService.trackMenuEvent({'Menu Name': 'Android Push'});
  }

  webTemplateEvent() {
    this.undtrackingService.trackMenuEvent({'Menu Name': 'Web Push'});

  }

  segmentEvent() {
    this.undtrackingService.trackMenuEvent({'Menu Name': 'Segment'});
  }

  findUsersEvent() {
    this.undtrackingService.trackMenuEvent({'Menu Name': 'Find Users'});
  }

  eventsReport() {
    this.undtrackingService.trackMenuEvent({'Menu Name': 'Events'});
  }

  funnelReport() {
    this.undtrackingService.trackMenuEvent({'Menu Name': 'Funnel'});
  }

  segmentReport() {
    this.undtrackingService.trackMenuEvent({'Menu Name': 'Segment'});
  }

  campaignReport() {
    this.undtrackingService.trackMenuEvent({'Menu Name': 'Campaign'});
  }

}
