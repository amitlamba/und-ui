import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../_services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../../_services/message.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  verified: boolean;
  code: string;
  email: string;

  constructor(private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.code = this.route.snapshot.params["code"];
    this.email = this.route.snapshot.params["email"];
    // debugger;
    this.verifyEmail();
  }

  verifyEmail() {
    this.authenticationService.verifyEmail(this.email, this.code).subscribe((result) => {
        this.verified = true;
        this.messageService.addSuccessMessage("Email Address verified Successfully. Redirecting you to login");
        this.router.navigate(['login']);
      },
      (error: HttpErrorResponse) => {
        this.verified = false;
        this.messageService.addDangerMessage("There is an issue verifying your email address.");
      }
    );
  }
}
