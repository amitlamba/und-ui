import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from "./_services/authentication.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit
  // implements OnInit, OnChanges, AfterViewInit
{

  loggedIn: boolean;
  showLoggedInHeader: boolean;

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.data);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

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
