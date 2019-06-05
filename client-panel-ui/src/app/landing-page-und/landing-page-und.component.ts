import {Component, OnInit} from '@angular/core';
import {RegistrationRequest} from "../_models/client";
import {UndTrackingService} from "../_services/und-tracking.service";
import {Identity} from "../_models/user";
import {identity} from "rxjs/util/identity";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-landing-page-und',
  templateUrl: './landing-page-und.component.html',
  styleUrls: ['./landing-page-und.component.scss']
})
export class LandingPageUndComponent implements OnInit {
  demoRequest: RegistrationRequest = new RegistrationRequest();

  constructor(private undTracking: UndTrackingService, private http: HttpClient) {

  }


  ngOnInit() {


  }


}

