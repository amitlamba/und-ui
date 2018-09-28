import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {AuthenticationService} from "../_services/authentication.service";
import {_RECAPTCHA_KEY} from "../_settings/app-settings";
import {MessageService} from "../_services/message.service";
import {SegmentService} from "../_services/segment.service";


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  public token: string;
  _site_key = _RECAPTCHA_KEY;
  recaptchaToken: string = null;
  returnUrl: string;

  @Output() loginEvent = new EventEmitter();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private messageService: MessageService,private segmentService:SegmentService) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;

  }

  ngOnInit() {

    this.authenticationService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  login() {
    this.loading = true;

    const body = {username: this.model.username, password: this.model.password};
    this.authenticationService.login(this.model.username, this.model.password, this.recaptchaToken).subscribe(
      (response) => {
        console.log(response);
        this.initialize();
        this.loginEvent.emit();
        this.router.navigateByUrl(this.returnUrl);
        this.messageService.addSuccessMessage("Logged In successfully.");
      },
      (error: HttpErrorResponse) => {
        this.error = error.error.message;
        this.loading = false;
        console.log("this.error: " + JSON.stringify(error) + ", this.loading: " + this.loading);
      }
    );
  }

  initialize() {
    this.segmentService.getCountries().subscribe(
      response => this.segmentService.countries = response
    );

    this.segmentService.getEvents().subscribe(
      (response) => {
        this.segmentService.cachedRegisteredEvents = response;
      }
    );
  }


  handleCorrectCaptcha(event) {
    console.log(event);
    this.recaptchaToken = event
  }
}
