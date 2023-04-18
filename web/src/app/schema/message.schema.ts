export class Message{
    parentID: number;
    messageID: number;
    senderID: number;
    recipientID: number;
    senderName: string;
    subject: string;
    body: string;
    constructor(parentID: number, messageID: number, senderID: number, recipientID: number, senderName: string, subject: string, body: string){
      this.parentID = parentID;
      this.messageID = messageID;
      this.senderID = senderID;
      this.recipientID = recipientID;
      this.senderName = senderName;
      this.subject = subject;
      this.body = body;
    }
  }
  