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
    let message = new Message(text, status);
    this.messages.push(message);
    console.log("Message: " + message.id + " " + message.text);
    var that = this;
    setTimeout(function () {
      that.clear(message.id);
    }, 4000);
  }

  clearAll() {
    this.messages = [];
  }

  clear(id: string) {
    this.messages = this.messages.filter((v,i,a) => id !== v.id);
  }
}

function clearMessagesById(id) {

}

function makeid(): string {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export class Message {
  id: string = makeid();
  time: number = Date.now();
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
