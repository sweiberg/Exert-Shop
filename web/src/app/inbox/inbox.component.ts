import { Component, OnInit } from '@angular/core';
import { MessageService } from '../shared/message/message.service';
import {MatDialog} from '@angular/material/dialog';
import { Message } from '../schema/message.schema'
import { MessageSendComponent } from './send/send.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})

export class MessageInboxComponent implements OnInit {
  sentList: Array<Message>;
  inboxList: Array<Message>;
  isInbox: boolean = true;

  constructor(private messageService: MessageService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.inboxList = new Array();
    this.sentList = new Array();

    this.messageService.accessInbox()
    .subscribe({
      next: (response) => {
        for (let i = 0; i < response.data.Inbox.length; i++) {
          const parentID = response.data.Inbox[i].ParentID;
          const messageID = response.data.Inbox[i].ID;
          const senderID = response.data.Inbox[i].senderID;
          const recipientID = response.data.Inbox[i].receiverID;
          const date = response.data.Inbox[i].CreatedAt;
          const userName = response.data.Inbox[i].Sender.username;
          const subject = response.data.Inbox[i].subject;
          const body = response.data.Inbox[i].message;
          const inboxItem = new Message(parentID, messageID, senderID, recipientID, date, userName, subject, body);
          this.inboxList.push(inboxItem);
        }
      }, 
      error: (error) => {
        console.log(error);
      }
    });

    this.messageService.accessSent()
    .subscribe({
      next: (response) => {
        for (let i = 0; i < response.data.Sent.length; i++) {
          const parentID = response.data.Sent[i].ParentID;
          const messageID = response.data.Sent[i].ID;
          const senderID = response.data.Sent[i].senderID;
          const recipientID = response.data.Sent[i].receiverID;
          const date = response.data.Sent[i].CreatedAt;
          const userName = response.data.Sent[i].Receiver.username;
          const subject = response.data.Sent[i].subject;
          const body = response.data.Sent[i].message;
          const sentItem = new Message(parentID, messageID, senderID, recipientID, date, userName, subject, body);
          this.sentList.push(sentItem);
        }
      }, 
      error: (error) => {
        console.log(error);
      }
    });
  }

  openInbox() {
    this.isInbox = true;
  }

  openSent() {
    this.isInbox = false;
  }

  openReply(senderID: any, event: Event) {
    event.stopPropagation();
    let dialogRef = this.dialog.open(MessageSendComponent);
    let instance = dialogRef.componentInstance;
    instance.userID = senderID;
  }
}
