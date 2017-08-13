import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('allergylog');
    const req = request.clone({ setHeaders: { Authorization: token }});
    console.log('インターセプト！', req);
    return next.handle(req);
  }

}
