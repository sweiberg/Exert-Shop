import { Component, OnInit } from '@angular/core';
import { MessageService } from '../shared/message/message.service';
import { Message } from '../schema/message.schema'

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class MessageInboxComponent {
  inboxList: Array<Message>;

  ngOnInit() {
    this.inboxList = new Array();

    this.messageService.accessInbox()
    .subscribe({
      next: (response) => {
        for (let i = 0; i < response.data.length; i++) {
          const parentID = response.data[i].ParentID;
          const senderID = response.data[i].senderID;
          const recipientID = response.data[i].receiverID;
          const subject = response.data[i].subject;
          const body = response.data[i].message;
          const inboxItem = new Message(parentID, senderID, recipientID, subject, body)
          this.inboxList.push(inboxItem);
        }
      }, 
      error: (error) => {
        console.log(error);
      }
    });
  }

  

  constructor(private messageService: MessageService) {
  }


}
