export class Client {
}

export class ServiceProviderCredentials {
  id: string;
  clientID: number;
  appuserID: number;
  name: string;
  serviceProviderType: string;
  serviceProvider: string;
  status: string;
  credentialsMap: any = {}; // store the map, key value pairs
  isDefault: boolean = false;
}

export enum ServiceProviderType {
  "Email Service Provider" = "Email Service Provider",
  "SMS Service Provider" = "SMS Service Provider",
  "Notification Service Provider" = "Notification Service Provider",
  "Android Push Service Provider" = "Android Push Service Provider",
  "Web Push Service Provider" = "Web Push Service Provider",
  "iOS Push Service Provider" = "iOS Push Service Provider"
}

export class RegistrationRequest {
  email: string;
  password: string;
  name: string;
  country: string;
  address: string;
  phone: string;
  firstName: string;
  lastName: string;
}

export class UserProfileRequest {
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  eventUserToken: string;
}

export class AccountSettings {
  id: number;
  urls: string[];
  timezone: string;
  andAppId:string[];
  iosAppId:string[];
}

export class UnSubscribeLink {
  unSubscribeLink: string;
}
export class SendersInfo {
  personal: string;
  address: string;
  serviceProviderId:number;
}

class UnsubscribeLink {
  unsubscribeLink: string;
}
