import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { API_ERROR_MSGS } from 'app/constants/constants';
import { ApiBaseService } from 'app/shared/services/api/api-base.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  readonly domain: string = environment.domain;

  constructor(
    private router: Router,
    private apiBaseService: ApiBaseService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (!token && !request.url.match(/login/)) {
      // TODO: 認証画面を提示
    }

    this.apiBaseService.setLoading();
    const req = request.clone({
      url: this.domain + request.url,
      setHeaders: { Authorization: token ? token : '' },
    });
    console.log('インターセプト！', req);
    return next.handle(req)
            .map((event: HttpEvent<any>) => {
              // ネットワーク通信前に動く
              if (event instanceof HttpResponse && event.status >= 400) {
                this.apiBaseService.onError();
              } else {
              };
              return event;
            })
            .catch((err: any, caught) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  this.apiBaseService.onError(API_ERROR_MSGS.UNAUTHORIZED_401);
                  this.goBackLogin();
                } else if (err.status === 403) {
                  this.apiBaseService.onError();
                } else {
                  // 500系
                  this.apiBaseService.onError();
                }
                return Observable.throw(err);
              }
            });
  }

  private goBackLogin() {
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    this.router.navigate(['/auth/login']);
  }
}
