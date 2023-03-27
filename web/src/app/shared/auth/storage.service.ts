import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private cookie: CookieService) {}

  public clean() {
    this.cookie.deleteAll();
  }

  public set(user: any) {
    this.cookie.delete(user);
    // HTTPOnly aka Secureflag set to true when SSL implemented
    // this.cookie.set('token', user, 7, '/', 'localhost, true, Strict);
    this.cookie.set('token', user, 7, '/');
  }

  public get(key: string) {
      return this.cookie.get(key);
  }
}
