import {Component, EventEmitter, Output} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {UndTrackingService} from "../_services/und-tracking.service";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',

})

export class HeaderComponent {

  @Output() logout = new EventEmitter();

  constructor(private authenticationService: AuthenticationService, private undtrackingService: UndTrackingService) {

  }

  clientName(): string {
    return this.authenticationService.getUsername();
  }

  logoutUser() {
    this.undtrackingService.logout();
    this.authenticationService.logout();
    this.logout.emit();
  }
}
