import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';
import {
  User,
} from 'app/interfaces/api-models';

@Injectable()
export class AccountService {
  private userId: number;
  private signupData = {
    name: '',
    email: '',
    password: '',
    symptoms: [],
    classification: 0,
  };

  constructor(
    private http: HttpClient,
    private store: Store,
  ) { }

  login(email: string, password: string) {
    const body = {
      session: {
        email: email,
        password: password
      }
    };
    this.http.post<User>(`/api/login`, body)
      .subscribe(
        response => {
          this.userId = response.id;
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('account', JSON.stringify(response));
          this.onSuccessAccount(response);
        }
      );
  }

  get(): Observable<User> {
    let myself = this.store.getState().account;
    if (myself && myself.id) {
      return Observable.of(this.store.getState().account);
    } else {
      myself = JSON.parse(localStorage.getItem('account')) as User;
      if (myself && myself.id) {
        this.onSuccessAccount(myself);
        return Observable.of(myself);
      } else {
        return this.http.get<User>(`/api/users/${this.userId}`)
          .map(
            response => {
              this.onSuccessAccount(response);
              return response;
            }
          );
      }
    }
  }

  create() {
    this.http.post<any>(`/api/users`, {user: this.signupData})
      .subscribe(
        response => {
          this.userId = response.userId;
          localStorage.setItem('token', response.accessToken);
        }
      );
  }

  saveSignupdataName(name: string) {
    this.signupData.name = name;
  }

  saveSignupdataSymptom(item?: any): any[] {
    if (!item) {
      this.signupData.symptoms = [];
      return;
    }

    this.signupData.symptoms = item.checked ?
      this.signupData.symptoms.concat(item.id) :
      this.signupData.symptoms.filter(value => item.id !== value);
  }

  saveSignupdataClassification(item?: any) {
    if (!item) {
      return;
    }
    this.signupData.classification = item.id;
  }

  verifyEmail(email: string) {
    return this.http.post<any>(
      `/api/users/emailverification`,
      {user: { email: email }},
      {observe: 'response'}
    );
  }

  saveSignupdataEmail(email: string) {
    this.signupData.email = email;
  }

  saveSignupdataPassword(password: string) {
    this.signupData.password = password;
  }

  private onSuccessAccount(data: User) {
    const currentState = this.store.getState();
    this.store.setState({
      ...currentState,
      account: data,
      loading: false,
      error: false,
    });
  }

}
