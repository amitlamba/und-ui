import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { NgForm} from "@angular/forms";
import {AuthenticationService} from "../../_services/authentication.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.scss']
})
export class ResetPwdComponent implements OnInit {
  @ViewChild('f') resetForm: NgForm;
  code: string='';
  loadForm=false;
  user={
    password:''
  };

  constructor(private route: ActivatedRoute,
              private authenticationService:AuthenticationService,
              private router:Router) { }

  ngOnInit() {
    this.code = this.route.snapshot.params["code"];
    this.authenticationService.resetpassword(this.code)
      .subscribe(
        (response) => {
          console.log(response);
          console.log(this.code);
          this.loadForm = true;
        },
        (error:HttpErrorResponse) => {
          console.log(error);
        }
      );

  }
  onSubmit() {
    this.authenticationService.resetpasswordupdate(this.code,this.user.password)
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/login']);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

}
