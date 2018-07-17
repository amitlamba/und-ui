import {Component, OnInit} from '@angular/core';
import {RegistrationRequest} from "../_models/client";

@Component({
  selector: 'app-landing-page-und',
  templateUrl: './landing-page-und.component.html',
  styleUrls: ['./landing-page-und.component.scss']
})
export class LandingPageUndComponent implements OnInit {
  demoRequest: RegistrationRequest = new RegistrationRequest();
  constructor() {
  }

  ngOnInit() {
  }


}
