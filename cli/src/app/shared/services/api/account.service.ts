import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountService {

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string) {
    const storage = window.sessionStorage;
    const body = {
      email: email,
      password: password
    };
    this.http.post<any>('http://localhost:3000/api/login', body).subscribe(
      response => localStorage.setItem('allergylog', response.access_token)
    );
  }

}
