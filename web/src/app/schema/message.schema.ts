export class Message{
    parentID: number;
    senderID: number;
    recipientID: number;
    subject: string;
    body: string;
    constructor(parentID: number, senderID: number, recipientID: number, subject: string, body: string){
      this.parentID = parentID;
      this.senderID = senderID;
      this.recipientID = recipientID;
      this.subject = subject;
      this.body = body;
    }
  }
  