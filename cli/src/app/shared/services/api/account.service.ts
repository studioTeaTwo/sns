import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Store } from 'app/shared/store/store';

@Injectable()
export class AccountService {
  private userId: string;
  private signupData = {
    name: '',
    email: '',
    password: '',
    symptom: {},
    userType: 0,
  };

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

  saveSignupdataName(name: string) {
    this.signupData.name = name;
  }

  saveSignupdataSymptom(item: any): any {
    this.signupData.symptom[item.name] = !this.signupData.symptom[item.name];
    console.log(this.signupData);
    return this.signupData.symptom;
  }

  saveSignupdataUserType(item: any): any {
    this.signupData.userType = item.name;
    return this.signupData.userType;
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
