import {Component, EventEmitter, Output} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',

})

export class HeaderComponent {

  @Output() logout = new EventEmitter();

  constructor(private authenticationService: AuthenticationService) {

  }

  clientName(): string {
    return this.authenticationService.getUsername();
  }

  logoutUser() {
    this.authenticationService.logout();
    this.logout.emit();
  }
}
