import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {MessageService} from "../_services/message.service";
import {UndTrackingService} from "../_services/und-tracking.service";

@Component({
  selector: 'app-logout-header',
  templateUrl: './logout-header.component.html'
})
export class LogoutHeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private messageService: MessageService, private undtrackingService: UndTrackingService) {
  }

  ngOnInit() {

  }

  contactUsEvent() {
    this.undtrackingService.trackEvent("ContactUs", {});
  }

  priceEvent() {
    this.undtrackingService.trackEvent("Pricing", {});
  }

  documentEvent() {
    this.undtrackingService.trackEvent("Documentation", {});
  }

  get isLoggedIn(): boolean {
    return this.authenticationService.token ? true : false;
  }

  get logoLink(): string {
    return this.isLoggedIn ? "/dashboard" : "/";
  }

  get loginLink(): string {
    return this.isLoggedIn ? "/dashboard" : "/login";
  }

  get registerLink(): string {
    return this.isLoggedIn ? "/dashboard" : "/register";
  }
}
