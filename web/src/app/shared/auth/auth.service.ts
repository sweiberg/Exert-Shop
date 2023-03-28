import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      'http://localhost:4300/auth/login',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      'http://localhost:4300/auth/register',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  verify(): Observable<any> {
    return this.http.get(
      'http://localhost:4300/auth/authorize',
      {
      }
    );
  }

}
