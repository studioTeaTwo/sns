import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private http: HttpClient,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = 'Bearer ' + localStorage.getItem('allergylog');
    const req = request.clone({ setHeaders: { Authorization: token }});

    return next.handle(request);
  }

}
