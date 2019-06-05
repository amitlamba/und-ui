import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EventCount} from "../_models/reports";
import {AppSettings} from "../_settings/app-settings";
import {Profile} from "selenium-webdriver/firefox";
import {Identity} from "../_models/user";
import {stringify} from "@angular/core/src/render3/util";
import {Event} from "../_models/user";

declare var _und: any;

@Injectable()
export class UndTrackingService {

  constructor(private httpClient: HttpClient) {

  }

  /**
   *
   * @param {string} name
   * @param attributes
   *
   */
  //TODO: Also list down all the fixed attributes.
  public trackEvent(name: string, attributes: any) {
    _und('event',
      {
        "name": name,
        "attributes": attributes
      });
  }

  public trackMenuEvent(attributes:any) {
    _und('event',
      {
        name: "Menu Clicked",
        "attributes": attributes
      });
  }

  public trackChargedEvent(attributes: any, lineItem: any[]) {
    _und('event',
      {
        name: 'charged',
        attributes: attributes,
        lineItem: lineItem
      });
  }

  public logout() {
    _und('logout');
  }

  public profile(profileAttributes: any) {
    _und('profile', profileAttributes);
  }


  // public pushEvent(event: Event): Observable<any> {
  //   let headers = new HttpHeaders(
  //     {
  //
  //       'content-type': 'application/json',
  //       'Authorization': localStorage.getItem('event_token'),
  //       'type': 'WEB'
  //     }
  //   );
  //   return this.httpClient.post(AppSettings.API_ENDPOINT_EVENT_PUSH_EVENT, event, {
  //     headers: headers
  //   });
  //
  // }
  //
  // public pushIdentity(identity: Identity): Observable<Identity[]> {
  //   console.log(localStorage.getItem('event_token'));
  //   let headers = new HttpHeaders(
  //     {
  //
  //       'content-type': 'application/json',
  //       'Authorization': localStorage.getItem('event_token'),
  //       'type': 'WEB'
  //     }
  //   );
  //   return this.httpClient.post<Identity[]>(AppSettings.API_ENDPOINT_EVENT_EVENT_INITIALIZE, identity, {headers: headers});
  // }
}
