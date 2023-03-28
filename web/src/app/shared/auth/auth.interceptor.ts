import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authService: AuthService;

  constructor(private injector: Injector, private router: Router, private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('token');

    req = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });

    return next.handle(req);
  }
}908