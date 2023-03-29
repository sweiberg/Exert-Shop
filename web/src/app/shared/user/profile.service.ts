import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}

  accessProfile(userid: any): Observable<any> {

    return this.http.get(
      'http://localhost:4300/api/profile/' + userid,
      {
      }
    );
  }
}
