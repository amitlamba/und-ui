export class AppSettings {
  public static API_ENDPOINT = "https://userndot.com";


  public static API_ENDPOINT_CLIENT = AppSettings.API_ENDPOINT + "/client";
  // public static API_ENDPOINT_CLIENT = "http://nestros.com:9201";
  // public static API_ENDPOINT_CLIENT = "http://localhost:9201";

  public static API_ENDPOINT_CLIENT_CLIENT = AppSettings.API_ENDPOINT_CLIENT + "/client";

  public static API_ENDPOINT_CLIENT_DASHBOARD = AppSettings.API_ENDPOINT_CLIENT + "/dashboard";
  public static API_ENDPOINT_CLIENT_DASHBOARD_LIVEUSERS = AppSettings.API_ENDPOINT_CLIENT_DASHBOARD + "/liveusers";
  public static API_ENDPOINT_CLIENT_DASHBOARD_LIVEUSERTREND = AppSettings.API_ENDPOINT_CLIENT_DASHBOARD + "/liveusertrend";
  public static API_ENDPOINT_CLIENT_DASHBOARD_LIVEUSERTYPETREND = AppSettings.API_ENDPOINT_CLIENT_DASHBOARD + "/liveusertypetrend";
  public static API_ENDPOINT_CLIENT_DASHBOARD_USERCOUNTBYEVENTS = AppSettings.API_ENDPOINT_CLIENT_DASHBOARD + "/usercountbyevents";
  public static API_ENDPOINT_CLIENT_DASHBOARD_SAMPLEUSERSBYEVENT = AppSettings.API_ENDPOINT_CLIENT_DASHBOARD + "/samepleusersbyevent";

  public static API_ENDPOINT_CLIENT_REPORT_EVENT = AppSettings.API_ENDPOINT_CLIENT + "/report/event";
  public static API_ENDPOINT_CLIENT_REPORT_EVENT_EVENTCOUNT = AppSettings.API_ENDPOINT_CLIENT_REPORT_EVENT + "/eventcount";
  public static API_ENDPOINT_CLIENT_REPORT_EVENT_TRENDBYTIMEPERIOD = AppSettings.API_ENDPOINT_CLIENT_REPORT_EVENT + "/trendBytimePeriod";
  public static API_ENDPOINT_CLIENT_REPORT_EVENT_EVENTUSERTREND = AppSettings.API_ENDPOINT_CLIENT_REPORT_EVENT + "/eventUserTrend";
  public static API_ENDPOINT_CLIENT_REPORT_EVENT_EVENTTIMETREND = AppSettings.API_ENDPOINT_CLIENT_REPORT_EVENT + "/eventTimeTrend";
  public static API_ENDPOINT_CLIENT_REPORT_EVENT_EVENTAGGREGATETREND = AppSettings.API_ENDPOINT_CLIENT_REPORT_EVENT + "/eventAggregateTrend";

  public static API_ENDPOINT_CLIENT_FUNNEL = AppSettings.API_ENDPOINT_CLIENT + "/report/funnel/funnel";

  public static API_ENDPOINT_CLIENT_REPORT_SEGMENT = AppSettings.API_ENDPOINT_CLIENT + "/report/segment"
  public static API_ENDPOINT_CLIENT_REPORT_SEGMENT_REACHABILITY = AppSettings.API_ENDPOINT_CLIENT_REPORT_SEGMENT + "/reachability";
  public static API_ENDPOINT_CLIENT_REPORT_SEGMENT_CAMPAIGNS = AppSettings.API_ENDPOINT_CLIENT_REPORT_SEGMENT + "/campaigns";

  public static API_ENDPOINT_CLIENT_REPORT_CAMPAIGN = AppSettings.API_ENDPOINT_CLIENT + "/report/campaign";
  public static API_ENDPOINT_CLIENT_REPORT_CAMPAIGN_REACH = AppSettings.API_ENDPOINT_CLIENT_REPORT_CAMPAIGN + "/reach";

  public static API_ENDPOINT_CLIENT_CLIENT_DASHBOARD = AppSettings.API_ENDPOINT_CLIENT_CLIENT + "/dashboard";
  public static API_ENDPOINT_CLIENT_CLIENT_DASHBOARD_TRENDCOUNT = AppSettings.API_ENDPOINT_CLIENT_CLIENT_DASHBOARD + "/trendcount";
  public static API_ENDPOINT_CLIENT_CLIENT_DASHBOARD_TRENDCHART = AppSettings.API_ENDPOINT_CLIENT_CLIENT_DASHBOARD + "/trendchart";
  public static API_ENDPOINT_CLIENT_CLIENT_DASHBOARD_NEWVSEXISTING = AppSettings.API_ENDPOINT_CLIENT_CLIENT_DASHBOARD + "/newvsexisting";
  public static API_ENDPOINT_CLIENT_CLIENT_DASHBOARD_USERCOUNTBYEVENTS = AppSettings.API_ENDPOINT_CLIENT_CLIENT_DASHBOARD + "/usercountbyevents";
  public static API_ENDPOINT_CLIENT_CLIENT_DASHBOARD_SAMPLEUSERBYEVENT = AppSettings.API_ENDPOINT_CLIENT_CLIENT_DASHBOARD + "/sampleuserbyevent";

  public static API_ENDPOINT_CLIENT_CLIENT_REPORT_EVENT = AppSettings.API_ENDPOINT_CLIENT_CLIENT + "/report/event";

  public static API_ENDPOINT_CLIENT_CLIENT_REPORT_EVENT_EVENTCOUNT = AppSettings.API_ENDPOINT_CLIENT_CLIENT_REPORT_EVENT + "/eventcount";
  public static API_ENDPOINT_CLIENT_CLIENT_REPORT_EVENT_TRENDBYTIMEPERIOD = AppSettings.API_ENDPOINT_CLIENT_CLIENT_REPORT_EVENT + "/trendBytimePeriod";
  public static API_ENDPOINT_CLIENT_CLIENT_REPORT_EVENT_EVENTUSERTREND = AppSettings.API_ENDPOINT_CLIENT_CLIENT_REPORT_EVENT + "/eventuserTrend";
  public static API_ENDPOINT_CLIENT_CLIENT_REPORT_EVENT_EVENTTIMETREND = AppSettings.API_ENDPOINT_CLIENT_CLIENT_REPORT_EVENT + "/eventTimeTrend";
  public static API_ENDPOINT_CLIENT_CLIENT_REPORT_EVENT_EVENTAGGREGATETREND = AppSettings.API_ENDPOINT_CLIENT_CLIENT_REPORT_EVENT + "/eventAggregateTrend";

  public static API_ENDPOINT_CLIENT_CLIENT_EMAIL = AppSettings.API_ENDPOINT_CLIENT_CLIENT + "/email";
  public static API_ENDPOINT_CLIENT_CLIENT_EMAIL_DEFAULT_TEMPLATES = AppSettings.API_ENDPOINT_CLIENT_CLIENT_EMAIL + "/default-templates";
  public static API_ENDPOINT_CLIENT_CLIENT_EMAIL_TEMPLATES = AppSettings.API_ENDPOINT_CLIENT_CLIENT_EMAIL + "/templates";
  public static API_ENDPOINT_CLIENT_CLIENT_EMAIL_SAVE_TEMPLATES = AppSettings.API_ENDPOINT_CLIENT_CLIENT_EMAIL + "/save-template";
  public static API_ENDPOINT_CLIENT_CLIENT_EMAIL_USER_EVENT_ATTRIBUTES = AppSettings.API_ENDPOINT_CLIENT_CLIENT_EMAIL + "/user-event-attributes";
  public static API_ENDPOINT_CLIENT_CLIENT_GET_EMAIL_TEMPLATE_BY_ID = AppSettings.API_ENDPOINT_CLIENT_CLIENT_EMAIL + "/template";

  public static API_ENDPOINT_CLIENT_CLIENT_SMS = AppSettings.API_ENDPOINT_CLIENT_CLIENT + "/sms";
  public static API_ENDPOINT_CLIENT_CLIENT_SMS_DEFAULT_TEMPLATES = AppSettings.API_ENDPOINT_CLIENT_CLIENT_SMS + "/default-templates";
  public static API_ENDPOINT_CLIENT_CLIENT_SMS_TEMPLATES = AppSettings.API_ENDPOINT_CLIENT_CLIENT_SMS + "/templates";
  public static API_ENDPOINT_CLIENT_CLIENT_SMS_SAVE_TEMPLATES = AppSettings.API_ENDPOINT_CLIENT_CLIENT_SMS + "/save-template";
  public static API_ENDPOINT_CLIENT_CLIENT_SMS_USER_EVENT_ATTRIBUTES = AppSettings.API_ENDPOINT_CLIENT_CLIENT_SMS + "/user-event-attributes";

  public static API_ENDPOINT_CLIENT_WEBPUSH = AppSettings.API_ENDPOINT_CLIENT + "/webpush";
  public static API_ENDPOINT_CLIENT_WEBPUSH_TEMPLATES = AppSettings.API_ENDPOINT_CLIENT_WEBPUSH + "/templates";
  public static API_ENDPOINT_CLIENT_WEBPUSH_TEMPLATE = AppSettings.API_ENDPOINT_CLIENT_WEBPUSH + "/template";
  public static API_ENDPOINT_CLIENT_WEBPUSH_SAVE = AppSettings.API_ENDPOINT_CLIENT_WEBPUSH + "/save";

  public static API_ENDPOINT_CLIENT_ANDROID = AppSettings.API_ENDPOINT_CLIENT + "/android";
  public static API_ENDPOINT_CLIENT_ANDROID_TEMPLATES = AppSettings.API_ENDPOINT_CLIENT_ANDROID + "/templates";
  public static API_ENDPOINT_CLIENT_ANDROID_TEMPLATE = AppSettings.API_ENDPOINT_CLIENT_ANDROID + "/template";
  public static API_ENDPOINT_CLIENT_ANDROID_SAVE = AppSettings.API_ENDPOINT_CLIENT_ANDROID + "/save";

  public static API_ENDPOINT_CLIENT_CLIENT_USERS = AppSettings.API_ENDPOINT_CLIENT_CLIENT + "/users";
  public static API_ENDPOINT_CLIENT_CLIENT_USERS_GETLIST = AppSettings.API_ENDPOINT_CLIENT_CLIENT_USERS + "/get-list";
  public static API_ENDPOINT_CLIENT_CLIENT_USERS_GETUSEREVENTS = AppSettings.API_ENDPOINT_CLIENT_CLIENT_USERS + "/get-user-events";

  public static API_ENDPOINT_CLIENT_SETTING = AppSettings.API_ENDPOINT_CLIENT + "/setting";
  public static API_ENDPOINT_CLIENT_SETTING_ALL_SERVICE_PROVIDERS = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/service-providers";
  public static API_ENDPOINT_CLIENT_SETTING_EMAIL_SERVICE_PROVIDERS = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/email-service-providers";
  public static API_ENDPOINT_CLIENT_SETTING_EMAIL_SERVICE_PROVIDER = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/email-service-provider";
  public static API_ENDPOINT_CLIENT_SETTING_EMAIL_SERVICE_PROVIDER_SAVE = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/email-service-provider/save";
  public static API_ENDPOINT_CLIENT_SETTING_SMS_SERVICE_PROVIDERS = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/sms-service-providers";
  public static API_ENDPOINT_CLIENT_SETTING_SMS_SERVICE_PROVIDER = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/sms-service-provider";
  public static API_ENDPOINT_CLIENT_SETTING_SMS_SERVICE_PROVIDER_SAVE = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/sms-service-provider/save";
  public static API_ENDPOINT_CLIENT_SETTING_NOTIFICATION_SERVICE_PROVIDER_SAVE = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/notification-service-provider/save";
  public static API_ENDPOINT_CLIENT_SETTING_ANDROID_PUSH_SERVICE_PROVIDER_SAVE = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/android-push-service-provider/save";
  public static API_ENDPOINT_CLIENT_SETTING_WEB_PUSH_SERVICE_PROVIDER_SAVE = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/web-push-service-provider/save";
  public static API_ENDPOINT_CLIENT_SETTING_IOS_PUSH_SERVICE_PROVIDER_SAVE = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/ios-push-service-provider/save";
  public static API_ENDPOINT_CLIENT_SETTING_SENDERS_EMAIL_ADD = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/senders-email/add";
  public static API_ENDPOINT_CLIENT_SETTING_SENDERS_EMAIL_LIST = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/senders-email/list";
  public static API_ENDPOINT_CLIENT_SETTING_SENDERS_EMAIL_DELETE = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/senders-email/delete";
  public static API_ENDPOINT_CLIENT_SETTING_ACCOUNT_SETTINGS_SAVE = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/account-settings/save";
  public static API_ENDPOINT_CLIENT_SETTING_ACCOUNT_SETTINGS_GET = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/account-settings/get";
  public static API_ENDPOINT_CLIENT_SETTING_ACCOUNT_SETTINGS_UNSUBSCRIBE_LINK_SAVE = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/unsubscribe-link/save";
  public static API_ENDPOINT_CLIENT_SETTING_ACCOUNT_SETTINGS_UNSUBSCRIBE_LINK_GET = AppSettings.API_ENDPOINT_CLIENT_SETTING + "/unsubscribe-link/get";


  public static API_ENDPOINT_CLIENT_SEGMENT = AppSettings.API_ENDPOINT_CLIENT + "/segment";
  public static API_ENDPOINT_CLIENT_SEGMENT_METADATA = AppSettings.API_ENDPOINT_CLIENT_SEGMENT + "/metadata";
  public static API_ENDPOINT_CLIENT_SEGMENT_COMMONPROPERTIES = AppSettings.API_ENDPOINT_CLIENT_SEGMENT + "/commonproperties";
  public static API_ENDPOINT_CLIENT_SEGMENT_LIST = AppSettings.API_ENDPOINT_CLIENT_SEGMENT + "/list";
  public static API_ENDPOINT_CLIENT_SEGMENT_SAVE = AppSettings.API_ENDPOINT_CLIENT_SEGMENT + "/save";
  public static API_ENDPOINT_CLIENT_GET_SEGMENT_BY_ID = AppSettings.API_ENDPOINT_CLIENT_SEGMENT + "/segment";


  public static API_ENDPOINT_CLIENT_USER = AppSettings.API_ENDPOINT_CLIENT + "/user";
  public static API_ENDPOINT_CLIENT_USER_GOOGLE_ID = AppSettings.API_ENDPOINT_CLIENT_USER + '/google';
  public static API_ENDPOINT_CLIENT_USER_ID = AppSettings.API_ENDPOINT_CLIENT_USER + '/id';
  public static API_ENDPOINT_CLIENT_USER_FACEBOOK_ID = AppSettings.API_ENDPOINT_CLIENT_USER + '/fb';
  public static API_ENDPOINT_CLIENT_USER_SYS_ID = AppSettings.API_ENDPOINT_CLIENT_USER + '/sys';
  public static API_ENDPOINT_CLIENT_USER_EMAIL_ID = AppSettings.API_ENDPOINT_CLIENT_USER + '/email';
  public static API_ENDPOINT_CLIENT_USER_MOBILE_NUMBER = AppSettings.API_ENDPOINT_CLIENT_USER + '/mobile';
  public static API_ENDPOINT_CLIENT_USER_USER_LIST_SEGMENT = AppSettings.API_ENDPOINT_CLIENT_USER + '/user-list/segment';
  public static API_ENDPOINT_CLIENT_USER_SETTESTPROFILE = AppSettings.API_ENDPOINT_CLIENT_USER + "/setTestProfile";
  public static API_ENDPOINT_CLIENT_USER_UNSETTESTPROFILE = AppSettings.API_ENDPOINT_CLIENT_USER + "/unsetTestProfile";

  public static API_ENDPOINT_CLIENT_EVENTS_LIST = AppSettings.API_ENDPOINT_CLIENT_USER + "/event-list";
  // public static API_ENDPOINT_CLIENT_EVENT_DETAILS_BY_EVENT_ID = AppSettings.API_ENDPOINT_CLIENT + "/event-details";


  public static API_ENDPOINT_CLIENT_CAMPAIGN = AppSettings.API_ENDPOINT_CLIENT + "/campaign";
  public static API_ENDPOINT_CLIENT_CAMPAIGN_SAVE = AppSettings.API_ENDPOINT_CLIENT_CAMPAIGN + "/save";
  public static API_ENDPOINT_CLIENT_CAMPAIGN_LIST = AppSettings.API_ENDPOINT_CLIENT_CAMPAIGN + "/list/all";
  public static API_ENDPOINT_CLIENT_CAMPAIGN_PAUSE = AppSettings.API_ENDPOINT_CLIENT_CAMPAIGN + "/pause";
  public static API_ENDPOINT_CLIENT_CAMPAIGN_RESUME = AppSettings.API_ENDPOINT_CLIENT_CAMPAIGN + "/resume";
  public static API_ENDPOINT_CLIENT_CAMPAIGN_STOP = AppSettings.API_ENDPOINT_CLIENT_CAMPAIGN + "/stop";
  public static API_ENDPOINT_CLIENT_CAMPAIGN_DELETE = AppSettings.API_ENDPOINT_CLIENT_CAMPAIGN + "/delete";
  public static API_ENDPOINT_CLIENT_CAMPAIGN_ERROR = AppSettings.API_ENDPOINT_CLIENT_CAMPAIGN + "/error";


  public static API_ENDPOINT_CLIENT_LOCATION = AppSettings.API_ENDPOINT_CLIENT + "/location";
  public static API_ENDPOINT_CLIENT_LOCATION_COUNTRIES = AppSettings.API_ENDPOINT_CLIENT_LOCATION + "/countries";
  public static API_ENDPOINT_CLIENT_LOCATION_STATES = AppSettings.API_ENDPOINT_CLIENT_LOCATION + "/states";
  public static API_ENDPOINT_CLIENT_LOCATION_CITIES = AppSettings.API_ENDPOINT_CLIENT_LOCATION + "/cities";


  public static API_ENDPOINT_AUTH = AppSettings.API_ENDPOINT + "/auth";
  // public static API_ENDPOINT_AUTH = "http://nestros.com:9595";
  // public static API_ENDPOINT_AUTH = AppSettings.API_ENDPOINT + "/auth";
  // public static API_ENDPOINT_AUTH = "http://userndot.com:9595"

  public static API_ENDPOINT_AUTH_AUTH = AppSettings.API_ENDPOINT_AUTH + "/auth";
  public static API_ENDPOINT_AUTH_AUTH_VALIDATE = AppSettings.API_ENDPOINT_AUTH_AUTH + "/validate";
  public static API_ENDPOINT_AUTH_AUTH_USERDETAIL = AppSettings.API_ENDPOINT_AUTH_AUTH + "/userdetail";

  public static API_ENDPOINT_AUTH_REGISTER = AppSettings.API_ENDPOINT_AUTH + "/register";
  public static API_ENDPOINT_AUTH_REGISTER_VERIFYEMAIL = AppSettings.API_ENDPOINT_AUTH_REGISTER + "/verifyemail";
  public static API_ENDPOINT_AUTH_REGISTER_SENDVFNEMAIL = AppSettings.API_ENDPOINT_AUTH_REGISTER + "/sendvfnmail";
  public static API_ENDPOINT_AUTH_REGISTER_FORGOTPASSWORD = AppSettings.API_ENDPOINT_AUTH_REGISTER + "/forgotpassword";
  public static API_ENDPOINT_AUTH_REGISTER_RESETPASSWORD = AppSettings.API_ENDPOINT_AUTH_REGISTER + "/resetpassword";

  public static API_ENDPOINT_AUTH_SETTING = AppSettings.API_ENDPOINT_AUTH + "/setting";
  public static API_ENDPOINT_AUTH_SETTING_RESETPASSWORD = AppSettings.API_ENDPOINT_AUTH_SETTING + "/resetpassword";
  public static API_ENDPOINT_AUTH_SETTING_USERDETAILS = AppSettings.API_ENDPOINT_AUTH_SETTING + "/userDetails";
  public static API_ENDPOINT_AUTH_SETTING_UPDATEUSERDETAILS = AppSettings.API_ENDPOINT_AUTH_SETTING + "/updateUserDetails";
  public static API_ENDPOINT_AUTH_SETTING_REFRESHTOKEN = AppSettings.API_ENDPOINT_AUTH_SETTING + "/refreshToken";

  public static API_ENDPOINT_AUTH_CONTACT_US_SAVE = AppSettings.API_ENDPOINT_AUTH + "/contactUs/save";

}

export class UserField {
  fieldDisplayName: string;
  fieldVariableString: string;
  fieldCategory: string;

  constructor(fieldDisplayName: string, fieldVariableString: string, fieldCategory: string) {
    this.fieldDisplayName = fieldDisplayName;
    this.fieldVariableString = fieldVariableString;
    this.fieldCategory = fieldCategory;
  }
}

export class UserFields {
  public static USER_FIRST_NAME = new UserField("First Name", "${user.standardInfo.firstName}", "User Fields");
  public static USER_LAST_NAME = new UserField("Last Name", "${user.standardInfo.lastName}", "User Fields");
  public static USER_EMAIL = new UserField("Email", "${user.socialId.email}", "User Fields");
  public static USER_MOBILE_NUMBER = new UserField("Mobile Number", "${user.socialId.mobile}", "User Fields");
  public static USER_DETAIILS = [
    UserFields.USER_FIRST_NAME,
    UserFields.USER_LAST_NAME,
    UserFields.USER_EMAIL,
    UserFields.USER_MOBILE_NUMBER
  ];
}

export const _RECAPTCHA_KEY = "6Lcv4FsUAAAAAL1CEPzpEjUIxiDL93UWR2in1h1x";
