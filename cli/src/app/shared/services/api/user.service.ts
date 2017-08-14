import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getProfile(userId: string) {
    console.log(userId);
    return this.httpClient.get<any>(`/api/profiles/${userId}`);
  }

  getSearchName(search_key: string) {
    const params: HttpParams = new HttpParams().set('search_key', search_key);
    return this.httpClient.get<any>(`/api/search/usernames`, { params });
  }
}
