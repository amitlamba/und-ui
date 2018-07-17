import {Component, Input, OnInit} from '@angular/core';
import {RegistrationRequest} from "../_models/client";
import {AuthenticationService} from "../_services/authentication.service";
import {ContactUs, ContactUsComponent} from "../contact-us/contact-us.component";
import {RegisterService} from "../_services/register.service";
import {_RECAPTCHA_KEY} from "../_settings/app-settings";
import {MessageService} from "../_services/message.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss']
})
export class DemoFormComponent implements OnInit {
  visitorName: string;
  preferredCountries = ['in', 'us', 'ru', 'gb'];
  @Input() modalDemoButton;
  contactUs: ContactUs = new ContactUs();
  _site_key = _RECAPTCHA_KEY;
  recaptchaToken: string = null;

  constructor(private registerService : RegisterService, private messageService: MessageService) {
  }

  ngOnInit() {
  }

  submitDemoForm(f) {
    console.log(f);
    // Fix Me (Below fields should not be filled before submitting)
    this.registerService.submitContactForm(this.contactUs, this.recaptchaToken)
      .subscribe(
        (response) => {
          console.log(response);
          this.contactUs = new ContactUs();
          this.recaptchaToken = null;
          this.messageService.addSuccessMessage("Message sent successfully");
        },
        (error: HttpErrorResponse) => {
          this.messageService.addDangerMessage("There is an error scheduling demo. "+ error.error.message);
        }
      )
  }

  handleCorrectCaptcha(event) {
    this.recaptchaToken = event;
  }
}
