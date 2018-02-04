import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { User } from 'app/interfaces/api-models';

export class MockAccountService {
  login() {
    return of();
  }

  logout() {
    return of();
  }

  isLoggedIn() {
    return Promise.resolve(true);
  }

  get(): Observable<User> {
    return of({
      id: 1,
      atopic: true,
      asthma: true,
      pollen: false,
      rhinitis: false,
      gastroenteritis: false,
      conjunctivitis: false,
    });
  }

  saveSignupdataName() {
  }

  saveSignupdataSymptom() {
  }

  saveSignupdataClassification() {
  }

  saveSignupdataEmail() {
  }

  saveSignupdataPassword() {
  }

  verifyEmail() {
    return of();
  }

  emailValidator() {
    return true;
  }

  passwordValidator() {
    return true;
  }
}
