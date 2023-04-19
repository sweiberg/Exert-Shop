import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {}

  accessInbox(): Observable<any> {
    return this.http.get(
      'http://localhost:4300/api/message/inbox',
      {
      }
    );
  }

  accessSent(): Observable<any> {
    return this.http.get(
      'http://localhost:4300/api/message/sent',
      {
      }
    );
  }


  sendMessage(subject:string, message:string, parentID:number, receiverID:number): Observable<any> {
    return this.http.post(
      'http://localhost:4300/api/sendmessage', 
      {
        subject,
        message,
        parentID,
        receiverID
      },
    );
  }
}
