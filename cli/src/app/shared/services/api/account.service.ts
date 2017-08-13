import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService {
  private userId: string;

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    };
    return this.http.post<any>(`http://localhost:3000/api/login`, body)
      .map(response => {
        this.userId = response.user_id;
        localStorage.setItem('allergylog', response.access_token);
      });
  }

  get() {
    return this.http.get<any>(`http://localhost:3000/api/users/${this.userId}`);
  }

}
