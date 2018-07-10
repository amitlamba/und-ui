import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  messages: Message[] = [];

  constructor() { }

  add(message: Message) {
    this.messages.push(message);
  }

  addSuccessMessage(text: string) {
    this.addMessage(text, MessageStatus.success);
  }

  addDangerMessage(text: string) {
    this.addMessage(text, MessageStatus.danger);
  }

  addWarningMessage(text: string) {
    this.addMessage(text, MessageStatus.warning);
  }

  addInfoMessage(text: string) {
    this.addMessage(text, MessageStatus.info);
  }

  private addMessage(text: string, status: MessageStatus) {
    this.messages.push(new Message(text, status));
  }

  clear() {
    this.messages = [];
  }
}

export class Message {
  text: string;
  messageStatus: MessageStatus;
  constructor(text: string, status: MessageStatus) {
    this.messageStatus=status;
    this.text=text
  }
}

export enum MessageStatus {
  success="success",
  danger="danger",
  warning="warning",
  info="info"
}
