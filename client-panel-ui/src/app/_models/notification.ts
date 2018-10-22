import {MessageType} from "./email";

export class NotificationTemplate {
  id: number;
  clientID: number;
  appuserID: number;
  name: string;
  notificationTemplateTitle: string;
  notificationTemplateBody: string;
  parentID: number;
  messageType: MessageType;
  tags: string;
}
