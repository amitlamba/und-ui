import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from "./_services/authentication.service";
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {Location, PopStateEvent} from "@angular/common";

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

  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute,
              private router: Router, private location: Location) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.data);
    this.location.subscribe((ev:PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((ev:any) => {
      if (ev instanceof NavigationStart) {
        if (ev.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (ev instanceof NavigationEnd) {
        if (ev.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else
          window.scrollTo(0, 0);
      }
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
