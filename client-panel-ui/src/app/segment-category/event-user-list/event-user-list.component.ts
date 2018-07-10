import {Component, OnInit, Input} from '@angular/core';
import {EventUser} from "../../_models/user";
import {SegmentService} from "../../_services/segment.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-event-user-list',
  templateUrl: './event-user-list.component.html',
  styleUrls: ['./event-user-list.component.scss']
})
export class EventUserListComponent implements OnInit {
  @Input() eventUserList: EventUser[];

  constructor(private segmentService: SegmentService,
              private router: Router) {
  }

  ngOnInit() {
  }

  viewUserProfile(eventUser: EventUser) {
    this.segmentService.eventUser = eventUser;
    this.router.navigate(['/segment/user-profile']);
  }
}
