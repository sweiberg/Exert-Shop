export class Message {
    parentID: number;
    messageID: number;
    senderID: number;
    recipientID: number;
    date: string;
    userName: string;
    subject: string;
    body: string;
    constructor(parentID: number, messageID: number, senderID: number, recipientID: number, date: string, userName: string, subject: string, body: string){
      this.parentID = parentID;
      this.messageID = messageID;
      this.senderID = senderID;
      this.recipientID = recipientID;
      this.date = date;
      this.userName = userName;
      this.subject = subject;
      this.body = body;
    }
  }
  