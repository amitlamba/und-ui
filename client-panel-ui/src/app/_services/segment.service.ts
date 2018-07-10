import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  City,
  Country,
  DidEvents, GlobalFilter,
  RegisteredEvent,
  RegisteredEventProperties,
  Segment,
  State
} from "../_models/segment";
import {AppSettings} from "../_settings/app-settings";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {EventUser} from "../_models/user";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Campaign} from "../_models/campaign";

@Injectable()
export class SegmentService {
  segments: Segment[] = [];
  editSegment: Segment;
  countries: Country[];
  eventUser: EventUser = new EventUser();
  cachedRegisteredEvents: RegisteredEvent[] = null;
  eventUserList: EventUser[] = [];

  constructor(private httpClient: HttpClient) {
    // this.editSegment = this.initSegment(new Segment());
  }

  defaultEventProperties: RegisteredEventProperties[] = [
    {
      name: "First Time",
      dataType: "select",
      regex: "",
      options: ["Yes"]
    },
    {
      name: "Time of day",
      dataType: "timerange",
      regex: "",
      options: [
        {hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']},
        {minutes: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']}
      ]
    },
    {
      name: "Day of week",
      dataType: "multiselect",
      regex: "",
      options: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    {
      name: "Day of month",
      dataType: "multiselect",
      regex: "",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31] //Array.from(new Array(31),(val,index)=>index+1) //initializes from 1 to 31 [1..31]
    }
  ];

  public initSegment(segment: Segment): Segment {
    segment.didEvents = this.initDidEvents(new DidEvents());
    segment.didNotEvents = this.initDidEvents(new DidEvents());
    segment.globalFilters = new Array<GlobalFilter>();
    segment.geographyFilters = [];
    segment.type = "Behaviour";
    return segment;
  }

  private initDidEvents(didEvents: DidEvents): DidEvents {
    didEvents.events = [];
    return didEvents;
  }

  getEvents(): Observable<RegisteredEvent[]> {
    return this.httpClient.get<RegisteredEvent[]>(AppSettings.API_ENDPOINT_CLIENT_SEGMENT_METADATA)
      .pipe(
        tap(next => {
        })
      );
  }

  geographyFilters = {
    "country": {
      "id": 10,
      "name": "India"
    },
    "state": {
      "id": 20,
      "name": "Haryana"
    },
    "city": {
      "id": 25,
      "name": "Gurugram"
    }
  };

  saveSegment(segment: Segment): Observable<Segment> {
    return this.httpClient.post<Segment>(AppSettings.API_ENDPOINT_CLIENT_SEGMENT_SAVE, segment);
  }


  sampleEvents: RegisteredEvent[] = [
    {
      name: "Added to cart",
      properties: [
        {
          name: "Amount",
          dataType: "number",
          regex: "",
          options: []
        }, // Category, Product, Quantity
        {
          name: "Category",
          dataType: "string",
          regex: "",
          options: []
        },
        {
          name: "Product",
          dataType: "string",
          regex: "",
          options: []
        },
        {
          name: "Quantity",
          dataType: "number",
          regex: "",
          options: []
        }
      ]
    },
    {
      name: "App Uninstalled",
      properties: []
    },
    {
      name: "Charged",
      properties: [
        {
          name: "Amount",
          dataType: "number",
          regex: "",
          options: []
        }, // Category, Product, Quantity
        {
          name: "Category",
          dataType: "string",
          regex: "",
          options: ["Shoes", "Watched", "Bags", "Electronics", "Phone"]
        },
        {
          name: "Delivery Date",
          dataType: "date",
          regex: "",
          options: []
        },
        {
          name: "Payment Mode",
          dataType: "string",
          regex: "",
          options: []
        },
        {
          name: "Product",
          dataType: "string",
          regex: "",
          options: []
        }
      ]
    }
  ];

  getSegments(): Observable<Segment[]> {
    return this.httpClient.get<Segment[]>(AppSettings.API_ENDPOINT_CLIENT_SEGMENT_LIST).pipe(
      tap(next => {
      })
    );
  }

  getSegmentById(id: number): Observable<Segment> {
    return this.httpClient.get<Segment>(AppSettings.API_ENDPOINT_CLIENT_GET_SEGMENT_BY_ID + "/" + id);
  }

  private createRegisteredEvent(name: string, properties: RegisteredEventProperties[]): RegisteredEvent {
    var registeredEvent = new RegisteredEvent();
    registeredEvent.name = name;
    registeredEvent.properties = properties;
    return registeredEvent;
  }

  private createRegisteredEventProperty(name: string): RegisteredEventProperties {
    var reProp = new RegisteredEventProperties();
    reProp.name = name;
    return reProp
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(AppSettings.API_ENDPOINT_CLIENT_LOCATION_COUNTRIES)
      .pipe(
        tap(next => {
        })
      );
  }

  getStates(countryId: number): Observable<State[]> {
    return this.httpClient.get<State[]>(AppSettings.API_ENDPOINT_CLIENT_LOCATION_STATES + "/" + countryId)
      .pipe(
        tap(next => {
        })
      );
  }

  getCities(stateId: number): Observable<City[]> {
    return this.httpClient.get<City[]>(AppSettings.API_ENDPOINT_CLIENT_LOCATION_CITIES + "/" + stateId)
      .pipe(
        tap(next => {
        })
      );
  }

  findUserByGoogleID(googleID: string): Observable<any> {
    return this.httpClient.get<any>(AppSettings.API_ENDPOINT_CLIENT_USER_GOOGLE_ID + "/" + googleID);
  }

  findUserByFacebookID(facebookID: string): Observable<any> {
    return this.httpClient.get<any>(AppSettings.API_ENDPOINT_CLIENT_USER_FACEBOOK_ID + "/" + facebookID);
  }

  findUserByUndID(UndId: string): Observable<any> {
    return this.httpClient.get<any>(AppSettings.API_ENDPOINT_CLIENT_USER_ID + "/" + UndId);
  }

  findUserByEmailID(emailID: string): Observable<any> {
    return this.httpClient.get<any>(AppSettings.API_ENDPOINT_CLIENT_USER_EMAIL_ID + "/" + emailID);
  }

  findUserByMobileNo(mobileNo: string): Observable<any> {
    return this.httpClient.get<any>(AppSettings.API_ENDPOINT_CLIENT_USER_MOBILE_NUMBER + "/" + mobileNo);
  }

  findUserByClientUserID(userID: string): Observable<any> {
    return this.httpClient.get<any>(AppSettings.API_ENDPOINT_CLIENT_USER_SYS_ID + "/" + userID);
  }

  getEventsListByUserId(userId: string): Observable<any> {
    return this.httpClient.get<any>(AppSettings.API_ENDPOINT_CLIENT_EVENTS_LIST + "/" + userId);
  }

  getEventUsersBySegment(segment: Segment): Observable<EventUser[]> {
    return this.httpClient.post<EventUser[]>(AppSettings.API_ENDPOINT_CLIENT_USER_USER_LIST_SEGMENT, segment);
  }

  globalFiltersMetadata = {
    "UserProperties": [
      {
        "propertyName": "User Property Name",
        "propertyType": "string",
        "options": [],
      },
      {
        "propertyName": "User Property Name",
        "propertyType": "string",
        "options": [],
      }
    ],
    "Demographics": [
      {
        propertyName: "age",
        propertyType: "string",
        options: ["0-18", "18-25", "25-35", "35-60", "60-75", "75 & above"]
      },
      {
        propertyName: "gender",
        propertyType: "string",
        options: ["Male", "Female", "Other", "Not Known"]
      }
    ],
    "Technographics": [
      {
        propertyName: "Browser",
        propertyType: "string",
        options: ["Chrome", "Firefox", "Internet Explorer", "Mobile Application", "Opera", "Others", "Safari", "Sea Monkey", "UC Browser"]
      },
      {
        propertyName: "Device",
        propertyType: "string",
        options: ["Desktop", "Mobile", "Tablet", "TV"]
      },
      {
        propertyName: "OS",
        propertyType: "string",
        options: ["Android", "Blackberry", "Ios", "Linux", "Mac", "Others", "Windows"]
      }
    ],
    "Reachability": [
      {
        propertyName: "hasDeviceToken",
        propertyType: "string",
        options: ["Yes"]
      },
      {
        propertyName: "hasEmailAddress",
        propertyType: "string",
        options: ["Yes"]
      },
      {
        propertyName: "hasPhoneNumber",
        propertyType: "string",
        options: ["Yes"]
      },
      {
        propertyName: "unsubscribedPush",
        propertyType: "string",
        options: ["Yes"]
      },
      {
        propertyName: "unsubscribedEmail",
        propertyType: "string",
        options: ["Yes"]
      },
      {
        propertyName: "unsubscribedSMS",
        propertyType: "string",
        options: ["Yes"]
      }
    ],
    "AppFields": [
      {
        propertyName: "App Version",
        propertyType: "number",
        options: [0, 1, 2, 3, 4]
      },
      {
        propertyName: "Make",
        propertyType: "string",
        options: ["Apple", "Samsung", "Motorola", "Sony", "HTC", "Xiaomi"]
      },
      {
        propertyName: "Models",
        propertyType: "string",
        options: ["Iphone 6", "Iphone 8", "Iphone 7", "Moto g3"]
      },
      {
        propertyName: "OS Version",
        propertyType: "string",
        options: ["4.0.1", "4.4.1", "9.2", "9.1", "6.0.1"]
      },
      {
        propertyName: "SDK Version",
        propertyType: "string",
        options: ["9001", "9002", "9003", "9004"]
      }
    ]
  };

  private createNewSegment(): Segment {
    var textArray = [
      'Behaviour',
      'Live'
    ];
    var randomNumber = Math.floor(Math.random() * textArray.length);

    var segment = new Segment();
    segment.id = Math.floor(Math.random() * 200000) + 1;
    segment.name = "Segment # " + segment.id;
    segment.type = textArray[randomNumber];
    segment.creationDate = "2017-01-01";
    return segment;
  }

  timePeriod = {
    mins: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315, 320, 325, 330, 335, 340, 345, 350, 355, 360, 365, 370, 375, 380, 385, 390, 395, 400, 405, 410, 415, 420, 425, 430, 435, 440, 445, 450, 455, 460, 465, 470, 475, 480, 485, 490, 495, 500, 505, 510, 515, 520, 525, 530, 535, 540, 545, 550, 555, 560, 565, 570, 575, 580, 585, 590, 595, 600],
    hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
    days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365],
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    years: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  };

  dateComparatorMetadata = {
    Absolute: {
      Before: {
        displayName: "Before",
        type: "Absolute",
        dateFieldsRequired: 1
      },
      After: {
        displayName: "After",
        type: "Absolute",
        dateFieldsRequired: 1
      },
      On: {
        displayName: "On",
        type: "Absolute",
        dateFieldsRequired: 1
      },
      Between: {
        displayName: "Between",
        type: "Absolute",
        dateFieldsRequired: 2
      }
    },
    Relative: {
      InThePast: {
        displayName: "In the past",
        type: "Relative",
        selectFieldsRequired: 2,
      }
      ,
      WasExactly: {
        displayName: "Was exactly",
        type: "Relative",
        selectFieldsRequired: 1,
      },
      Today: {
        displayName: "Today",
        type: "Relative",
        selectFieldsRequired: 0,
      },
      InTheFuture: {
        displayName: "In the future",
        type: "Relative",
        selectFieldsRequired: 2,
      },
      WillBeExactly: {
        displayName: "Will be exactly",
        type: "Relative",
        selectFieldsRequired: 1,
      }
    }
  };

  numberComparatorMetadata = {
    Equals: {
      displayName: "= (equals)",
      dataFieldsRequired: 1
    }
    ,
    Between: {
      displayName: "≏ (between)",
      dataFieldsRequired: 2
    }
    ,
    GreaterThan: {
      displayName: "> (greater than)",
      dataFieldsRequired: 1
    }
    ,
    LessThan: {
      displayName: "< (less than)",
      dataFieldsRequired: 1
    }
    ,
    NotEquals: {
      displayName: "≠ (not equals)",
      dataFieldsRequired: 1
    }
    ,
    Exists: {
      displayName: "∃ (exists)",
      dataFieldsRequired: 0
    }
    ,
    DoesNotExist: {
      displayName: "∄ (does not exist)",
      dataFieldsRequired: 0
    }
  };

  stringComparatorMetadata = {
    Contains: {
      displayName: "∋ (contains)",
      dataFieldsRequired: 1,
      dataFieldType: "array"
    }
    ,
    DoesNotContain: {
      displayName: "∌ (does not contain)",
      dataFieldsRequired: 1,
      dataFieldType: "array"
    }
    ,
    Equals: {
      displayName: "= (equals)",
      dataFieldsRequired: 1
    }
    ,
    NotEquals: {
      displayName: "≠ (not equals)",
      dataFieldsRequired: 1
    }
    ,
    Exists: {
      displayName: "∃ (exists)",
      dataFieldsRequired: 0
    }
    ,
    DoesNotExist: {
      displayName: "∄ (does not exist)",
      dataFieldsRequired: 0
    }
  };

}
