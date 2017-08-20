import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';

@Injectable()
export class AccountService {
  private userId: string;

  constructor(
    private http: HttpClient,
    private store: Store,
  ) { }

  login(email: string, password: string): Observable<void> {
    const body = {
      email: email,
      password: password
    };
    return this.http.post<any>(`/api/login`, body)
      .map(
        response => {
          this.userId = response.userId;
          localStorage.setItem('allergylog', response.accessToken);
        }
      );
  }

  get() {
    this.http.get<any>(`/api/users/${this.userId}`)
      .subscribe(
        response => {
          this.onSuccessAccount(response);
        }
      );
  }

  private onSuccessAccount(data) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      account: data,
      loading: false,
      error: false,
    });
  }

}
