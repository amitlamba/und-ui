import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {RegistrationRequest} from "../_models/client";
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";
import {ReCaptchaComponent} from "angular2-recaptcha";
import {_RECAPTCHA_KEY} from "../_settings/app-settings";
import {HttpErrorResponse} from "@angular/common/http";

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
  termsOfServiceChecked: boolean = false;

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
          (error: HttpErrorResponse) => {
            if(error.status == 400) {
              this.error = "Not Registered. Server Error: ";
              //FIXME : Handle in a single way at the backend.
              (<any[]>(error.error)).forEach((v)=> this.error += v.field +":"+ v.message + ", ");
            } else {
              this.error = "Not Registered. Server Error: " + JSON.stringify(error.error);
            }
            console.log("error: " + JSON.stringify(error.error));
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
