import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

// import {EventUser} from "../_models/user";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../_settings/app-settings";
import {MessageService} from "./message.service";

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient,
              private messageService: MessageService) {
  }

  markTestUser(id: string): Observable<any> {
    return this.httpClient.get(AppSettings.API_ENDPOINT_CLIENT_USER + "/testuser/" + id)
  }

  unmarkTestUser(id: string): Observable<any> {
    return this.httpClient.post(AppSettings.API_ENDPOINT_CLIENT_USER + "/testuser/" + id, {})
  }
}
