import { Component, OnInit } from '@angular/core';
import { MessageService } from '../shared/message/message.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Message } from '../schema/message.schema'
import { MessageSendComponent } from './send/send.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class MessageInboxComponent {
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
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i].CreatedAt)
          const parentID = response.data[i].ParentID;
          const messageID = response.data[i].ID;
          const senderID = response.data[i].senderID;
          const recipientID = response.data[i].receiverID;
          const date = response.data[i].CreatedAt;
          const userName = response.data[i].Sender.username;
          const subject = response.data[i].subject;
          const body = response.data[i].message;
          const inboxItem = new Message(parentID, messageID, senderID, recipientID, date, userName, subject, body)
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
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          const parentID = response.data[i].ParentID;
          const messageID = response.data[i].ID;
          const senderID = response.data[i].senderID;
          const recipientID = response.data[i].receiverID;
          const date = response.data[i].CreatedAt;
          const userName = response.data[i].Receiver.username;
          const subject = response.data[i].subject;
          const body = response.data[i].message;
          const sentItem = new Message(parentID, messageID, senderID, recipientID, date, userName, subject, body)
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
