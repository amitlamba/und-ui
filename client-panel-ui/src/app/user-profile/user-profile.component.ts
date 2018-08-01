import {Component, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {SegmentService} from "../_services/segment.service";
import {Event, EventSelected, EventUser} from "../_models/user";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../_services/user.service";
import {MessageService} from "../_services/message.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfile: string;
  eventUser: EventUser = new EventUser();
  eventList: Event[] = [];
  eventsSelectedList: EventSelected[] = [];
  markTestUser: boolean = false;

  constructor(private segmentService: SegmentService,
              private router: Router,
              private userService: UserService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    if (this.isEmptyObject(this.segmentService.eventUser)) {
      this.router.navigate(['/segment/find-users']);
    }
    else {
      this.eventUser = this.segmentService.eventUser;
      this.markTestUser = this.eventUser.testUser;
      this.segmentService.getEventsListByUserId(this.eventUser.undId).subscribe(
        (response: Event[]) => {
          console.log(response);
          this.eventList = response;
          this.eventsSelectedList = this.eventList.map((v, i, a) => {
            let es = new EventSelected();
            es.event = v;
            es.selected = true;
            return es;
          });
        }, (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
      // this.segmentService.eventUser = new EventUser();
    }
    this.userProfile = 'userDetails';
  }

  myValue($event) {
    console.log($event.target.value);
    this.userProfile = $event.target.value;
    console.log(this.userProfile);
  }

  isEmptyObject(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  }

  showEventDetails(val) {
    this.eventsSelectedList.forEach((v, i, a) => {
      if (val == v.event.name) {
        a[i].selected = !v.selected
      }
    });
  }

  markTestUserChanged() {
    if(!this.markTestUser) {
      this.markTestUser = true;
      this.userService.markTestUser(this.eventUser.undId).subscribe(
        result => {
          this.eventUser.testUser = true;
          this.messageService.addSuccessMessage("Test User marked successfully.")
        }
      );
    } else {
      this.markTestUser = false;
      this.userService.unmarkTestUser(this.eventUser.undId).subscribe(
        result => {
          this.eventUser.testUser = false;
          this.messageService.addSuccessMessage("Test User unmarked successfully.")
        }
      );
    }
  }
}
@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}
