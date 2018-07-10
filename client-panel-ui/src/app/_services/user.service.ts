import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

// import {EventUser} from "../_models/user";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../_settings/app-settings";

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService) {
  }

  // getUsers(): Observable<EventUser[]> {
  //
  //   // get users from api
  //   return this.httpClient.get<EventUser[]>(AppSettings.API_ENDPOINT_CLIENT_CLIENT_USERS_GETLIST);
  // }

}
