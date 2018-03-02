import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { API_ERROR_MSGS } from 'app/constants/constants';
import { ApiBaseService } from 'app/core/services/api/api-base.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  readonly domain: string = environment.domain;

  constructor(private router: Router, private apiBaseService: ApiBaseService) {}

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
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        // ネットワーク通信前に動く
        if (event instanceof HttpResponse && event.status >= 400) {
          this.apiBaseService.onError();
        } else {
        }
        return event;
      }),
      catchError(error => this.handleError(error)),
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.apiBaseService.onError(error.error.error);
      this.goBackLogin();
    } else if (error.status === 403) {
      this.apiBaseService.onError(API_ERROR_MSGS.FORBIDDEN_403);
    } else {
      // 500系
      this.apiBaseService.onError(API_ERROR_MSGS.OTHER_SERVER_ERROR);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(error.message);
  }

  private goBackLogin() {
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    this.router.navigate(['/auth/login']);
  }
}
