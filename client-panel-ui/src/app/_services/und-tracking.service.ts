import { Injectable } from '@angular/core';

declare var _und: any;

@Injectable()
export class UndTrackingService {

  constructor() { }

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

}
