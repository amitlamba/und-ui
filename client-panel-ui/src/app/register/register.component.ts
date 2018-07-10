import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {RegistrationRequest} from "../_models/client";
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";
import {ReCaptchaComponent} from "angular2-recaptcha";
import {_RECAPTCHA_KEY} from "../_settings/app-settings";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Angular2 ReCaptcha Component used from https://github.com/xmaestro/angular2-recaptcha
  @ViewChild('ReCaptchaComponent') captcha: ReCaptchaComponent;
  recaptchaToken: string = null;
  preferredCountries = ['in', 'us', 'ru', 'gb'];
  phoneNumberLength: number;

  _site_key = _RECAPTCHA_KEY;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  model: RegistrationRequest = new RegistrationRequest();
  @ViewChild('f') form: any;
  loading = false;
  error = '';

  langs: string[] = [
    'English',
    'French',
    'German',
  ];

  onSubmit(form: FormData) {
    this.loading = true;
    console.log(this.model);
    if (this.form.valid) {
      console.log(this.form);
      console.log(this.model);
      this.authenticationService.register(this.model, this.recaptchaToken)
        .subscribe(
          response => {
            this.router.navigate(['/login']);
          },
          (error: Error) => {
            this.error = "Not Registered. Server Error: " + error.message;
            this.loading = false;
          }
        );
    }

  }

  phoneNumberLengthCheck($event) {
    console.log($event.length);
    this.phoneNumberLength = $event.length
  }
  ngOnInit() {
    this.captcha.reset();
  }

  handleCorrectCaptcha($event) {
    console.log("event daata \n" + $event);
    this.recaptchaToken = this.captcha.getResponse().toString();
    console.log("Token Data \n" + this.recaptchaToken);
  }
  saveCountryName($event){
    this.model.country = $event.substring(0,$event.indexOf('(')-1); //using indexOf so as to remove the special characters
  }
}
