
import {MessageType} from "./email";

export class Sms {

}

export class SmsTemplate {
  id: number;
  clientID: number;
  appuserID: number;
  name: string;
  smsTemplateBody: string;
  parentID: number;
  from: string;
  messageType: MessageType;
  tags: string;
}
