import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../_services/authentication.service";
import {Router} from "@angular/router";
import {_RECAPTCHA_KEY} from "../../_settings/app-settings";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../../_services/message.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  user: any = {
    email: ''
  };
  _site_key = _RECAPTCHA_KEY;
  recaptchaToken: string = null;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
  }

  emptyUserEmail() {
    this.user.email = "";
  }

  submitEmail() {
    this.authenticationService.forgotpassword(this.user.email + '/', this.recaptchaToken)
      .subscribe(
        (response) => {
          console.log(response);
          this.messageService.addSuccessMessage("Email has been sent to your email id to reset password.");
          this.messageService.addSuccessMessage(JSON.stringify(response));
        },
        (error: HttpErrorResponse) => {
          this.messageService.addDangerMessage("There was in issue sending forgot password email. "+error.error.message);
        }
      );
  }

  handleCorrectCaptcha(event) {
    this.recaptchaToken = event;
  }

}
