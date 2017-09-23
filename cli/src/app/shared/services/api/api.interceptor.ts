import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
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
    return next.handle(req);
  }

  private setLoading() {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      loading: true,
      error: false,
    });
  }

}
