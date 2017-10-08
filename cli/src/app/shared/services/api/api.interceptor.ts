import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { Store } from 'app/shared/store/store';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  readonly domain: string = environment.domain;

  constructor(
    private store: Store,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (!token && !request.url.match(/login/)) {
      // TODO: 認証画面を提示
    }

    this.setLoading();
    const req = request.clone({
      url: this.domain + request.url,
      setHeaders: { Authorization: token ? token : '' },
    });
    console.log('インターセプト！', req);
    return next.handle(req)
             .map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && event.status > 300) {
                  this.onError();
                } else {
                  // 正常レスポンス
                };
                return event;
              })
              .catch((err: any, caught) => {
                if (err instanceof HttpErrorResponse) {
                  if (err.status === 403) {
                    this.onError();
                  }
                  return Observable.throw(err);
                }
              });
  }

  private setLoading() {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      loading: true,
      error: false,
    });
  }

  private onError() {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      loading: false,
      error: true,
    });
  }

}
