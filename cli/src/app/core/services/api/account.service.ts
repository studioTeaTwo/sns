import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/core/store/store';
import {
  User,
} from 'app/interfaces/api-models';
import { ApiBaseService } from 'app/core/services/api/api-base.service';

interface UserRequestBody extends User {
  password?: string;
  passwordConfirmation?: string;
  currentPassword?: string;
}

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
    private apiBaseService: ApiBaseService,
  ) { }

  login(email: string, password: string): Observable<User> {
    const body = {
      session: {
        email: email,
        password: password
      }
    };
    return this.http.post<User>(`/api/login`, body)
      .map(
        response => {
          this.userId = response.id;
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('account', JSON.stringify(response));
          this.onSuccessAccount(response);
          return response;
        }
      );
  }

  logout(): Observable<void> {
    return this.http.delete(`/api/logout`)
      .map(
        response => {
          localStorage.removeItem('token');
          localStorage.removeItem('account');
          this.onSuccessAccount({});
        }
      );
  }

  isLoggedIn(): Promise<boolean> {
    const myself = this.store.getState().account;
    if (myself && myself.accessToken) {
      return Promise.resolve(true);
    } else {
      const mytoken = localStorage.getItem('token');
      if (mytoken) {
        return Promise.resolve(true);
      }
    }
    return Promise.resolve(false);
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
        // 通信するのではなくログインし直すべきである
        return Observable.of({});
      }
    }
  }

  update(user: User, newPassword: string, currentPassword: string): Observable<void> {
    let requestBody: UserRequestBody;
    if (newPassword.length > 0) {
      requestBody = {
        ...user,
        password: newPassword,
        passwordConfirmation: newPassword,
        currentPassword: currentPassword,
      };
    } else {
      requestBody = user;
    }
    return this.http.put<User>(`/api/users/${user.id}`, {user: requestBody})
      .map(
        response => {
          localStorage.setItem('account', JSON.stringify(response));
          this.onSuccessAccount(response);
        }
      );
  }

  create(): Observable<void> {
    return this.http.post<User>(`/api/users`, {user: this.signupData})
      .map(
        response => {
          this.userId = response.id;
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('account', JSON.stringify(response));
          this.onSuccessAccount(response);
        }
      );
  }

  saveSignupdataName(name: string) {
    this.signupData.name = name;
  }

  saveSignupdataSymptom(item?: any) {
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

  saveSignupdataEmail(email: string) {
    this.signupData.email = email;
  }

  saveSignupdataPassword(password: string) {
    this.signupData.password = password;
  }

  verifyEmail(email: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(
              `/api/users/emailverification`,
              {user: { email: email }},
              {observe: 'response'}
            )
            .map(response => {
              this.apiBaseService.onSuccess();
              return response;
            });
  }

  emailValidator(email: string): boolean {
    const mail_regex =
      // tslint:disable-next-line:max-line-length
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return mail_regex.test(email);
  }

  passwordValidator(password: string): boolean {
    if (password.length && password.length >= 6) {
      return true;
    } else {
      return false;
    }
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
