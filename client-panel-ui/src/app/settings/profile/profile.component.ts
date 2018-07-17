import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from "../../_services/authentication.service";
import {UserProfileRequest} from "../../_models/client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('f') form: any;

  userProfile: UserProfileRequest = new UserProfileRequest();
  successMessage: string = "";
  username: string;

  langs: string[] = [
    'English',
    'French',
    'German',
  ];


  onSubmit(form: FormData) {
    if (this.form.valid) {
      this.authenticationService.updateUserDetails(this.userProfile)
        .subscribe(
          response => {
            this.successMessage = "User Profile Update Successfullly";
          }
        );
    }
  }


  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    console.log(this.userProfile);
    this.authenticationService.getUserDetails().subscribe(
      (userProfile) => {
        console.log(userProfile);
        this.userProfile = userProfile.data.value;
      }
    )
    this.username = this.authenticationService.getUsername();
  }

}
