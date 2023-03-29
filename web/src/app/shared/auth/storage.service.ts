import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  TOKEN_KEY = 'token';
  USER_DATA = 'data';

  constructor(private cookie: CookieService) {}

  public clean() {
    this.cookie.deleteAll();
  }

  public set(user: any) {
    this.cookie.delete(this.TOKEN_KEY);
    this.cookie.delete(this.USER_DATA);
    // HTTPOnly aka Secureflag set to true when SSL implemented
    // this.cookie.set('token', user, 7, '/', 'localhost, true, Strict);
    this.cookie.set(this.TOKEN_KEY, user.jwt, 7, '/');
    this.cookie.set(this.USER_DATA, user.data, 7, '/');
  }

  get user() {
    return this.cookie.get(this.USER_DATA);
  }

  get token() {
    return this.cookie.get(this.TOKEN_KEY);
  }

  get authenticated() {
    return !!this.cookie.get(this.TOKEN_KEY);
  }
}
