import {AfterViewInit, Component, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./_services/authentication.service";

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent
  // implements OnInit, OnChanges, AfterViewInit
{

  loggedIn: boolean;

  constructor(private authenticationService: AuthenticationService) {
  }

  // ngOnInit(): void {
  //   this.isLoggedIn();
  // }
  //
  // ngOnChanges() {
  //   this.isLoggedIn();
  // }
  //
  // ngAfterViewInit() {
  //   this.isLoggedIn();
  //   // this.cdr.detectChanges();
  // }

  isLoggedIn() {
    if(this.authenticationService.token) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    return this.loggedIn;
  }

  login() {
    this.loggedIn=true;
  }

  logout() {
    // this.isLoggedIn();
    this.loggedIn=false;
    // this.authenticationService.logout();
  }

}
