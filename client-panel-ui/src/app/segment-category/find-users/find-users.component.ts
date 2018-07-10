import {Component, OnInit, ViewChild} from '@angular/core';
import {SegmentService} from "../../_services/segment.service";
import {Segment} from "../../_models/segment";
import {Router} from "@angular/router";
import {identifierModuleUrl} from "@angular/compiler";
import {EventUser} from "../../_models/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-find-users',
  templateUrl: './find-users.component.html',
  styleUrls: ['./find-users.component.scss']
})
export class FindUsersComponent implements OnInit {
  invalidID: boolean = false;
  newSegment: Segment;
  inputPlaceholder: string;
  userIdentity: string;
  loadingIcon: boolean = false;
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  eventUserList: EventUser[] = [];

  constructor(private segmentService: SegmentService,
              private router: Router) {
    this.newSegment = new Segment();
    // this.newSegment.didEvents = new DidEvents();
    // this.newSegment.didNotEvents = new DidEvents();
    // this.newSegment.globalFilters = [];
    // this.newSegment.geographyFilters = new Array<Geography>();
    this.segmentService.initSegment(this.newSegment);
    this.newSegment.type = "Behaviour";
    this.segmentService.editSegment = this.newSegment;
  }

  ngOnInit() {
    this.inputPlaceholder = "Email";
  }

  findUserByIdentity() {
    console.log();
    this.loadingIcon = true;
    switch (this.inputPlaceholder) {
      case "Email": {
        this.segmentService.findUserByEmailID(this.userIdentity).subscribe(
          (userProfileObject: EventUser) => {
            console.log(userProfileObject);
            this.loadingIcon = false;
            this.segmentService.eventUser = userProfileObject;
            this.router.navigate(['/segment/user-profile']);
          }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse.error.message);
            this.loadingIcon = false;
            this.errorMessage = errorResponse.error.message;
          }
        );
        break;
      }
      case "Facebook ID": {
        this.segmentService.findUserByFacebookID(this.userIdentity).subscribe(
          (userProfileObject: EventUser) => {
            console.log(userProfileObject);
            this.loadingIcon = false;
            this.segmentService.eventUser = userProfileObject;
            this.router.navigate(['/segment/user-profile']);
          }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse.error.message);
            this.loadingIcon = false;
            this.errorMessage = errorResponse.error.message;
          }
        );
        break;
      }
      case "Google ID": {
        this.segmentService.findUserByGoogleID(this.userIdentity).subscribe(
          (userProfileObject: EventUser) => {
            console.log(userProfileObject);
            this.loadingIcon = false;
            this.segmentService.eventUser = userProfileObject;
            this.router.navigate(['/segment/user-profile']);
          }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse.error.message);
            this.loadingIcon = false;
            this.errorMessage = errorResponse.error.message;
          }
        );
        break;
      }
      case "UserNDot ID": {
        this.segmentService.findUserByUndID(this.userIdentity).subscribe(
          (userProfileObject: EventUser) => {
            console.log(userProfileObject);
            this.loadingIcon = false;
            this.segmentService.eventUser = userProfileObject;
            this.router.navigate(['/segment/user-profile']);
          }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse.error.message);
            this.loadingIcon = false;
            this.errorMessage = errorResponse.error.message;
          }
        );
        break;
      }
      case "Client User ID": {
        this.segmentService.findUserByClientUserID(this.userIdentity).subscribe(
          (userProfileObject: EventUser) => {
            console.log(userProfileObject);
            this.loadingIcon = false;
            this.segmentService.eventUser = userProfileObject;
            this.router.navigate(['/segment/user-profile']);
          }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse.error.message);
            this.loadingIcon = false;
            this.errorMessage = errorResponse.error.message;
          }
        );
        break;
      }
      case "Mobile Number": {
        this.segmentService.findUserByMobileNo(this.userIdentity).subscribe(
          (userProfileObject: EventUser) => {
            console.log(userProfileObject);
            this.loadingIcon = false;
            this.segmentService.eventUser = userProfileObject;
            this.router.navigate(['/segment/user-profile']);
          }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse.error.message);
            this.loadingIcon = false;
            this.errorMessage = errorResponse.error.message;
          }
        );
        break;
      }

    }
  }

  // TODO:APPLY VALIDATION ON IDENTIY
  // onKey(inputValue: string) {
  //   let emailRegexpresssion = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
  //   this.invalidID = emailRegexpresssion.test(inputValue);
  // }


  changeInputPlaceholder(placeholderValue: string) {
    this.inputPlaceholder = placeholderValue;
    this.userIdentity = '';
  }

  receiveEventUserList($event) {
    this.segmentService.eventUserList = $event;
    this.eventUserList = this.segmentService.eventUserList;
    console.log($event);
  }
}
