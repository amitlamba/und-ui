import {Component, OnInit, ViewChild} from '@angular/core';
import {RegisterService} from "../_services/register.service";
import {HttpErrorResponse} from "@angular/common/http";
import {_RECAPTCHA_KEY} from "../_settings/app-settings";
import {MessageService} from "../_services/message.service";

@Component({
  selector: 'app-common-data',
  templateUrl: './common-data.component.html',
  styleUrls: ['./common-data.component.scss',
    '../landing-page-und/landing-page-und.component.scss']
})
export class CommonDataComponent implements OnInit {

  contactUs: ContactUs;
  loading: boolean = false;
  showSuccessMessage: boolean = false;
  showSubmitMessage: boolean = false;
  showErrorMessage: boolean = false;
  preferredCountries = ['in', 'us', 'ru', 'gb'];
  errorMessage: HttpErrorResponse;
  recaptchaToken: string = null;
  phoneNumberLength: number;

  _site_key = _RECAPTCHA_KEY;
  @ViewChild('contactUsForm') contactUsForm;

  constructor(private registerService: RegisterService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.contactUs = new ContactUs();
  }

  submitContactUsForm() {
    this.loading = true;
    this.showSubmitMessage = true;
    this.registerService.submitContactForm(this.contactUs, this.recaptchaToken)
      .subscribe(
        (response) => {
          console.log(response);
          this.loading = false;
          this.showSuccessMessage = true;
          this.contactUs = new ContactUs();
          this.contactUsForm.reset();
          this.contactUs.mobileNo = "";
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.showErrorMessage = true;
          console.log(JSON.stringify(error));
          this.errorMessage = error.error.message;
        }
      );
  }

  handleCorrectCaptcha(event) {
    this.recaptchaToken = event;
  }

  phoneNumberLengthCheck($event) {
    this.phoneNumberLength = $event.length
  }
}

export class ContactUs {
  name: string;
  email: string;
  mobileNo: string;
  message: string;
  companyName: string;
}

