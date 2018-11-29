export class User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}


export class SocialId {
  fbId: string;
  googleId: string;
  mobile: string;
  email: string;
}

export class StandardInfo {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  country: string;
  countryCode: string;
}

export class UserParams {
  public static params = [
    "{user.identity.email}",
    "{user.identity.mobile}",
    "{user.standardInfo.firstname}",
    "{user.standardInfo.lastname}",
    "{user.standardInfo.gender}",
    "{user.standardInfo.dob}",
    "{user.standardInfo.country}",
    "{user.standardInfo.countryCode}"
  ];
}

export class EventUser {
  additionalInfo: any;         //Please review this property again with the backend
  address: string;
  city: string;
  clientId: number;
  clientUserId: string;
  communication: Communication;
  country: string;
  countryCode: string;
  creationDate: string;
  dob: string;
  email: string;
  fbId: string;
  firstName: string;
  gender: string;
  googleId: string;
  lastName: string;
  testUser: boolean;
  mobile: string;
  undId: string;
}

export class Communication {
  email: string;
  mobile: string;
}

export class Event {
  name: string;
  identity: Identity;
  creationTime: string;
  ipAddress: string;
  city: string;
  state: string;
  country: string;
  latitude: string;
  longitude: string;
  agentString: string;
  userIdentified: boolean;
  attributes:any;
  // lineitem,attributes,startDate,EndDate to be added.
}

export class EventSelected {
  event: Event;
  selected: boolean;
}
export class EventNamesSelected {
  eventName: string;
  selected: boolean;
}

export class Identity {
  deviceId: string;
  sessionId: string;
  userId: string;
  clientId: string;
}


