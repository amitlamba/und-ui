import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {AppSettings} from "../_settings/app-settings";

@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) {
  }

  submitContactForm(contactUs, recaptchaToken): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const params = new HttpParams().set("recaptchaToken", recaptchaToken);
    return this.http.post(AppSettings.API_ENDPOINT_CLIENT_CONTACT_US_SAVE, contactUs, {headers: headers, params: params});
  }
}
