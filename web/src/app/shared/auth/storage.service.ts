import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  TOKEN_KEY = 'token';

  constructor(private cookie: CookieService) {}

  public clean() {
    this.cookie.delete(this.TOKEN_KEY);
  }

  public set(key: any) {
    this.cookie.delete(key);
    // HTTPOnly aka Secureflag set to true when SSL implemented
    // this.cookie.set('token', user, 7, '/', 'localhost, true, Strict);
    this.cookie.set(this.TOKEN_KEY, key, 7, '/');
  }

  get token() {
      return this.cookie.get(this.TOKEN_KEY);
  }

  get authenticated() {
    return !!this.cookie.get(this.TOKEN_KEY);
  }
}
