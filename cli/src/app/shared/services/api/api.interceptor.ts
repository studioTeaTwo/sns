import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  readonly domain: string = environment.domain;

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('allergylog');
    if (!token && !request.url.match(/login/)) {
      // TODO: 認証画面を提示
    }
    
    const req = request.clone({
      url: this.domain + request.url,
      setHeaders: { Authorization: token },
    });
    console.log('インターセプト！', req);
    return next.handle(req);
  }

}
