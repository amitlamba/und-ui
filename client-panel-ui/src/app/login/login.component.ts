import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {AuthenticationService} from "../_services/authentication.service";
import {_RECAPTCHA_KEY} from "../_settings/app-settings";


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

  @Output() loginEvent = new EventEmitter();

  constructor(private http: HttpClient,
              private router: Router,
              private authenticationService: AuthenticationService) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;

  }

  ngOnInit() {

    this.authenticationService.logout();
  }

  login() {
    this.loading = true;

    const body = {username: this.model.username, password: this.model.password};
    this.authenticationService.login(this.model.username, this.model.password, this.recaptchaToken).subscribe(
      (response) => {
        console.log(response);
        this.loginEvent.emit();
        this.router.navigate(['/dashboard']);
      },
      (error: HttpErrorResponse) => {
        this.error = error.error.message;
        this.loading = false;
        console.log("this.error: " + JSON.stringify(error) + ", this.loading: " + this.loading);
      }
    );
  }


  handleCorrectCaptcha(event) {
    console.log(event);
    this.recaptchaToken = event
  }
}
